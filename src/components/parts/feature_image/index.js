import React from 'react';
import { getFluidGatsbyImage } from 'gatsby-storyblok-image';
import Img from 'gatsby-image';
import SVG from 'react-inlinesvg';

import ImageBlob from '../image_blob';
import Video from '../video';

const FeatureImage = ({
	image, video_url, component, position, width = 500
}) => {
	let Image = null;

	if (component === `video`) {
		Image = <Video {...{ video_url, image }} />;
	} else if (component === `graphic`) {
		Image = <SVG src={image.filename} />;
	} else if (component === `image_blob`) {
		Image = <ImageBlob {...{ ...image, width }} />;
	} else if (component === `image`) {
		Image = <Img className={`align_${position} image`} fluid={getFluidGatsbyImage(image.filename, { maxWidth: width })} />;
	}

	return Image;
};

export default FeatureImage;
