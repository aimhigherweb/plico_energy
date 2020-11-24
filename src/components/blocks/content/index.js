import React from 'react';
import { getFluidGatsbyImage } from 'gatsby-storyblok-image';
import Img from 'gatsby-image';

import Block from "../../parts/block";
import CTA from '../../parts/cta';
import ImageBlob from '../../parts/image_blob';
import FeatureImage from '../../parts/feature_image';

import './style.scss';

const Content = ({
	heading, content, cta_button, media, illustration, background
}) => {
	const classes = `content_block ${media.length && media[0].component} ${illustration.length ? illustration[0].component : ``} ${background ? `background` : ``}`;

	return (
		<Block className={classes}>
			<div className="content">
				<h2>{heading}</h2>
				<div dangerouslySetInnerHTML={{ __html: content }} />
				<CTA {...{ cta_button }} />
			</div>
			{media && <FeatureImage {...media[0]} />}
		</Block>
	);
};

export default Content;
