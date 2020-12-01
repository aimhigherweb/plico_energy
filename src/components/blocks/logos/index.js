import React from 'react';
import { getFixedGatsbyImage } from 'gatsby-storyblok-image';
import Img from 'gatsby-image';

import Block from "../../parts/block";

import './style.scss';

const LogoBlock = ({
	heading, logos
}) => (
	<Block
		className='logo_block'
	>
		<h2>{heading}</h2>
		<ul className="logos">
			{logos.map(({ filename }) => (
				<li><Img fixed={getFixedGatsbyImage(filename, { width: 200 })} /></li>
			))}
		</ul>
	</Block>
);

export default LogoBlock;
