/* eslint-disable one-var */

import React, { Fragment, useEffect } from 'react';
import { Field } from 'formik';

import generateSlug from '../../../../utils/generateSlug';

import './style.scss';

const Radio = ({
	name, options, type, parent, onChange
}) => (
	<fieldset>
		<div className="options">
			{options.map((opt) => (
				<Fragment key={opt.label}>
					<Field
						type={type}
						onChange={(e) => onChange(e)}
						id={generateSlug(opt.label)}
						name={`${parent}${name}`}
						value={opt.value || generateSlug(opt.label)}
					/>
					<label htmlFor={generateSlug(opt.label)}>{opt.label}</label>
				</Fragment>
			))}
		</div>
	</fieldset>
);

const Select = ({
	_uid, name, options, parent, onChange, type
}) => (
	<Field
		as={type}
		id={_uid}
		name={`${parent}${name}`}
		onChange={(e) => onChange(e)}
	>
		<option>Please select</option>
		{options.map((opt) => (
			<option key={opt.label} value={opt.value || generateSlug(opt.label)}>{opt.label}</option>
		))}
	</Field>
);

const Options = ({
	label, type, _uid, hidden_label, options, parent = ``, onChange
}) => {
	let Component = Select,
		placeholder = ``;

	if (![`select`, `datalist`].includes(type)) {
		Component = Radio;
	}

	if (hidden_label) {
		placeholder = label;
	}

	return (
		<Fragment>
			<label htmlFor={_uid} className={hidden_label && `invisible`}>{label}</label>
			{type === `datalist`
				&& <input
					list={`list_${_uid}`}
					id={_uid}
					name={`${parent}${generateSlug(label)}`}
					onChange={(e) => onChange(e)}
				/>
			}
			<Component {...{
				label,
				type,
				_uid: type === `datalist` ? `list_${_uid}` : _uid,
				name: generateSlug(label),
				placeholder,
				options,
				parent,
				onChange
			}} />
		</Fragment>
	);
};

export default Options;
