---
theme: ./
highlighter: shiki
twitter: YasiOnFire
github: YasiOnFire
web: yasio.dev
linkedin: janbaszczok
---
# Yasio.dev Theme

Presentation slides for developers

---
layout: intro
twitter: YasiOnFire
github: YasiOnFire
web: yasio.dev
linkedin: janbaszczok
---

# 👋🏻

Hi, my name is <strong style="color:#5918df" class="text-3xl">Jan Baszczok</strong>

i ***design*** and `develop` web apps,

mobile, webpages, motion, and more.

<!--
test notes
-->

---

# What is Slidev?

Slidev is a slides maker and presenter designed for developers, consist of the following features

- 📝 **Text-based** - focus on the content with Markdown, and then style them later
- 🎨 **Themable** - theme can be shared and used with npm packages
- 🧑‍💻 **Developer Friendly** - code highlighting, live coding with autocompletion
- 🤹 **Interactive** - embedding Vue components to enhance your expressions
- 🎥 **Recording** - built-in recording and camera view
- 📤 **Portable** - export into PDF, PNGs, or even a hostable SPA
- 🛠 **Hackable** - anything possible on a webpage

<br>
<br>

Read more about [Why Slidev?](https://sli.dev/guide/why)


---

# Navigation

Hover on the bottom-left corner to see the navigation's controls panel

### Keyboard Shortcuts

|     |     |
| --- | --- |
| <kbd>space</kbd> / <kbd>tab</kbd> / <kbd>right</kbd> | next animation or slide |
| <kbd>left</kbd>  / <kbd>shift</kbd><kbd>space</kbd> | previous animation or slide |
| <kbd>up</kbd> | previous slide |
| <kbd>down</kbd> | next slide |

---
layout: image-right
image: 'https://source.unsplash.com/collection/94734566/1920x1080'
---

# Code

Use code snippets and get the highlighting directly!

```ts {all|2,3|5|all}
interface User {
  id: number
  firstName: string
  lastName: string
  role: string
}

function updateUser(
  id: number,
  update: Partial<User>
) {
  const user = getUser(id)
  const newUser = { ...user, ...update }
  const arr = [1,2,3]
  arr.forEach(el => el)
  saveUser(id, newUser)
}
```

---
layout: center
class: "text-center"
---

# Learn More

[Documentations](https://sli.dev) / [GitHub Repo](https://github.com/slidevjs/slidev)

---
layout: center
class: "text-center"
enableFooter: true
twitter: YasiOnFire
github: YasiOnFire
web: yasio.dev
linkedin: janbaszczok
---

# Thank you

<span class="opacity-70 text-primary">I remain, [Yasio](https://yasio.dev)</span>

---
layout: chapter
chapter: '01'
eyebrow: Reusable components
---

# A new workshop

Clear process. Visible decisions. Room for the speaker.

---

# Work and decisions

<SdlcFlow
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

---
clicks: 1
---

# A repository ready for agents

<RepoTree
  :columns="[
    { label: 'Context', entries: [
      { text: 'repo/' },
      { text: '├── AGENTS.md', kind: 'ai' },
      { text: '├── README.md' },
      { text: '├── apps/' },
      { text: '└── docs/' },
      { text: '    ├── architecture.md', kind: 'ai' },
      { text: '    └── adr/', kind: 'ai' }
    ] },
    { label: 'Procedures', entries: [
      { text: 'repo/' },
      { text: '├── .agents/' },
      { text: '│   └── skills/', kind: 'ai' },
      { text: '├── .github/' },
      { text: '│   └── copilot-instructions.md', kind: 'ai' },
      { text: '└── package.json' }
    ] }
  ]"
/>

---

# Media to record

<MediaSlot
  src="/media/agent-workflow.webm"
  label="Agent prepares a change and reports verification results"
  kind="video"
  height="330px"
  placeholder-label="TO ADD"
/>

---

# The development loop

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
