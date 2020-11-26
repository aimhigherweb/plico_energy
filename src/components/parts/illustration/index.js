import React from 'react';

import Animated from '../animated_svg';
import Plug from '../../../img/animations/plug.svg';

import './style.scss';

const Illustration = ({ component, illustration, position }) => {
	let Component = () => <span></span>;

	if (component === `illustration_side`) {
		Component = Plug;
	} else if (component === `illustration_top`) {
		if (illustration === `plug`) {
			Component = Plug;
		}
	}

	return (
		<Animated position={position} className={`illustration ${component}`}>
			<Component />
		</Animated>
	);
};

export default Illustration;
