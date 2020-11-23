import React from 'react';

import Text from './text';
import Options from './options';
import Custom from './custom';
import Group from './group';

import './style.scss';

const Field = ({
	component, data
}) => {
	switch (component) {
		case `text`:
			return <Text {...data} />;
		case `custom`:
			return `Custom`;
		case `field_group`:
			return <Group {...data} />;
		case `options`:
			return <Options {...data} />;
		default:
			console.log(component, data);
			return <h2>{component}</h2>;
	}
};

export default Field;
