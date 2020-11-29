/* eslint-disable one-var */

import React, { Fragment } from 'react';

import generateSlug from '../../../../utils/generateSlug';

const Text = ({
	type, name, id, placeholder, fieldChanged, value, classes
}) => (
	<input className={classes} type={type} name={name} id={id} placeholder={placeholder} onChange={(e) => (fieldChanged(name, e.target.value))} value={value} />
);

const TextArea = ({
	name, id, fieldChanged, value, classes
}) => (
	<textarea
		className={classes}
		name={name}
		id={id}
		onChange={(e) => (fieldChanged(name, e.target.value))}
		value={value}
		rows="6"
	></textarea>
);

const TextInput = ({
	label, type, _uid, hidden_label, parent = ``, fieldChanged, values, description, classes
}) => {
	let placeholder = ``,
		Component = Text;

	if (type == `textarea`) {
		Component = TextArea;
	}

	if (hidden_label) {
		placeholder = label;
	}

	if (type === `email` && placeholder == ``) {
		placeholder = `hello@domain.com`;
	}

	const value = values[`${parent}${generateSlug(label)}`];

	return (
		<Fragment>
			<label
				htmlFor={_uid}
				className={hidden_label && `invisible`}
			>
				{label}
			</label>
			{description && <div className="description" dangerouslySetInnerHTML={{ __html: description }} />}
			<Component
				{...{
					type,
					name: `${parent}${generateSlug(label)}`,
					_uid,
					placeholder,
					fieldChanged,
					value,
					classes
				}}
			/>
		</Fragment>
	);
};

export default TextInput;
