import React, { Fragment } from 'react';

import generateSlug from '../../../../../utils/generateSlug';

const TimeRange = ({ _uid, label }) => (
	<fieldset id={`field_${_uid}`} className="hidden">
		<legend>{label}</legend>
		<div>
			<label htmlFor={`start_time${_uid}`} className="hidden">Call after</label>
			<input
				name={`${generateSlug(label)}-start_time`}
				id={`start_time${_uid}`}
				type="time"
				min="09:00"
				max="17:00"
				step="3600"
			/>
			<label htmlFor={`end_time${_uid}`} className="hidden">Call before</label>
			<input
				name={`${generateSlug(label)}-end_time`}
				id={`end_time${_uid}`}
				type="time"
				min="10:00"
				max="18:00"
				step="3600"
			/>
		</div>
	</fieldset>
);

export default TimeRange;
