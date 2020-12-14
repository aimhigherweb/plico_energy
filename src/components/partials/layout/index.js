import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import Header from '../header';
import Footer from '../footer';
import Favicon from '../../../img/favicon.png';

import '../../../styles/_global.scss';
import './style.scss';

const Layout = ({ children, meta, classes }) => (
		<StaticQuery
			query={graphql`
					query {
						site: storyblokEntry(full_slug: {eq: "details"}) {
							fields {
								content {
									site_url
									site_title
									meta {
										description
										og_image
										title
									}
								}
							}
						}
					}
				`}
			render={({ site }) => {
				const { site_title, meta: siteMeta } = site.fields.content,
					pageMeta = {};

				if (meta) {
					pageMeta.title = `${meta.name} | ${site_title}`;

					Object.keys(meta).forEach((item) => {
						if (meta[item]) {
							pageMeta[item] = meta[item];
						}
					});
				}

				return (
					<Fragment>
						<Helmet
							bodyAttributes={{
								class: classes
							}}
						/>
						<Meta {...{
							...site.fields.content,
							...siteMeta,
							...pageMeta
						}} />
						<Header />
						<main>{children}</main>
						<Footer />
					</Fragment>
				);
			}}
		/>
	),
	Meta = ({
		title, description, og_description, og_image, og_title, twitter_description, twitter_image, twitter_title, slug = ``, site_title, site_url
	}) => (
		<Helmet>
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta name="author" content={site_title} />
			<link rel="canonical" href={`${site_url}${slug}`} />
			<base href="/" />

			<link rel="shortcut icon" href={Favicon} />
			<link rel="icon" sizes="192x192" href={Favicon} />
			<link rel="apple-touch-icon" href={Favicon} />
			<meta name="theme-color" content="#18304c" />
			<link rel="mask-icon" href={Favicon} color="#18304c" />

			{/* OpenGraph */}
			<meta property="og:url" content={`${site_url}${slug}`} />
			<meta property="og:title" content={og_title || title} />
			<meta property="og:description" content={og_description || description} />
			<meta property="og:type" content="website" />
			<meta property="og:image" content={og_image} />

			{/* Twitter */}
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={twitter_title || title} />
			<meta name="twitter:description" content={twitter_description || description} />
			<meta name="twitter:image" content={twitter_image || og_image} />
		</Helmet>
	);

export default Layout;
