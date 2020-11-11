import React from 'react';
import { getFluidGatsbyImage } from 'gatsby-storyblok-image';
import Img from 'gatsby-image';

import Block from "../../parts/block";
import CTA from '../../parts/cta';
import ImageBlob from '../../parts/image_blob';

import './style.scss';

const Content = ({
	heading, content, cta_button, image
}) => (
	<Block className="content_block">
		<div className="content">
			<h2>{heading}</h2>
			<div dangerouslySetInnerHTML={{ __html: content }} />
			<CTA {...{ cta_button }} />
		</div>
		<ImageBlob {...{ ...image, width: 500 }} />
	</Block>
);

export default Content;
