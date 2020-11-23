import React from 'react';

import Content from './content';
import LatestNews from './news';
import Testimonials from './testimonials';
import Form from './form';

const Block = ({
	component, data
}) => {
	switch (component) {
		case `content_block`:
			return <Content {...data} />;
		case `latest_news`:
			return <LatestNews {...data} />;
		case `testimonials_block`:
			return <Testimonials {...data} />;
		case `request_a_call`:
			return <Form {...data} />;
		default:
			return <h2>{component}</h2>;
	}
};

export default Block;
