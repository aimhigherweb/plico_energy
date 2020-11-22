import React from 'react';
import { getFluidGatsbyImage } from 'gatsby-storyblok-image';
import Img from 'gatsby-image';
import SVG from 'react-inlinesvg';

const FeatureImage = ({ graphic, image, component }) => {
	let Image = null;

	if (component === `video`) {
		Image = <div></div>;
	} else if (component === `graphic`) {
		Image = <SVG src={graphic.filename} />;
	} else if (component === `image_blob`) {
		Image = <div></div>;
	} else if (component === `image`) {
		Image = <Img fluid={getFluidGatsbyImage(image.filename, { maxWidth: 500 })} />;
	}

	return Image;
};

export default FeatureImage;
