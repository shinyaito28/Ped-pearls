// Extract NCH Sharepoint manual library to a Markdown draft tree.
//
// Reads from:  original_pictures/Sharepoint/
// Writes to:   scratch/sharepoint_drafts/  (gitignored)
//
// Behaviour:
//   - .docx  → mammoth text extraction
//   - .pdf   → pdf-parse text extraction
//   - .pptx, .xlsx, .doc → placeholder draft (binary; manual review)
//   - "Information for Families" and "Contact Lists" folders are SKIPPED
//     (non-clinical / contains attending names — never enters the app).
//
// The draft files are starting points only. Each one is hand-curated into a
// catalog entry under src/data/specialty/ before shipping to users — the
// script never writes to src/data/.
//
// Usage:
//   node scripts/extract_sharepoint.mjs              # extract everything
//   node scripts/extract_sharepoint.mjs --files ...  # extract only matching paths

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

const SOURCE_DIR = path.join(REPO_ROOT, 'original_pictures', 'Sharepoint');
const DRAFT_DIR = path.join(REPO_ROOT, 'scratch', 'sharepoint_drafts');

// Folders we never extract — contain attending names, family-facing material,
// or pure administrative content. The app must never surface these.
const EXCLUDE_FOLDERS = new Set([
    'Information for Families',
    'Contact Lists',
]);

const SUPPORTED = new Set(['.docx', '.pdf', '.pptx', '.xlsx', '.doc']);

async function walkDir(dir, relRoot = '') {
    const out = [];
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
        if (EXCLUDE_FOLDERS.has(entry.name)) continue;
        const full = path.join(dir, entry.name);
        const rel = path.join(relRoot, entry.name);
        if (entry.isDirectory()) {
            out.push(...await walkDir(full, rel));
        } else if (entry.isFile()) {
            const ext = path.extname(entry.name).toLowerCase();
            if (SUPPORTED.has(ext)) {
                out.push({ full, rel, ext, name: entry.name });
            }
        }
    }
    return out;
}

async function extractDocx(file) {
    const mammoth = await import('mammoth');
    const result = await mammoth.extractRawText({ path: file });
    return result.value || '';
}

async function extractPdf(file) {
    // pdf-parse v2 exports a PDFParse class instead of a function.
    const { PDFParse } = await import('pdf-parse');
    const buf = await fs.readFile(file);
    const parser = new PDFParse({ data: new Uint8Array(buf) });
    const result = await parser.getText();
    return result.text || '';
}

function placeholderText(ext, name) {
    return `> Binary source (\`${ext}\`) — open the original to extract content.\n> File: ${name}\n`;
}

function skeletonHeader(rel, ext, lengthChars) {
    const today = new Date().toISOString().slice(0, 10);
    return [
        '---',
        `source: ${rel.split(path.sep).join('/')}`,
        `format: ${ext.replace('.', '')}`,
        `extracted: ${today}`,
        `length_chars: ${lengthChars}`,
        'status: DRAFT — clinical review pending',
        '---',
        '',
    ].join('\n');
}

async function main() {
    const args = process.argv.slice(2);
    const filesFlag = args.indexOf('--files');
    const filterPatterns = filesFlag >= 0 ? args.slice(filesFlag + 1) : null;

    console.log(`Source: ${SOURCE_DIR}`);
    console.log(`Drafts: ${DRAFT_DIR}\n`);

    let files;
    try {
        files = await walkDir(SOURCE_DIR);
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.error(`ERROR: Source directory not found.`);
            console.error(`Expected: ${SOURCE_DIR}`);
            process.exit(1);
        }
        throw err;
    }

    if (filterPatterns) {
        files = files.filter(f => filterPatterns.some(p => f.rel.toLowerCase().includes(p.toLowerCase())));
        console.log(`Filtered to ${files.length} files matching: ${filterPatterns.join(', ')}\n`);
    }

    await fs.mkdir(DRAFT_DIR, { recursive: true });

    const summary = { docx: 0, pdf: 0, placeholder: 0, errors: [] };

    for (const file of files) {
        const draftPath = path.join(DRAFT_DIR, file.rel) + '.draft.md';
        await fs.mkdir(path.dirname(draftPath), { recursive: true });

        try {
            let body;
            if (file.ext === '.docx') {
                body = await extractDocx(file.full);
                summary.docx++;
            } else if (file.ext === '.pdf') {
                body = await extractPdf(file.full);
                summary.pdf++;
            } else {
                body = placeholderText(file.ext, file.name);
                summary.placeholder++;
            }
            const out = skeletonHeader(file.rel, file.ext, body.length) + body.trim() + '\n';
            await fs.writeFile(draftPath, out, 'utf8');
            process.stdout.write('.');
        } catch (err) {
            summary.errors.push({ file: file.rel, error: err.message });
            await fs.writeFile(
                draftPath,
                skeletonHeader(file.rel, file.ext, 0) + `> EXTRACTION ERROR: ${err.message}\n`,
                'utf8'
            );
            process.stdout.write('!');
        }
    }

    console.log('\n');
    console.log(`Extracted: ${summary.docx} .docx, ${summary.pdf} .pdf, ${summary.placeholder} placeholders`);
    if (summary.errors.length > 0) {
        console.log(`\nErrors (${summary.errors.length}):`);
        for (const e of summary.errors) {
            console.log(`  - ${e.file}: ${e.error}`);
        }
    }
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
