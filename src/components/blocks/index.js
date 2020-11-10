import React from 'react';

import Banner from './banner';
import Content from './content';

const Block = ({
	component, data
}) => {
	switch (component) {
		case `banner`:
			return <Banner {...data} />;
		case `content_block`:
			return <Content {...data} />;
		default:
			return <h2>{component}</h2>;
	}
};

export default Block;
