# Specialty entry schema

Catalog entries live in `src/data/specialty/`. Two kinds:

1. **Flowchart entries** — interactive cards with their own component (Phase 1).
2. **Catalog entries** — rendered through `<ManualCard>` (Phase 2+).

## Common fields

| field | type | required | notes |
|-------|------|----------|-------|
| `id` | string | yes | Unique stable key. Prefix by hub: `flow_*`, `heme_*`, `endo_*`, … |
| `hub` | string | yes | Matches a `hubs[].id` in `index.js` |
| `kind` | `'flowchart'` \| `'catalog'` | yes | Drives renderer choice |
| `title` | string | yes | Card header |
| `shortDescription` | string | yes | One-line subtitle for hub list and search |
| `tags` | string[] | yes | Search keywords (lowercase, hyphenated) |
| `emergency` | boolean | yes | If true, surfaces as a Crisis tab cross-link |
| `weightAware` | boolean | yes | True if the card subscribes to `usePatient()` |
| `ageRules` | object \| null | yes | Per-age branching, or `null` |
| `source` | string | yes | Generic provenance only. **No attending names.** |
| `lastReviewed` | string | yes | `YYYY-MM` — surfaced in card footer for staleness check |

## Flowchart-specific fields

| field | type | notes |
|-------|------|-------|
| `component` | string | Key into the component registry (e.g. `'MediastinalMassCard'`) |

The flowchart's structured data lives in the same module and is imported by the named component.

## Catalog-specific fields

| field | type | notes |
|-------|------|-------|
| `sections` | section[] | Ordered list of collapsible body sections |
| `related` | string[] | `id`s of cross-linked entries |

Each section:

```js
{
  heading: 'Pre-op',
  body: 'Markdown-lite text. Bullets via "- ", emphasis via **bold**.',
  emphasis: 'info' | 'warn' | 'critical' | undefined
}
```

## Naming and safety rules

- **No attending names** anywhere — not in `source`, not in `body`. Pre-commit grep checks for common patterns.
- `lastReviewed` updated whenever the entry is touched against the source.
- `id` is stable across edits — never renamed once shipped (search bookmarks may rely on it).
- Doses go in their own structured field (in flowchart modules), not buried in prose, so a future cross-search can index them.
