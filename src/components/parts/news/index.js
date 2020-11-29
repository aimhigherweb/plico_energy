import React from 'react';
import { Link } from 'gatsby';
import { getFluidGatsbyImage } from 'gatsby-storyblok-image';
import Img from 'gatsby-image';
import CTA from '../cta';

import './style.scss';

const News = ({
	name, excerpt, feature_image, slug, date, cta, tags
}) => {
	let image = feature_image.filename;
	if (image == ``) {
		image = `https://a.storyblok.com/f/96172/2048x1365/c2f32f58e3/plico-061.jpg`;
	}
	return (
		<article className="article">
			<div className="content">
				{date && <p className="date">{date}</p>}
				{tags && <p className="tags">{tags.join(` `)}</p>}
				<h3>{name}</h3>
				<p className="excerpt">{excerpt}</p>
				{cta
					? <CTA {...{ cta_button: cta }} />
					: <Link to={slug} className="block">Read More</Link>
				}
			</div>

			{feature_image
			&& <Img
				fluid={getFluidGatsbyImage(
					image,
					{
						maxWidth: 300,
						useBase64: true,
						base64: true
					}
				)}
			/>
			}
		</article>
	);
};

export default News;
