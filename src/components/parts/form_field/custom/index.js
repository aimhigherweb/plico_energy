import React from 'react';

import TimeRange from './call_between_time';

const Custom = ({
	type, _uid, label
}) => {
	let Component = () => <h2>Custom - {type}</h2>;

	if (type === `call_between_time`) {
		Component = TimeRange;
	}

	return (
		<Component {...{ _uid, label }} />
	);
};

export default Custom;
