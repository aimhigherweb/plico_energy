import React, { useRef } from 'react';

import Text from './text';
import Options from './options';
import Custom from './custom';
// eslint-disable-next-line import/no-cycle
import Group from './group';
// eslint-disable-next-line import/no-cycle
import Page from './page';

import './style.scss';

import { checkConditions } from '../../../utils/formFields';

const Field = ({
	component, data, values
}) => {
	let Component;

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
		case `form_page`:
			Component = Page;
			break;
		default:
			Component = <h2>{component}</h2>;
			break;
	}

	if (checkConditions(values, data.parents, data.label, data.conditional)) {
		return <Component {...{ ...data, values }} />;
	}

	return null;
};

export default Field;
