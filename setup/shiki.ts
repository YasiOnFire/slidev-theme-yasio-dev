import { defineShikiSetup } from '@slidev/types'
import theme from './yasio-dark.json'

export default defineShikiSetup(() => ({
  themes: {
    dark: theme,
    light: theme,
  },
}))
