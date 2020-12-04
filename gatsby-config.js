require(`dotenv`).config();

module.exports = {
	siteMetadata: {
		title: `Plico Energy`,
		siteUrl: `https://plicoenergy.com.au`
	},
	plugins: [
		{
			resolve: `gatsby-plugin-react-svg`,
			options: {
				include: `/${__dirname}/src/img/.*.svg$/`,
			},
		},
		{
			resolve: `gatsby-plugin-sass`,
			options: {
				// eslint-disable-next-line global-require
				implementation: require(`sass`),
			},
		},
		{
			resolve: `gatsby-plugin-google-fonts`,
			options: {
				fonts: [
					`roboto slab:400,400i,700,700i`,
					`barlow condensed:400,400i,600,600i,700,700i`
				],
				display: `swap`
			}
		},
		{
			resolve: `gatsby-source-storyblok`,
			options: {
				accessToken: process.env.STORYBLOK_TOKEN,
				version: process.env.NODE_ENV === `production` ? `published` : `draft`,
				resolveLinks: true,
				includeLinks: true,
				contentObject: true
			}
		},
		{
			resolve: `gatsby-plugin-sitemap`,
			options: {
				output: `/sitemap.xml`,
			}
		},
		{
			resolve: `gatsby-plugin-algolia`,
			options: {
				appId: process.env.GATSBY_ALGOLIA_APP_ID,
				apiKey: process.env.ALGOLIA_ADMIN_KEY,
				// eslint-disable-next-line global-require
				queries: require(`./src/utils/algoliaIndex`)
			},
		},
		{
			resolve: `@sentry/gatsby`,
			options: {
				dsn: process.env.GATSBY_SENTRY_DSN_URL,
				sampleRate: 0.7,
			}
		},
		{
			resolve: `gatsby-plugin-netlify`,
			options: {
				headers: {
					"/join": [
						`Access-Control-Allow-Origin: https://sepricecatalog.azurewebsites.net`,
					],
				},
				mergeSecurityHeaders: true,
			},
		},
	]
};
