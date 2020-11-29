import React, { Fragment } from 'react';

import generateSlug from '../../../../../utils/generateSlug';

const TimeRange = ({
	_uid, label, parent, values, fieldChanged
}) => (
	<fieldset id={`field_${_uid}`}>
		<legend>{label}</legend>
		<p className="description">Choose a time between 9am and 6pm</p>
		<div>
			<label htmlFor={`start_time${_uid}`} className="hidden">Call after</label>
			<input
				name={`${parent}${generateSlug(label)}_start-time`}
				id={`start_time${_uid}`}
				type="time"
				min="09:00"
				max="17:00"
				step="60"
				onChange={(e) => (fieldChanged(`${parent}${generateSlug(label)}-start_time`, e.target.value))}
			/>
			<label htmlFor={`end_time${_uid}`} className="hidden">Call before</label>
			<input
				name={`${parent}${generateSlug(label)}_end-time`}
				id={`end_time${_uid}`}
				type="time"
				min="10:00"
				max="18:00"
				step="60"
				onChange={(e) => (fieldChanged(`${parent}${generateSlug(label)}-end_time`, e.target.value))}
			/>
		</div>
	</fieldset>
);

export default TimeRange;
