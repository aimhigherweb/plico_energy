import React, { Fragment } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import Animated from '../animated_svg';

import Sun from '../../../img/animations/sun.svg';
import QuoteOpen from '../../../img/quote_open.svg';
import QuoteClose from '../../../img/quote_close.svg';
import Curve from '../../../img/blob_video.svg';

import './style.scss';

const Testimonials = ({ testimonials, _uid }) => (
	<StaticQuery
		query={graphql`
			query {
				testimonials: allStoryblokEntry(
					filter: {
						field_component: {eq: "testimonials"}
					}, 
				) {
					edges {
						node {
							name
							uuid
							fields {
								content {
									location
									featureImage {
										childImageSharp {
											fixed(width: 200) {
												...GatsbyImageSharpFixed_withWebp
											}
										}
									}
									name
									quote
								}
							}
						}
					}
				}
			}

		`}
		render={(data) => {
			const quotes = data.testimonials.edges.filter(({ node }) => testimonials.includes(node.uuid));

			return (
				<div className="testimonial_part" style={{ '--testimonials': testimonials.length }}>
					<Curve className="curve" />
					{quotes.map((testimonial, index) => {
						const {
							name, quote, location, featureImage
						} = testimonial.node.fields.content;

						return (
							<Fragment key={testimonial.node.name}>
								<input
									type="radio"
									id={`quote-${testimonial.node.uuid}`}
									name={`testimonials_${_uid}`}
									defaultChecked={index === 0}
								/>
								<label htmlFor={`quote-${testimonial.node.uuid}`}>
									<span>{name} Testimonial</span>
								</label>
								<blockquote>
									<figure>
										<Animated className="sun">
											<Sun />
										</Animated>
										<Img
											fixed={featureImage.childImageSharp.fixed}
											style={{
												width: `200px`,
												height: `200px`
											}}
										/>
									</figure>

									<div className="quote">
										<QuoteOpen className="before" />
										{quote}
										<QuoteClose className="after" />
									</div>
									<cite>
										<p className="name">{name}</p>
										<p>{location}</p>
									</cite>
								</blockquote>
							</Fragment>
						);
					})}
				</div>
			);
		}}
	/>
);

export default Testimonials;
