/* eslint-disable one-var */

import React, { Fragment, useEffect, useState } from 'react';

import generateSlug from '../../../../utils/generateSlug';

import './style.scss';

const Radio = ({
	name, options, type, parent, fieldChanged, value
}) => (
	<fieldset>
		<div className="options">
			{options.map((opt) => {
				const currentValue = opt.value || generateSlug(opt.label);
				return (
					<Fragment key={opt.label}>
						<input
							type={type}
							onChange={(e) => (fieldChanged(name, e.target.value))}
							id={generateSlug(opt.label)}
							name={`${parent}${name}`}
							value={currentValue}
							defaultChecked={value === currentValue}
						/>
						<label htmlFor={generateSlug(opt.label)}>{opt.label}</label>
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
	label, type, _uid, hidden_label, options, parent = ``, fieldChanged, values
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
				&& <Fragment>
					<input
						list={`list_${_uid}`}
						id={_uid}
						name={`${parent}${generateSlug(label)}`}
						defaultValue={values[`${parent}${generateSlug(label)}`]}
						onChange={(e) => (fieldChanged(`${parent}${generateSlug(label)}`, e.target.value))}
						value={values[`${parent}${generateSlug(label)}`]}
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
					name={`${parent}${generateSlug(label)}`}
					id={_uid}
					onChange={(e) => (fieldChanged(`${parent}${generateSlug(label)}`, e.target.value))}
					value={values[`${parent}${generateSlug(label)}`]}
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
				_uid: type === `datalist` ? `list_${_uid}` : _uid,
				name: `${parent}${generateSlug(label)}`,
				placeholder,
				options,
				parent,
				fieldChanged,
				value: values[`${parent}${generateSlug(label)}`]
			}} />
			}
		</Fragment>
	);
};

export default Options;
