import Typography from 'typography'
import theme from 'typography-theme-de-young'

// use self-host typeface-alegreya
delete theme.googleFonts

// http://kyleamathews.github.io/typography.js/
const typography = new Typography(theme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
