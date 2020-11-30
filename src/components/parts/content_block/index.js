import React from 'react';
import { getFluidGatsbyImage } from 'gatsby-storyblok-image';
import Img from 'gatsby-image';

import CTA from "../cta";

import './style.scss';

const ContentBlock = ({
	heading, content, image, cta
}) => (
	<article className="repeatable_content">
		<div className="content">
			<h3>{heading}</h3>
			<div dangerouslySetInnerHTML={{ __html: content }} />
			{cta && <CTA {...{ cta_button: cta }} />}
		</div>

		{image
			&& <Img
				fluid={getFluidGatsbyImage(
					image.filename,
					{
						maxWidth: 300,
						maxHeight: 300 * 0.8
					}
				)}
			/>
		}

	</article>
);

export default ContentBlock;
