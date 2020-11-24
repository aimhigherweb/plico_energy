import React, { useRef } from 'react';

import Text from './text';
import Options from './options';
import Custom from './custom';
// eslint-disable-next-line import/no-cycle
import Group from './group';

import './style.scss';

const Field = ({
	component, data
}) => {
	let Component,
		conditional = false;

	switch (component) {
		case `text`:
			Component = Text;
			break;
		case `custom`:
			Component = Custom;
			break;
		case `field_group`:
			Component = Group;
			break;
		case `options`:
			Component = Options;
			break;
		default:
			Component = <h2>{component}</h2>;
			break;
	}

	if (data.conditional && data.conditional.field !== ``) {
		conditional = true;
	}
	return <Component {...{ ...data, conditional }} />;
};

export default Field;
