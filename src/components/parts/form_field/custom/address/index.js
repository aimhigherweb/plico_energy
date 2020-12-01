import React, { Fragment } from 'react';

import Countries from './countries_list';

import generateSlug from '../../../../../utils/generateSlug';

const TimeRange = ({
	_uid, label, parent, values, fieldChanged, field_id
}) => {
	const name = `${parent}${field_id}`,
		structure = name.split(`_`);

	let value;

	if (structure.length >= 1 && values[structure[0]]) {
		value = values[structure[0]];

		if (structure.length >= 2 && (value[structure[1]] || value[structure[1]] === ``)) {
			value = value[structure[1]];

			if (structure.length >= 3 && (value[structure[2]] || value[structure[2]] === ``)) {
				value = value[structure[2]];
			}
		}
	}

	return (
		<fieldset id={`field_${_uid}`}>
			<legend>{label}</legend>
			<label htmlFor={`street_address_1${_uid}`}>Street Address 1</label>
			<input
				name={`${name}_street-address-1`}
				id={`street_address_1${_uid}`}
				type="text"
				onChange={(e) => (fieldChanged(`${name}_street-address-1`, e.target.value))}
				value={value[`street-address-1`]}
			/>
			<label htmlFor={`street_address_2${_uid}`}>Street Address 2</label>
			<input
				name={`${name}_street-address-2`}
				id={`street_address_2${_uid}`}
				type="text"
				onChange={(e) => (fieldChanged(`${name}_street-address-2`, e.target.value))}
				value={value[`street-address-2`]}
			/>
			<fieldset>
				<div>
					<label htmlFor={`suburb${_uid}`}>Suburb/City</label>
					<input
						name={`${name}_suburb`}
						id={`suburb${_uid}`}
						type="text"
						onChange={(e) => (fieldChanged(`${name}_suburb`, e.target.value))}
						value={value.suburb}
					/>
					<label htmlFor={`state${_uid}`}>State</label>
					<select
						name={`${name}_state`}
						id={`state${_uid}`}
						onChange={(e) => (fieldChanged(`${name}_state`, e.target.value))}
						value={value.state}
						className='second'
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
						name={`${name}_postcode`}
						id={`postcode${_uid}`}
						type="text"
						onChange={(e) => (fieldChanged(`${name}_postcode`, e.target.value))}
						value={value.postcode}
					/>
					<label htmlFor={`country${_uid}`}>Country</label>
					<input
						name={`${name}_country`}
						id={`country${_uid}`}
						list={`list${_uid}`}
						type="text"
						defaultValue="Australia"
						onChange={(e) => (fieldChanged(`${name}_country`, e.target.value))}
						value={value.country}
						className='second'
					/>
					<Countries id={`list${_uid}`} />
				</div>
			</fieldset>
		</fieldset>
	);
};

export default TimeRange;
