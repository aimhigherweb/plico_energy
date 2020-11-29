import React from 'react';
import { getFluidGatsbyImage } from 'gatsby-storyblok-image';
import Img from 'gatsby-image';

import Block from "../../parts/block";
import CTA from '../../parts/cta';
import ImageBlob from '../../parts/image_blob';
import FeatureImage from '../../parts/feature_image';
import Background from '../../../img/blob_video.svg';
import Illustration from '../../parts/illustration';

import './style.scss';

const Content = ({
	heading, content, cta_button, media, illustration, background, sub_heading, background_colour
}) => {
	let classes = `content_block`;

	if (media.length) {
		classes = `${classes} ${media[0].component}`;

		if (media[0].position) {
			classes = `${classes} media_${media[0].position}`;
		}
	} else {
		classes = `${classes} full_width`;
	}

	if (illustration.length) {
		classes = `${classes} ${illustration[0].component}`;
	}

	if (background) {
		classes = `${classes} background`;
	}

	return (
		<Block
			className={classes}
			styles={{
				"--backgroundFill": background_colour?.colour || `#18304c`,
				"--headingColour": background_colour?.colour === `#00bbd4` ? `#18304c` : `#00bbd4`
			}}
		>
			{background && <Background className="curve" />}
			{illustration && <Illustration {...illustration[0]} />}
			<div className="content">
				{sub_heading && <p className="subtitle">{sub_heading}</p>}
				<h2>{heading}</h2>
				<div className="block_content" dangerouslySetInnerHTML={{ __html: content }} />
				<CTA {...{ cta_button }} />
			</div>
			{media && <FeatureImage {...media[0]} />}

		</Block>
	);
};

export default Content;
