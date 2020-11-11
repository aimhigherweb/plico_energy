import React from 'react';
import { getFluidGatsbyImage } from 'gatsby-storyblok-image';
import Img from 'gatsby-image';

import Block from "../../parts/block";
import CTA from '../../parts/cta';

import './style.scss';

const Banner = ({
	main_quote, sub_quote, cta_button, image
}) => (
	<Block className="banner">
		<blockquote>
			<p className="main">{main_quote}</p>
			<p className="sub">{sub_quote}</p>
			<CTA {...{ cta_button }} />
		</blockquote>
		<Img fluid={getFluidGatsbyImage(image.filename, { maxWidth: 500 })} />
	</Block>
);

export default Banner;
