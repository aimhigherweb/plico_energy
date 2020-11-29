import React from 'react';

import Animated from '../animated_svg';
import Plug from '../../../img/animations/plug.svg';
import Pig from '../../../img/animations/pig_squiggle.svg';
import Lightning from '../../../img/animations/lightning_squiggle.svg';

import './style.scss';

const Illustration = ({ component, illustration, position }) => {
	let Component = () => <span></span>;

	if (component === `illustration_side`) {
		Component = Plug;
	} else if (component === `illustration_top`) {
		if (illustration === `plug`) {
			Component = Plug;
		} else if (illustration === `pig`) {
			Component = Pig;
		} else if (illustration === `lightning`) {
			Component = Lightning;
		}
	} else if (component === `illustration_bottom`) {
		if (illustration === `lightning`) {
			Component = Lightning;
		}
	}

	return (
		<Animated position={position} className={`illustration ${component} ${illustration}`}>
			<Component />
		</Animated>
	);
};

export default Illustration;
