import React, { Fragment, useEffect } from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import { getFixedGatsbyImage } from 'gatsby-storyblok-image';
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
									image {
										filename
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

			// useEffect(() => {
			// 	document.querySelectorAll(`.testimonials`).forEach((block) => {
			// 		block.querySelector(`input`).checked = true;
			// 	});
			// });

			return (
				<div className="testimonials" style={{ '--testimonials': testimonials.length }}>
					<Curve className="curve" />
					{quotes.map((testimonial, index) => {
						const {
							name, quote, location, image
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
											fixed={getFixedGatsbyImage(image.filename, { width: 200, height: 200 })}
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
