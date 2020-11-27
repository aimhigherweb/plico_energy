import React from 'react';
import { getFluidGatsbyImage } from 'gatsby-storyblok-image';
import Img from 'gatsby-image';

import Block from "../../parts/block";
import CTA from '../../parts/cta';
import ImageBlob from '../../parts/image_blob';
import FeatureImage from '../../parts/feature_image';
import Background from '../../../img/blob_video.svg';
import Illustration from '../../parts/illustration';
import Section from '../../parts/content_section';

import './style.scss';

const ContentSections = ({
	heading, content, media, illustration, background, sections
}) => {
	let classes = `content_sections`;

	if (media.length) {
		classes = `${classes} ${media[0].component}`;
	}

	if (illustration?.length) {
		classes = `${classes} ${illustration[0].component}`;
	}

	if (background) {
		classes = `${classes} background`;
	}

	return (
		<Block
			className={classes}
		>
			{/* {illustration && <Illustration {...illustration[0]} />} */}
			<div className="main">
				<h2>{heading}</h2>
				<div dangerouslySetInnerHTML={{ __html: content }} />
			</div>
			{media && <FeatureImage {...media[0]} />}
			{sections.map((sect, index) => <Section {...{ ...sect, index }} />)}
		</Block>
	);
};

export default ContentSections;
