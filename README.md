# slidev-theme-yasio-dev

[![NPM version](https://img.shields.io/npm/v/slidev-theme-yasio-dev?color=5918df&label=)](https://www.npmjs.com/package/slidev-theme-yasio-dev)

A Yasio.dev theme for [Slidev](https://github.com/slidevjs/slidev).

## Install

Add the following frontmatter to your `slides.md`. Start Slidev then it will prompt you to install the theme automatically.

<pre><code>---
theme: <b>yasio-dev</b>
---</code></pre>

Learn more about [how to use a theme](https://sli.dev/themes/use).

## Layouts

The theme uses a dark terminal aesthetic with violet accents, restrained yellow
highlights, and local fonts. Consolas is used for headings, code, and numbers;
Noto Sans is used for body text, with four alternatives ready to switch in one file.
This version targets Slidev 53 and Vue 3.5, with Node.js 22.12 or newer.

- `cover`: title page with the theme's original code photo bundled locally;
  optional `background: /img/cover.jpg` overrides it, and `background: ''` hides it.
- `default`: numbered editor gutter and a slide counter anchored to the bottom right.
- `chapter`: chapter cover with an oversized number, eyebrow, heading, subtitle,
  and blinking cursor. Reduced-motion preferences disable the blink.
- `media`: a full-slide screenshot with an optional editor tab, an uncropped image,
  a slide counter, and a labeled placeholder when the file is missing.
- `center`, `section`, `intro`, `fact`, `statement`, `quote`, `image`: supporting layouts.

```md
---
layout: chapter
chapter: '01'
eyebrow: Workshop
---

# Agentic development

Implementation, review, worktrees, sandbox.
```

Keep chapter titles to one or two lines and the subtitle to one sentence. The chapter
number is decorative and is independent of the slide counter.

```md
---
layout: media
media: /screens/review.png
alt: Review results in the development environment
label: review / findings
---
```

Place media files in the deck's `public` directory. `media` and `alt` are required;
`label` is optional. This layout displays static images and GIFs; use `MediaSlot`
for video controls within a slide.

## Components

### MediaSlot

Display a screenshot, GIF, meme, or video. Missing files remain visible as labeled
placeholders, so a deck is reviewable before recordings are ready.

```html
<MediaSlot
  src="/media/agent-workflow.webm"
  label="Agent prepares a change and reports verification results"
  kind="video"
  height="330px"
  placeholder-label="TO ADD"
/>
```

`src` and `label` are required. `kind` accepts `screen` (default), `video`, or `meme`;
GIFs use `screen`. Height defaults to `360px`. The placeholder label defaults to
`DO DODANIA`. Videos use controls and metadata preload, without autoplay.

### SdlcFlow

A horizontal process with AI work, human decisions, and optional approval gates.
Use three to six stages and short labels. The `compact` variant leaves room for
screenshots below the diagram.

```html
<SdlcFlow
  compact
  ai-label="AI"
  human-label="Human"
  aria-label="Development process and approvals"
  :stages="[
    { id: 'spec', title: 'Specification', ai: 'Options and acceptance criteria', human: 'Scope and decisions' },
    { id: 'code', title: 'Implementation', ai: 'Code, tests, documentation', human: 'Risk and scope' },
    { id: 'review', title: 'Review', ai: 'Diff, checks, evidence', human: 'Accept the change' }
  ]"
  :gates="[{ after: 'review', label: 'MR approval', owner: 'Codeowners' }]"
/>
```

Each stage needs a unique `id`, `title`, and `ai` text; `human` is optional. A gate's
`after` references a stage id, `label` names the approval, and optional `owner`
identifies its owner. All content is passed from the deck; the component does not
assume a specific company process. Human and accessibility labels default to Polish.

### RepoTree

A compact repository tree with file names highlighted on the next click. Pass
`columns`, each with an optional `label` and `entries`. Use `highlightAt` to select
the Slidev click, and reserve it with `clicks: 1` in the slide frontmatter.
`initialLabel` and `activeLabel` customize the status below the tree.

An entry accepts `prefix` for tree branches, `text` for its name, and optional
`kind`: `ai` (mint), `adapter` (violet), `normal` (muted after the click), or
`structure` (always neutral). Older entries with branches inside `text` still work:
the component automatically keeps those branches neutral. No row backgrounds,
gutters, opacity changes or bold text are added when highlighting.

```js
{ prefix: '├── ', text: 'AGENTS.md', kind: 'ai' }
{ prefix: '│   ├── ', text: 'copilot-instructions.md', kind: 'adapter' }
{ prefix: '│   └── ', segments: [
  { text: 'prepare-mr/' },
  { text: 'SKILL.md', kind: 'ai' },
] }
```

Optional `segments` highlight only selected parts of a path. A segment without
`kind` stays neutral. Set `--repo-accent`, `--repo-adapter-accent`, `--repo-muted`,
or `--repo-tree-font-size` on the component to tune the tree without changing the
theme palette. One column spans the full component; multiple columns share it.

### DevelopmentLoop

A six-step cycle with directional connectors and a separate row for human decisions.
Supply six `steps` in execution order; the bottom row reads right to left to close
the loop. Each step has a `title` and optional `detail`.

```html
<DevelopmentLoop
  :steps="[
    { title: 'Goal + spec', detail: 'Expected behavior' },
    { title: 'Implementation', detail: 'Code and tools' },
    { title: 'Verification', detail: 'Tests, UI, logs' },
    { title: 'Review', detail: 'Diff and behavior' },
    { title: 'Fixes', detail: 'Next iteration' },
    { title: 'Feedback', detail: 'Product and users' }
  ]"
  human-label="Human"
  :gates="['goal', 'risk', 'acceptance', 'production']"
/>
```

`loopLabel` customizes the small text inside the cycle; its default is
`agent / tools / feedback`. Omitting `gates` hides the human decision row.

### Other components and content styles

`SlideCounter`, `LayoutFooter`, and `Countdown` are also included. The counter uses
absolute positioning relative to its slide, including print output; it does not
depend on a utility CSS processor.

`styles/content.css` provides reusable slide composition classes migrated from the
workshop deck: `.two-media`, `.source-links`, `.evidence-strip`, `.split-punch`,
`.context-map`, `.repo-columns`, `.vocab`, `.battle`, `.worktree-map`, `.autonomy`,
`.token-flow`, `.harness-flow`, `.links-grid`, and media placeholders. No additional
deck stylesheet is needed for these classes.

`.insight-cards` creates two IDE-style panels; add `.three` for three columns. Each
panel is an `article` with optional `small` label, `h3` title, and `p` description.
`.history-compare` and `.context-map` use matching panel surfaces. `.business-callout`
adds a restrained yellow callout, `.cover-audience` styles a short cover badge,
and a `.file-path` immediately above a code block creates an editor tab and panel.

`styles/patterns.css` adds `.code-guide`: a two-column code example and an `aside`
with a short field guide. Each aside item is a `div` containing `b` and `p`; an
optional `.guide-caption` follows the grid. `.large-meme` increases the image area
of a `.meme-center` slide while preserving the image's aspect ratio and captions.
The editable `.vibe-meme` browser/chat composition is also available for short
illustrative conversations. It contains no external image dependencies.

Theme variables can be overridden in a deck stylesheet:

```css
:root {
  --slidev-theme-primary: #5918df;
  --slidev-theme-aside: #d4c2e0;
  --yasio-accent: #a886ff;
  --yasio-muted: #aaa4bb;
  --yasio-panel: #191622;
  --yasio-line: #393240;
  --yasio-background: #0e0c14;
  --yasio-foreground: #eeeaf6;
  --yasio-yellow: #f6ed0f;
}
```

The cover no longer fetches a random Unsplash image. Its original background
(`photo-1538251041490-6d69ea6ad775`) is bundled in `public/images/cover-original.jpg`,
imported through Vite, and works offline in production. An explicit `background`
path overrides it. This replaces `randomizeBg`. The original dark overlay is
retained: the photo renders at 5% opacity with a radial vignette. Chapter cursors
are white and chapter indices use the foreground color; yellow is reserved for
content accents and decision cards.

### Trying body fonts

Edit only [`styles/font-options.css`](styles/font-options.css): leave one
`--body-font` line active and comment out the others. Noto Sans is enabled;
the previous Inter choice remains in place as a comment. The slide body and
ordinary `.terminal-line` text follow this variable. Use `.terminal-line.font-mono`
for a literal command that should retain Consolas. Headings, code and numbers
keep their existing monospaced font.

| Option | Character | Font source |
| --- | --- | --- |
| Noto Sans | Neutral, open shapes; the current default | [Google Fonts](https://github.com/google/fonts/tree/main/ofl/notosans) |
| IBM Plex Sans | More technical, distinct letter shapes | [Google Fonts](https://github.com/google/fonts/tree/main/ofl/ibmplexsans) |
| Source Sans 3 | Narrower, useful for denser text | [Google Fonts](https://github.com/google/fonts/tree/main/ofl/sourcesans3) |
| Manrope | Geometric, rounded | [Google Fonts](https://github.com/google/fonts/tree/main/ofl/manrope) |
| Inter | The previous body font | [Inter](https://github.com/rsms/inter) / [Google Fonts catalog](https://fonts.google.com/specimen/Inter) |

The four new variable font families are bundled from the official Google Fonts
repository, with their original SIL Open Font License files. Regular and italic
faces are included where the family supplies them. Inter is preserved from the
[official Inter repository](https://github.com/rsms/inter)
(`docs/font-files/InterVariable.woff2`), with its license in
`public/fonts/Inter-LICENSE.txt`. All choices include Polish characters. No remote
font request is needed during a talk; unused faces are loaded only when selected.
The theme retains its existing Consolas assets.

Slidev's defaults use `fonts.provider: none`. If a deck overrides the font
frontmatter, keep that provider and remove any deck-specific CSS setting of
`--body-font`; changing the one theme file will then control subsequent trials.

## Contributing

- `yarn`
- `yarn run dev` to start theme preview of `example.md`
- Edit the `example.md` and style to see the changes
- `yarn run export` to generate the preview PDF
- `yarn run screenshot` to generate the preview PNG

## Package contents

`package.json` uses an explicit `files` allowlist. Components, layouts, styles,
Shiki setup, local fonts, and the example are included; archives, build output,
exports, and `node_modules` are excluded. Run `npm pack --dry-run` to review the
package before a release. This does not publish the theme.
