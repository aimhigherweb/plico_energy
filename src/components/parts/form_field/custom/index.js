import React from 'react';

import TimeRange from './call_between_time';
import Address from './address';

const Custom = ({
	type, _uid, label, parent
}) => {
	let Component = () => <h2>Custom - {type}</h2>;

	if (type === `call_between_time`) {
		Component = TimeRange;
	}

	if (type === `address`) {
		Component = Address;
	}

	return (
		<Component {...{ _uid, label, parent }} />
	);
};

export default Custom;
