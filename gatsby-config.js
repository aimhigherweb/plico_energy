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
	]
};
