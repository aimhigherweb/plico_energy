import React, { Fragment } from 'react';

import generateSlug from '../../../../utils/generateSlug';

import './style.scss';

const Options = ({
		label, type, _uid, hidden_label, options
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
				<label htmlFor={_uid} className={hidden_label && `hidden`}>{label}</label>
				<Field {...{
					label, type, _uid, name: generateSlug(label), placeholder, options
				}} />
			</Fragment>
		);
	},

	Radio = ({
		name, options
	}) => (
		<fieldset>
			<div className="options">
				{options.map((opt) => (
					<Fragment>
						<input type="radio" id={generateSlug(opt.label)} name={name} />
						<label htmlFor={generateSlug(opt.label)}>{opt.label}</label>
					</Fragment>
				))}
			</div>
		</fieldset>
	),

	Select = ({
		_uid, name, options
	}) => (
		<select id={_uid} name={name}>
			<option>Please select</option>
			{options.map((opt) => (
				<option value={generateSlug(opt.label)}>{opt.label}</option>
			))}
		</select>
	),

	Checkboxes = ({
		name, options
	}) => (
		<fieldset>
			<div className="options">
				{options.map((opt) => (
					<Fragment>
						<input type="checkbox" id={generateSlug(opt.label)} name={name} />
						<label htmlFor={generateSlug(opt.label)}>{opt.label}</label>
					</Fragment>
				))}
			</div>
		</fieldset>
	);

export default Options;
