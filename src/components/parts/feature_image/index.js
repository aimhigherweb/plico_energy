import React from 'react';
import { getFluidGatsbyImage } from 'gatsby-storyblok-image';
import Img from 'gatsby-image';
import SVG from 'react-inlinesvg';

import ImageBlob from '../image_blob';
import BannerBlob from '../image_blob_banner';
import Video from '../video';
import Quote from '../quote';

const FeatureImage = ({
	image, video_url, component, position, illustration, content, width = 500, banner
}) => {
	let Media = null;

	console.log(banner);

	if (component === `video`) {
		Media = <Video {...{ video_url, image }} />;
	} else if (component === `graphic`) {
		Media = <SVG src={image.filename} />;
	} else if (component === `image_blob`) {
		if (banner) {
			Media = <BannerBlob {...{ ...image, width }} />;
		} else {
			Media = <ImageBlob {...{ ...image, width }} />;
		}
	} else if (component === `image`) {
		Media = <Img className={`align_${position} image`} fluid={getFluidGatsbyImage(image.filename, { maxWidth: width })} />;
	} else if (component === `quote`) {
		Media = <Quote {...{ illustration, content }} />;
	}

	return Media;
};

export default FeatureImage;
