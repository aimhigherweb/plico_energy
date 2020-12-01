import React from 'react';
import { getFluidGatsbyImage } from 'gatsby-storyblok-image';
import Img from 'gatsby-image';

import CTA from "../cta";

import './style.scss';

const NumberedBlock = ({
	heading, content, image, cta, index
}) => (
	<article className="repeatable_content numbered">
		<div className="content">
			<h3>{heading}</h3>
			<div dangerouslySetInnerHTML={{ __html: content }} />
			{cta && <CTA {...{ cta_button: cta }} />}
		</div>

		<div className="gatsby-image-wrapper">
			<p>{index + 1}</p>
		</div>

	</article>
);

export default NumberedBlock;
