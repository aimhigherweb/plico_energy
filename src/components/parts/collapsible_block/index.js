import React, { useState } from 'react';
import { getFluidGatsbyImage } from 'gatsby-storyblok-image';
import Img from 'gatsby-image';

import CTA from "../cta";

import './style.scss';

const CollapsibleBlock = ({
	heading, content, collapsed_heading, collapsed_content
}) => {
	const [open, setOpen] = useState(false),
		toggleContent = () => {
			setOpen(!open);
		};

	return (
		<article className="repeatable_content collapsible" open={open}>
			<button onClick={toggleContent}><span>Toggle Content</span></button>
			<div className="open">
				<h3>{heading}</h3>
				<div dangerouslySetInnerHTML={{ __html: content }} />
			</div>
			<div className="closed">
				<h3>{collapsed_heading}</h3>
				<div dangerouslySetInnerHTML={{ __html: collapsed_content }} />
			</div>

		</article>
	);
};

export default CollapsibleBlock;
