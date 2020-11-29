import React, { useState } from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { getFixedGatsbyImage } from 'gatsby-storyblok-image';

import News from '../components/parts/news';
import LightbulbSquiggle from '../img/animations/lightbulb_squiggle.svg';
import Animated from '../components/parts/animated_svg';
import Layout from '../components/partials/layout';
import Banner from '../components/blocks/banner';

import '../styles/custom/news.scss';

const NewsPage = ({ data }) => {
	const {
			slug,
			fields,
			name
		} = data.storyblokEntry,
		news = data.news.edges,
		setChunks = (array, length) => {
			const chunks = [],
				n = array.length;
			let i = 0;

			while (i < n) {
				chunks.push(array.slice(i, i += length));
			}

			return chunks;
		},
		pages = setChunks(news, 6),
		[page, setPage] = useState(1),
		[pageData, setPageData] = useState(pages[page]),
		changePage = (index) => {
			setPage(index + 1);
			setPageData(pages[index]);
			document.querySelector(`.news_feed`).scrollIntoView({ behavior: `smooth` });
		};

	return (
		<Layout {...{ classes: `news_page header_image` }}>
			<Banner {...fields.content.banner[0]} />
			<Animated className="lightbulb">
				<LightbulbSquiggle />
			</Animated>
			<div className="news_feed">
				{pageData.map(({ node }) => (
					<News
						key={node.name}
						{...{
							...node,
							...node.fields.content,
							date: node.first_published_at,
							tags: node.tag_list,
							cta: [{
								cta_link: `/news/${node.slug}`,
								cta_text: `Read More`
							}]
						}}
					/>
				))}
				{pages.length > 1
					&& <ul className="pagination">
						{pages.map((data, index) => (
							<li>
								<button className={index + 1 == page && `active`} onClick={() => (changePage(index))}><span>Page</span>{index + 1}</button>
							</li>
						))}
					</ul>
				}
			</div>
		</Layout>
	);
};

export default NewsPage;

export const pageQuery = graphql`
	query {
		storyblokEntry(full_slug: {eq: "custom-pages/news"}) {
			name
			field_og_image_string
			slug
			fields {
				content {
					heading
					content
					banner {
						main_quote
						sub_quote
						media {
							component
							image {
								filename
							}
							video_url
						}
						cta_button {
							cta_link
							cta_text
							cta_colour {
								colour
							}
						}
					}
				}
			}
		}
		news: allStoryblokEntry(
			filter: {field_component: {eq: "news"}}
			limit: 100
			sort: {fields: first_published_at, order: DESC}
		) {
			edges {
				node {
					name
					slug
					first_published_at(formatString: "Do MMMM YYYY")
					tag_list
					fields {
						content {
							feature_image {
								filename
							}
							excerpt
						}
					}
				}
			}
		}
	}
`;
