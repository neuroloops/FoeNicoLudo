require('dotenv').config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    siteUrl: 'https://www.yourdomain.tld',
    title: 'NicoLudoFOE',
  },
  plugins: [
    'gatsby-plugin-emotion',
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.GATSBY_AIRTABLE_API,
        concurrency: 5,
        tables: [
          {
            baseId: process.env.GATSBY_AIRTABLE_BASE_ID,
            tableName: `Table`,
            tableView: `Grid view`,
          },
        ],
        tables: [
          {
            baseId: process.env.GATSBY_AIRTABLE_BASE_ID,
            tableName: `Table`,
            tableView: `Nico`,
          },
        ],
      },
    },
  ],
}
