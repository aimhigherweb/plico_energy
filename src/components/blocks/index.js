import React from 'react';

import Banner from './banner';
import Content from './content';
import Video from './video';
import LatestNews from './news';
import Testimonials from './testimonials';

const Block = ({
	component, data
}) => {
	switch (component) {
		case `banner`:
			return <Banner {...data} />;
		case `content_block`:
			return <Content {...data} />;
		case `video_block`:
			return <Video {...data} />;
		case `latest_news`:
			return <LatestNews {...data} />;
		case `testimonials_block`:
			return <Testimonials {...data} />;
		default:
			return <h2>{component}</h2>;
	}
};

export default Block;
