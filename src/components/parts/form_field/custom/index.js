import React from 'react';

import TimeRange from './call_between_time';
import Address from './address';
import SystemConfiguration from './system_configuration';

const Custom = ({
	type, _uid, label, field_id, parent = ``, fieldChanged, values
}) => {
	let Component = () => <h2>Custom - {type}</h2>;

	if (type === `call_between_time`) {
		Component = TimeRange;
	}

	if (type === `address`) {
		Component = Address;
	}

	if (type === `system_configuration`) {
		Component = SystemConfiguration;
	}

	return (
		<Component {...{
			_uid, label, field_id, parent, fieldChanged, values
		}} />
	);
};

export default Custom;
