# The Angular Signal

A bilingual Angular magazine — **English** and **Egyptian Arabic** — covering a
full 48-topic syllabus from "what is a component" to security, testing and
micro frontends. Same teaching format as `angular-data-flow.html`: a wire
diagram you step through, the real files line by line, worked examples, and
the traps.

## Where to start

1. **`roadmap.html`** — the learning path. What order to study in, what to
   build after each phase, and how long it actually takes.
2. **`typescript-for-angular.html`** — every Angular file is a TypeScript file.
   Fourteen sections, from zero.
3. **`beginner/01-how-an-app-starts.html`** — then straight through in number order.

## Structure

```
roadmap.html                 the learning path
typescript-for-angular.html  TypeScript prerequisite, from zero
index.html                   contents / cover
beginner/       01–15        how an app starts → HTTP basics
intermediate/   16–27        reactive forms → UI libraries
advanced/       28–48        change detection → micro frontends
angular-data-flow.html       companion deck: nine communication channels
```

Every page is a self-contained HTML file. Open any of them directly in a
browser — no server, no build step, no dependencies.

## Reading a page

- The diagram plays itself once on scroll.
- `←` / `→` step through, `R` replays, or click a dot in the step bar.
- Each step lights a wire and highlights the exact lines involved.
- The **EN / مصري** switch is top right and is remembered across pages.
- Code, file names and diagrams stay left-to-right in both editions.

## Regenerating

```bash
node _build/build.mjs
```

- `_build/content/*.mjs` — the topics. One object per topic: `slug`, `badge`,
  `title`, `lead`, `nodes`, `edges`, `files`, `steps`, `example`, `gotchas`,
  every text field carrying `{ en, ar }`. `example` may be an array.
- `_build/build.mjs` — the `PLAN` constant at the top is **the syllabus**:
  it decides which track each topic belongs to and in what order. Numbering,
  filenames and prev/next paging all follow from it, so moving a topic between
  tracks is moving one string.
- `_build/deck.css` — shared styles, linted on every build.

The build refuses to run on malformed CSS and reports any topic named in
`PLAN` that has not been written yet.
