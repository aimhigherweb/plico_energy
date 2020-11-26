import React from 'react';

import Animated from '../animated_svg';
import Plug from '../../../img/animations/plug.svg';

import './style.scss';

const Illustration = ({ component, position }) => {
	let Component = () => <span></span>;

	console.log(component);

	switch (component) {
		case `illustration_side`:
			Component = Plug;
			break;
	}

	return (
		<Animated position={position} className={`illustration ${component}`}>
			<Component />
		</Animated>
	);
};

export default Illustration;
