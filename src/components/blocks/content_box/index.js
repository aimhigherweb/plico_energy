import React from 'react';
import { getFluidGatsbyImage } from 'gatsby-storyblok-image';
import Img from 'gatsby-image';

import Block from "../../parts/block";
import CTA from '../../parts/cta';
import ImageBlob from '../../parts/image_blob';
import FeatureImage from '../../parts/feature_image';
import Background from '../../../img/blob_video.svg';
import Illustration from '../../parts/illustration';
import ContentBlock from '../../parts/content_block';

import './style.scss';

const ContentBox = ({
	heading, content, cta_button, background_illustration, image
}) => {
	const classes = `content_box_block`;

	return (
		<Block
			className={classes}
		>
			<ContentBlock
				{...{
					heading,
					content,
					cta: cta_button,
					image
				}}
			/>

		</Block>
	);
};

export default ContentBox;
