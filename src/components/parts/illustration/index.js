import React from 'react';

import Animated from '../animated_svg';
import Plug from '../../../img/animations/plug.svg';

import './style.scss';

const Illustration = ({ component }) => {
	let Component;

	switch (component) {
		case `illustration_side`:
			Component = Plug;
			break;
	}

	return (
		<Animated className={`illustration ${component}`}>
			<Component />
		</Animated>
	);
};

export default Illustration;
