import React, { useState } from 'react';
import { graphql, Link } from 'gatsby';

import News from '../components/parts/news';
import LightbulbSquiggle from '../img/animations/lightbulb_squiggle.svg';
import Animated from '../components/parts/animated_svg';
import Layout from '../components/partials/layout';
import Banner from '../components/blocks/banner';

import generateSlug from '../utils/generateSlug';

import '../styles/custom/news.scss';

const NewsPage = ({ data, pageContext }) => {
	const { pageInfo, articles, tags } = data,
		{
			slug,
			fields,
			name
		} = pageInfo,
		news = articles.edges,
		setChunks = (array, length) => {
			const chunks = [],
				n = array.length;
			let i = 0;

			while (i < n) {
				chunks.push(array.slice(i, i += length));
			}

			return chunks;
		},
		posts = setChunks(news, 6),
		[page, setPage] = useState(1),
		[pageData, setPageData] = useState(posts[page - 1]),
		changePage = (index) => {
			setPage(index + 1);
			setPageData(posts[index]);
			document.querySelector(`.news_feed`).scrollIntoView({ behavior: `smooth` });
		};

	return (
		<Layout {...{ classes: `news_page header_image` }}>
			<Banner {...fields.content.banner[0]} />
			<div className="intro">
				<div>
					<h2>{pageContext.tag}</h2>
				</div>
				<div className="news_filter">
					<h2>Browse by Category...</h2>
					<ul>
						{tags.edges.map(({ node }) => (
							<li>
								<Link to={`/news/${generateSlug(node.name)}`}>{node.name} ({node.taggings_count})</Link>
							</li>
						))}
					</ul>
				</div>
			</div>

			<div className="news_feed">
				<Animated className="lightbulb">
					<LightbulbSquiggle />
				</Animated>

				<h2>What's been happening at Plico Energy</h2>

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
				{posts.length > 1
					&& <ul className="pagination">
						{posts.map((data, index) => (
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
	query newsQuery($tagFilter: String!) {
		pageInfo: storyblokEntry(full_slug: {eq: "custom-pages/news"}) {
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
							featureImage {
								image: childImageSharp {
									fluid(maxWidth: 3000) {
										...GatsbyImageSharpFluid_withWebp
									}
								}
								graphic: childImageSharp {
									fluid(maxWidth: 700) {
										...GatsbyImageSharpFluid_withWebp
									}
								}
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
		articles: allStoryblokEntry(
			filter: {
				field_component: {eq: "news"}
				tag_list: {regex: $tagFilter}
			}
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
							featureImage {
								childImageSharp {
									fluid(maxWidth: 300) {
										...GatsbyImageSharpFluid_withWebp
									}
								}
							}
							excerpt
						}
					}
				}
			}
		}
		tags: allStoryblokTag {
			edges {
				node {
					name
					taggings_count
				}
			}
		}
	}
`;
