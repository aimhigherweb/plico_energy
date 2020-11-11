import React from 'react';

import Block from "../../parts/block";
import CTA from '../../parts/cta';
import Video from '../../parts/video';

import Curve from '../../../img/blob_video.svg';

import './style.scss';

const VideoBlock = ({
	heading, content, cta_button, video
}) => (
	<Block className="video">
		<Curve className="curve" />
		<h2>{heading}</h2>
		<div dangerouslySetInnerHTML={{ __html: content }} />
		<CTA {...{ cta_button }} />
		{video.map((vid, index) => (
			<Video key={index} {...{ ...vid, index }} />
		))}
	</Block>
);

export default VideoBlock;
