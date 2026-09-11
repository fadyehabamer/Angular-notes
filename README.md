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
beginner/project.html       build project: to-do app, then shopping cart
intermediate/project.html   build project: the real store on a public API
advanced/project.html       build project: the production pass
angular-data-flow.html       companion deck: nine communication channels
```

Every page is a self-contained HTML file. Open any of them directly in a
browser — no server, no build step, no dependencies.

## Reading a page

Every topic goes from plain language to real code, in that order:

1. **Three plain cards** — what the thing actually is (no jargon), a real-world
   object it behaves like, and the moment you would reach for it.
2. **The idea in three or four pictures** — an icon strip that carries the whole
   mechanism before any Angular appears.
3. **The wire diagram** — the same thing, wired up. It plays itself once on
   scroll; `←` / `→` step through, `R` replays, or click a dot in the step bar.
   Each step lights a wire and highlights the exact lines involved.
4. **The files, line by line**, then a worked example, then the traps.
5. **One sentence worth memorising**, at the end.

Two switches sit top right and both are remembered across pages:

- **EN / مصري** — English or Egyptian Arabic.
- **☀ / ☾** — light or dark. **Light is the default.**

Code, file names and diagrams stay left-to-right in every combination.

## Regenerating

```bash
node _build/build.mjs
```

- `_build/content/{beginner,intermediate,advanced}.mjs` — the topics. One object
  per topic: `slug`, `badge`, `title`, `lead`, `nodes`, `edges`, `files`,
  `steps`, `example`, `gotchas`, every text field carrying `{ en, ar }`.
  `example` may be an array.
- `_build/content/projects.mjs` — the three end-of-track build projects,
  one per level. Written in the reference-document shape (sections and
  blocks, including `step` and `chk`), rendered by the same engine as the
  TypeScript page into `<track>/project.html`, and spliced into the reading
  order after each track's last topic.
- `_build/content/plain.mjs` — the beginner layer, keyed by **base slug** (no
  number), so it does not care which track a topic ends up in: `say`, `like`,
  `when`, `one`, and a `strip` of three or four `{ i, t, p }` panels. `i` names
  an icon from the `I` map in `build.mjs`; an unknown name fails the build.
- `_build/build.mjs` — the `PLAN` constant at the top is **the syllabus**:
  it decides which track each topic belongs to and in what order. Numbering,
  filenames and prev/next paging all follow from it, so moving a topic between
  tracks is moving one string.
- `_build/deck.css` — shared styles, linted on every build. Both skins are
  defined **only** as custom properties: the bare `:root` block is light,
  `:root[data-theme="dark"]` redefines the same names. No rule below those two
  blocks may contain a colour literal — adding one is how a theme half-breaks.

The build refuses to run on malformed CSS, fails on an unknown icon name, and
reports any topic named in `PLAN` that has not been written yet.
