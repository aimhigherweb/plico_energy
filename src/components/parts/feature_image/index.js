import React from 'react';
import Img from 'gatsby-image';
import SVG from 'react-inlinesvg';

import ImageBlob from '../image_blob';
import BannerBlob from '../image_blob_banner';
import Video from '../video';
import Quote from '../quote';
import Fact from '../fact';

const FeatureImage = ({
	featureImage, video_url, component, position, illustration, heading, content, banner, graphic
}) => {
	let Media = null;
	if (component === `video`) {
		Media = <Video {...{ video_url, featureImage }} />;
	} else if (component === `graphic`) {
		console.log(featureImage.childImageSharp || featureImage.graphic);
		if (featureImage.childImageSharp || featureImage.graphic) {
			Media = <Img fluid={featureImage.graphic.fluid || featureImage.childImageSharp.fluid} />;
		} else {
			Media = <SVG src={featureImage.url} />;
		}
	} else if (component === `image_blob`) {
		if (banner) {
			Media = <BannerBlob {...{ ...featureImage }} />;
		} else {
			Media = <ImageBlob {...{ ...featureImage }} />;
		}
	} else if (component === `image`) {
		Media = <Img
			className={`align_${position} image`}
			fluid={featureImage.image.fluid}
			imgStyle={{ objectFit: banner ? `cover` : `contain` }}
		/>;
	} else if (component === `quote`) {
		Media = <Quote {...{ illustration, content }} />;
	} else if (component === `fact`) {
		Media = <Fact {...{ content, heading }} />;
	}

	return Media;
};

export default FeatureImage;
