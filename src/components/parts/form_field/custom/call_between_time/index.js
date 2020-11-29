import React, { Fragment } from 'react';

import generateSlug from '../../../../../utils/generateSlug';

const TimeRange = ({
	_uid, label, parent
}) => (
	<fieldset id={`field_${_uid}`}>
		<legend>{label}</legend>
		<p className="description">Choose a time between 9am and 6pm</p>
		<div>
			<label htmlFor={`start_time${_uid}`} className="hidden">Call after</label>
			<input
				name={`${parent}${generateSlug(label)}-start_time`}
				id={`start_time${_uid}`}
				type="time"
				min="09:00"
				max="17:00"
				step="60"
			/>
			<label htmlFor={`end_time${_uid}`} className="hidden">Call before</label>
			<input
				name={`${parent}${generateSlug(label)}-end_time`}
				id={`end_time${_uid}`}
				type="time"
				min="10:00"
				max="18:00"
				step="60"
			/>
		</div>
	</fieldset>
);

export default TimeRange;
