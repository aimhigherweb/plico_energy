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
			resolve: `gatsby-source-storyblok`,
			options: {
				accessToken: process.env.STORYBLOK_TOKEN,
				version: process.env.NODE_ENV === `production` ? `published` : `draft`,
				resolveLinks: true,
				includeLinks: true,
				contentObject: true
			}
		}
	]
};
