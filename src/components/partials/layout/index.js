import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import Header from '../header';
import Footer from '../footer';
import Favicon from '../../../img/favicon.png';

const Layout = ({ children, meta }) => (
		<StaticQuery
			query={graphql`
					query {
						site {
							siteMetadata {
								title
								siteUrl
							}
						}
					}
				`}
			render={(data) => (
				<Fragment>
					<Meta {...{ ...meta, ...data.site }} />
					<Header />
					<main>{children}</main>
					<Footer />
				</Fragment>
			)}
		/>
	),
	Meta = ({
		title, description, slug, image, siteMetadata
	}) => {
		slug = slug || ``;
		title = title || siteMetadata.title;
		description = description || siteMetadata.description;

		return (
			<Helmet>
				<title>{title}</title>
				<meta name="description" content={description} />
				<meta name="author" content={siteMetadata.title} />
				<link rel="canonical" href={`${siteMetadata.siteUrl}${slug}`} />
				<base href="/" />

				<link rel="shortcut icon" href={Favicon} />
				<link rel="icon" sizes="192x192" href={Favicon} />
				<link rel="apple-touch-icon" href={Favicon} />
				<meta name="theme-color" content="#18304c" />
				<link rel="mask-icon" href={Favicon} color="#18304c" />

				{/* Facebook */}
				<meta property="og:url" content={`${siteMetadata.siteUrl}${slug}`} />
				<meta property="og:title" content={title} />
				<meta property="og:description" content={description} />
				<meta property="og:type" content="website" />
				{image && (
					<meta
						property="og:image"
						content={`${siteMetadata.siteUrl}${image.publicURL}`}
					/>
				)}

				{/* Twitter */}
				<meta name="twitter:card" content="summary_large_image" />
			</Helmet>
		);
	};

export default Layout;
