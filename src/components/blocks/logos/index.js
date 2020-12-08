import React from 'react';
import { getFluidGatsbyImage } from 'gatsby-storyblok-image';
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
			{logos.map(({ featureImage }) => (
				<li key={featureImage.childImageSharp.id}>
					<Img fixed={featureImage.childImageSharp.fixed} />
				</li>
			))}
		</ul>
	</Block>
);

export default LogoBlock;
