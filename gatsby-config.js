require('dotenv').config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    siteUrl: 'https://www.yourdomain.tld',
    title: 'NicoLudoFOE',
  },
  plugins: ['gatsby-plugin-emotion'],
}
