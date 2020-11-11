import React from 'react';
import { getFixedGatsbyImage } from 'gatsby-storyblok-image';
import Img from 'gatsby-image';

import Play from '../../../img/play.svg';

const Video = ({
	video_url, video_overlay, index
}) => {
	console.log({
		video_url, video_overlay, index
	});
	const videoId = video_url.match(/(?:http:|https:|)\/\/(?:player.|www.)?vimeo\.com\/(?:video\/|embed\/|watch\?\S*v=|v\/)?(\d*)/i)[1],
		playVideo = (id, e) => {
			e.currentTarget.parentNode.querySelector(`iframe.video-${id}`).setAttribute(`src`, `https://www.youtube.com/embed/${id}?&autoplay=1&rel=0`);
			e.currentTarget.classList.add(`hidden`);
		};

	return (
		<div data-video={index}>
			<button onClick={(e) => { playVideo(videoId, e); }}>
				<Play/>
				<Img fixed={getFixedGatsbyImage(video_overlay.filename, { width: 500 })} />
			</button>
			<iframe
				src={`https://player.vimeo.com/video/${videoId}`}
				frameBorder="0"
				allow="autoplay; fullscreen"
				allowFullScreen
			>
			</iframe>
		</div>
	);
};

export default Video;
