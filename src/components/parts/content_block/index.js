import React from 'react';
import { Link } from 'gatsby';
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
			<p>{content}</p>
			{cta && <CTA {...{ cta_button: cta }} />}
		</div>

		{image
			&& <Img
				fluid={getFluidGatsbyImage(
					image.filename,
					{
						maxWidth: 300,
					}
				)}
			/>
		}

	</article>
);

export default ContentBlock;
