import React from 'react';
import Img from 'gatsby-image';
import { getFluidGatsbyImage } from 'gatsby-storyblok-image';

import CTA from "../cta";

import './style.scss';

const ContentBlock = ({
	heading, content, featureImage, cta, image
}) => (
	<article className="repeatable_content">
		<div className="content">
			<h3>{heading}</h3>
			<div dangerouslySetInnerHTML={{ __html: content }} />
			{cta && <CTA {...{ cta_button: cta }} />}
		</div>

		{(featureImage)
			&& <Img
				fluid={featureImage.childImageSharp.fluid}
			/>
		}

		{(!featureImage && image)
			&& <Img
				fluid={getFluidGatsbyImage(image.filename, {
					maxWidth: 500,
					maxHeight: 500 * 0.48
				})}
			/>
		}

	</article>
);

export default ContentBlock;
