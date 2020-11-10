import React from 'react';
import { getFixedGatsbyImage } from 'gatsby-storyblok-image';
import Img from 'gatsby-image';

import Block from "../../parts/block";
import CTA from '../../parts/cta';

const Banner = ({
	main_quote, sub_quote, cta_button, image
}) => (
	<Block>
		<blockquote>
			<p className="main">{main_quote}</p>
			<p className="sub">{sub_quote}</p>
			<CTA {...{ cta_button }} />
		</blockquote>
		<Img fixed={getFixedGatsbyImage(image.filename, { width: 500 })} />
	</Block>
);

export default Banner;
