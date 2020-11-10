import React from 'react';
import { getFixedGatsbyImage } from 'gatsby-storyblok-image';
import Img from 'gatsby-image';

import Block from "../../parts/block";
import CTA from '../../parts/cta';

const Content = ({
	heading, content, cta_button, image
}) => (
	<Block>
		<h2>{heading}</h2>
		<div dangerouslySetInnerHTML={{ __html: content }} />
		<CTA {...{ cta_button }} />
		<Img fixed={getFixedGatsbyImage(image.filename, { width: 500 })} />
	</Block>
);

export default Content;
