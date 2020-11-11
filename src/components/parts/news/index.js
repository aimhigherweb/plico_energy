import React from 'react';
import { getFluidGatsbyImage } from 'gatsby-storyblok-image';
import Img from 'gatsby-image';

import './style.scss';

const News = ({ name, excerpt, feature_image }) => (
	<article className="article">
		<div className="content">
			<h3>{name}</h3>
			<p>{excerpt}</p>
		</div>
		<Img fluid={getFluidGatsbyImage(feature_image.filename, { maxWidth: 300 })} />
	</article>
);

export default News;
