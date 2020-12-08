import React from 'react';
import Img from 'gatsby-image';

import CTA from "../cta";

import './style.scss';

const ContentBlock = ({
	heading, content, featureImage, cta
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

	</article>
);

export default ContentBlock;
