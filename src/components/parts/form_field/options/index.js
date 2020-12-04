/* eslint-disable one-var */

import React, { Fragment } from 'react';

import generateSlug from '../../../../utils/generateSlug';

import './style.scss';

const Radio = ({
	name, options, type, fieldChanged, value, classes
}) => (
	<fieldset className={classes}>
		<div className="options">
			{options.map((opt) => {
				const currentValue = opt.value || generateSlug(opt.label);
				return (
					<Fragment key={opt.label}>
						<input
							type={type}
							onChange={(e) => (fieldChanged(name, e.target.value))}
							id={`${name}_${generateSlug(opt.label)}`}
							name={name}
							value={currentValue}
							defaultChecked={value === currentValue}
						/>
						<label htmlFor={`${name}_${generateSlug(opt.label)}`}>{opt.label}</label>
					</Fragment>
				);
			})}
		</div>
	</fieldset>
);

const Select = ({
	options
}) => (
	<Fragment>
		<option>Please select</option>
		{options.map((opt) => (
			<option
				key={opt.label}
				value={opt.value || generateSlug(opt.label)}
			>
				{opt.label}
			</option>
		))}
	</Fragment>
);

const Options = ({
	label, type, _uid, field_id, hidden_label, options, fieldChanged, values, description, classes
}) => {
	let Component = Select,
		placeholder = ``;

	if (![`select`, `datalist`].includes(type)) {
		Component = Radio;
	}

	if (hidden_label) {
		placeholder = label;
	}

	const name = field_id,
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
		<Fragment>
			<label htmlFor={_uid} className={hidden_label && `invisible`}>{label}</label>
			{description && <div className="description" dangerouslySetInnerHTML={{ __html: description }} />}
			{type === `datalist`
				&& <Fragment>
					<input
						className={classes}
						list={`list_${_uid}`}
						id={_uid}
						name={name}
						onChange={(e) => (fieldChanged(name, e.target.value))}
						value={value}
					/>
					<datalist
						name={`list_${_uid}`}
						id={`list_${_uid}`}

					>
						{options.map((opt) => (
							<option key={opt.label} value={opt.label} />
						))}
					</datalist>
				</Fragment>
			}
			{type === `select`
				&& <select
					className={classes}
					name={name}
					id={_uid}
					onChange={(e) => (fieldChanged(name, e.target.value))}
					value={value}
				>
					<Component {...{
						options,
					}} />
				</select>
			}
			{![`select`, `datalist`].includes(type)
			&& <Component {...{
				label,
				type,
				_uid,
				name,
				placeholder,
				options,
				classes,
				fieldChanged,
				value
			}} />
			}
		</Fragment>
	);
};

export default Options;
