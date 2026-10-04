// Display only: every calculation still uses the original patient inputs.
export const formatPatientSummaryNumber = value => {
    if (value == null || String(value).trim() === '') return '—';
    const raw = String(value).trim(), number = Number(raw);
    if (!Number.isFinite(number)) return '—';
    if (raw.length <= 7) return raw;
    const short = Number(number.toPrecision(4)).toString();
    if (short.length <= 6) return `${Number(short) === number ? '' : '≈'}${short}`;
    const exponential = number.toExponential(1).replace(/\.0(?=e)/, '').replace('e+', 'e');
    if (exponential.length <= 6) return `${Number(exponential) === number ? '' : '≈'}${exponential}`;
    const shortest = number.toExponential(0).replace('e+', 'e');
    return `${Number(shortest) === number ? '' : '≈'}${shortest}`;
};
