require(`dotenv`).config();

module.exports = {
	siteMetadata: {
		title: `Plico Energy`,
		siteUrl: `https://plicoenergy.com.au`
	},
	plugins: [
		{
			resolve: `gatsby-env-variables`
		},
		`gatsby-plugin-react-helmet`,
		`gatsby-transformer-inline-svg-v2`,
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
			resolve: `gatsby-transformer-sharp`
		},
		{
			resolve: `gatsby-plugin-sharp`
		},
		{
			resolve: `gatsby-source-storyblok`,
			options: {
				accessToken: process.env.STORYBLOK_TOKEN,
				version: process.env.STORYBLOK_VERSION,
				resolveLinks: true,
				includeLinks: true,
				contentObject: true
			}
		},
		`gatsby-plugin-advanced-sitemap`,
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
			resolve: `gatsby-plugin-google-tagmanager`,
			options: {
				id: `GTM-N38NTMF`,
				includeInDevelopment: false,
				defaultDataLayer: { platform: `gatsby` },

				routeChangeEventName: `change_page`,
			},
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
