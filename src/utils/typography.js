import Typography from 'typography'
import theme from 'typography-theme-de-young'
import CodePlugin from 'typography-plugin-code'

// use self-host typeface-alegreya
delete theme.googleFonts

theme.plugins = [new CodePlugin()]
theme.overrideThemeStyles = ({rhythm}) => ({
  'blockquote > h1, blockquote > h2, blockquote > h3, blockquote > h4': {
    marginTop: 0,
  },
  'li > p': {
    marginBottom: rhythm(1 / 2),
  },
  'p code': {
    fontSize: '75%',
  },
  'tt,code': {
    fontSize: '85%',
  },
  pre: {
    lineHeight: 1.22,
    padding: '1em',
  },
})

// http://kyleamathews.github.io/typography.js/
const typography = new Typography(theme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
