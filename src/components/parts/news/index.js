import React from 'react';
import { Link } from 'gatsby';
import { getFluidGatsbyImage } from 'gatsby-storyblok-image';
import Img from 'gatsby-image';

import './style.scss';

const News = ({
	name, excerpt, feature_image, slug
}) => (
	<article className="article">
		<div className="content">
			<h3>{name}</h3>
			<p>{excerpt}</p>
		</div>

		{feature_image
			&& <Img
				fluid={getFluidGatsbyImage(
					feature_image.filename, { maxWidth: 300 }
				)}
			/>
		}
		{slug && <Link to={slug} className="block">Read More</Link>}
	</article>
);

export default News;
