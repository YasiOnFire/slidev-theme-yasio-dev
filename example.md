---
theme: ./
highliter: prism
randomizeBg: false
twitter: YasiOnFire
github: YasiOnFire
web: yasio.dev
linkedin: janbaszczok
---
# Yasio.dev Theme

Presentation slides for developers

---
layout: intro
randomizeBg: false
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
tes
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
randomizeBg: true
class: "text-center"
---

# Learn More

[Documentations](https://sli.dev) / [GitHub Repo](https://github.com/slidevjs/slidev)

---
layout: center
class: "text-center"
enableFooter: true
randomizeBg: false
twitter: YasiOnFire
github: YasiOnFire
web: yasio.dev
linkedin: janbaszczok
---

# Thank you

<span class="opacity-70 text-primary">I remain, [Yasio](https://yasio.dev)</span>
