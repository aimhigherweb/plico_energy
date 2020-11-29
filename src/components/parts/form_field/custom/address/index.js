import React, { Fragment } from 'react';

import Countries from './countries_list';

import generateSlug from '../../../../../utils/generateSlug';

const TimeRange = ({
	_uid, label, parent, values, fieldChanged
}) => (
	<fieldset id={`field_${_uid}`}>
		<legend>{label}</legend>
		<label htmlFor={`street_address_1${_uid}`}>Street Address 1</label>
		<input
			name={`${parent}${generateSlug(label)}_street-address-1`}
			id={`street_address_1${_uid}`}
			type="text"
			onChange={(e) => (fieldChanged(`${parent}${generateSlug(label)}_street-address-1`, e.target.value))}
			value={values[`${parent}${generateSlug(label)}_street-address-1`]}
		/>
		<label htmlFor={`street_address_2${_uid}`}>Street Address 2</label>
		<input
			name={`${parent}${generateSlug(label)}_street-address-2`}
			id={`street_address_2${_uid}`}
			type="text"
			onChange={(e) => (fieldChanged(`${parent}${generateSlug(label)}_street-address-2`, e.target.value))}
			value={values[`${parent}${generateSlug(label)}_street-address-2`]}
		/>
		<fieldset>
			<div>
				<label htmlFor={`suburb${_uid}`}>Suburb/City</label>
				<input
					name={`${parent}${generateSlug(label)}_suburb`}
					id={`suburb${_uid}`}
					type="text"
					onChange={(e) => (fieldChanged(`${parent}${generateSlug(label)}_suburb`, e.target.value))}
					value={values[`${parent}${generateSlug(label)}_suburb`]}
				/>
				<label htmlFor={`state${_uid}`}>State</label>
				<select
					name={`${parent}${generateSlug(label)}_state`}
					id={`state${_uid}`}
					onChange={(e) => (fieldChanged(`${parent}${generateSlug(label)}_state`, e.target.value))}
					value={values[`${parent}${generateSlug(label)}_state`]}
				>
					<option>Please select</option>
					<option value="act">ACT</option>
					<option value="nsw">NSW</option>
					<option value="nt">NT</option>
					<option value="qld">QLD</option>
					<option value="sa">SA</option>
					<option value="tas">TAS</option>
					<option value="wa">WA</option>
				</select>
			</div>
		</fieldset>
		<fieldset>
			<div>
				<label htmlFor={`postcode${_uid}`}>Post Code</label>
				<input
					name={`${parent}${generateSlug(label)}_postcode`}
					id={`postcode${_uid}`}
					type="text"
					onChange={(e) => (fieldChanged(`${parent}${generateSlug(label)}_postcode`, e.target.value))}
					value={values[`${parent}${generateSlug(label)}_postcode`]}
				/>
				<label htmlFor={`country${_uid}`}>Country</label>
				<input
					name={`${parent}${generateSlug(label)}_country`}
					id={`country${_uid}`}
					list={`list${_uid}`}
					type="text"
					defaultValue="Australia"
					onChange={(e) => (fieldChanged(`${parent}${generateSlug(label)}_country`, e.target.value))}
					value={values[`${parent}${generateSlug(label)}_country`]}
				/>
				<Countries id={`list${_uid}`} />
			</div>
		</fieldset>
	</fieldset>
);

export default TimeRange;
