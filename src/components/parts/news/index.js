import React from 'react';
import { getFixedGatsbyImage } from 'gatsby-storyblok-image';
import Img from 'gatsby-image';

const News = ({ name, excerpt, feature_image }) => (
	<article>
		<h3>{name}</h3>
		<div dangerouslySetInnerHTML={{ __html: excerpt }} />
		<Img fixed={getFixedGatsbyImage(feature_image.filename, { width: 300 })} />
	</article>
);

export default News;
