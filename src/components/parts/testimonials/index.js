import React, { Fragment } from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import { getFixedGatsbyImage } from 'gatsby-storyblok-image';
import Img from 'gatsby-image';

const Testimonials = ({ testimonials }) => (
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
			const quotes = data.testimonials.edges;
			return (
				<div style={{ '--testimonials': testimonials.length }}>
					{quotes.map((testimonial, index) => {
						const {
							name, quote, location, image
						} = testimonial.node.fields.content;
						return (
							<Fragment key={testimonial.node.name}>
								<input type="radio" id={`quote-${index}`} name="testimonials" defaultChecked={index === 0} />
								<label htmlFor={`quote-${index}`}>
									<span>{name} Testimonial</span>
								</label>
								<blockquote>
									{/* <Img fixed={getFixedGatsbyImage(image.filename, { width: 200 })} /> */}
									<div dangerouslySetInnerHTML={{ __html: quote }}/>
									<cite>
										<p>{name}</p>
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
