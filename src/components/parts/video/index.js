import React, { useRef } from 'react';
import { getFixedGatsbyImage } from 'gatsby-storyblok-image';
import Img from 'gatsby-image';

import Play from '../../../img/play.svg';

import './style.scss';

const Video = ({
	video_url, image
}) => {
	const ref = useRef(null),
	 videoId = video_url.match(/(?:http:|https:|)\/\/(?:player.|www.)?vimeo\.com\/(?:video\/|embed\/|watch\?\S*v=|v\/)?(\d*)/i)[1],
		playVideo = (id, e) => {
			ref.current.setAttribute(`src`, `https://player.vimeo.com/video/${videoId}?autoplay=1&autopause=0`);
			e.currentTarget.classList.add(`hidden`);
		};

	return (
		<div className="video-embed">
			<button onClick={(e) => { playVideo(videoId, e); }}>
				<Play/>
				<Img fixed={getFixedGatsbyImage(image.filename, { width: 500 })} />
			</button>
			<iframe
				ref={ref}
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
