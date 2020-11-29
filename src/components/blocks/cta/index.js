import React from 'react';
import { getFluidGatsbyImage } from 'gatsby-storyblok-image';
import Img from 'gatsby-image';

import Block from "../../parts/block";
import CTA from '../../parts/cta';

import './style.scss';

const CTABlock = ({
	cta_link,
	cta_text,
	cta_colour
}) => (
	<Block
		className='cta_block'
	>
		<CTA {...{
			cta_button: [{
				cta_link,
				cta_text,
				cta_colour
			}]
		}} />

	</Block>
);

export default CTABlock;
