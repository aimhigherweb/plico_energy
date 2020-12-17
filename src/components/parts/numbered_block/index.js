import React from 'react';
import Img from 'gatsby-image';

import CTA from "../cta";

import './style.scss';

const NumberedBlock = ({
	heading, content, featureImage, cta, index
}) => (
	<article className="article numbered">
		<div className="content">
			<h3>{index + 1}. {heading}</h3>
			<div dangerouslySetInnerHTML={{ __html: content }} />
			{cta && <CTA {...{ cta_button: cta }} />}
		</div>

		{(featureImage && featureImage.childImageSharp)
			&& <Img
				fluid={featureImage.childImageSharp.fluid}
			/>
		}
		{(featureImage && featureImage.svg)
			&& <span
				className="svg"
				dangerouslySetInnerHTML={{ __html: featureImage.svg.content }}
			/>
		}

	</article>
);

export default NumberedBlock;
