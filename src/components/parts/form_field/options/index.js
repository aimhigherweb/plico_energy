/* eslint-disable one-var */

import React, { Fragment } from 'react';

import generateSlug from '../../../../utils/generateSlug';

import './style.scss';

const changeOption = (e, fields) => {
	if (fields) {
		fields.forEach((field) => {
			const el = document.querySelector(`#field_${field.field}`);

			if (el.classList.contains(`hidden`)) {
				el.classList.remove(`hidden`);
			}
		});
	}
};

const Radio = ({
	name, options, conditional
}) => (
	<fieldset className={conditional && `invisible`}>
		<div className="options">
			{options.map((opt) => (
				<Fragment key={opt.label}>
					<input
						data-fields={JSON.stringify(opt.dependent_field)}
						type="radio"
						onChange={(e) => changeOption(e, opt.dependent_field)}
						id={generateSlug(opt.label)}
						name={name}
					/>
					<label htmlFor={generateSlug(opt.label)}>{opt.label}</label>
				</Fragment>
			))}
		</div>
	</fieldset>
);

const Select = ({
	_uid, name, options
}) => (
	<select id={_uid} name={name}>
		<option>Please select</option>
		{options.map((opt) => (
			<option key={opt.label} value={generateSlug(opt.label)}>{opt.label}</option>
		))}
	</select>
);

const Checkboxes = ({
	name, options
}) => (
	<fieldset>
		<div className="options">
			{options.map((opt) => (
				<Fragment key={opt.label}>
					<input type="checkbox" id={generateSlug(opt.label)} name={name} />
					<label htmlFor={generateSlug(opt.label)}>{opt.label}</label>
				</Fragment>
			))}
		</div>
	</fieldset>
);

const Options = ({
	label, type, _uid, hidden_label, options, conditional
}) => {
	let Field = Select,
		placeholder = ``;

	if (type === `radio`) {
		Field = Radio;
	}

	if (type === `checkbox`) {
		Field = Checkboxes;
	}

	if (hidden_label) {
		placeholder = label;
	}

	return (
		<Fragment>
			<label htmlFor={_uid} className={hidden_label && `invisible`}>{label}</label>
			<Field {...{
				label,
				type,
				_uid,
				name: generateSlug(label),
				placeholder,
				options,
				conditional
			}} />
		</Fragment>
	);
};

export default Options;
