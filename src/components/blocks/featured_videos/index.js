import React from 'react';

import Block from "../../parts/block";
import Video from '../../parts/video';

import './style.scss';

const FeaturedVideos = ({
	videos, heading, nextBlock, previousBlock
}) => (
	<Block
		className='featured_videos'
		order={{ nextBlock, previousBlock }}
	>
		{heading && <h2>{heading}</h2>}
		<div className="videos">
			{videos.map((video) => (
				<Video key={video.video_url} {...video} />
			))}
		</div>

	</Block>
);

export default FeaturedVideos;
