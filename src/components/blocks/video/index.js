import React from 'react';

import Block from "../../parts/block";
import CTA from '../../parts/cta';
import Video from '../../parts/video';

const VideoBlock = ({
	heading, content, cta_button, video
}) => (
	<Block>
		<h2>{heading}</h2>
		<div dangerouslySetInnerHTML={{ __html: content }} />
		<CTA {...{ cta_button }} />
		{video.map((vid, index) => (
			<Video key={index} {...{ ...vid, index }} />
		))}
	</Block>
);

export default VideoBlock;
