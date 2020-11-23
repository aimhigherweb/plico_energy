/* eslint-disable one-var */

import React, { Fragment } from 'react';

import generateSlug from '../../../../utils/generateSlug';

const Text = ({
	type, _uid, name, placeholder
}) => {
	if (type === `email` && placeholder == ``) {
		placeholder = `hello@domain.com`;
	}
	return (
		<input type={type} name={name} id={_uid} placeholder={placeholder} />
	);
};

const TextArea = ({
	_uid, placeholder
}) => (
	<textarea id={_uid}>{placeholder}</textarea>
);

const TextInput = ({
	label, type, _uid, hidden_label
}) => {
	let Field = Text,
		placeholder = ``;

	if (type === `textarea`) {
		Field = TextArea;
	}

	if (hidden_label) {
		placeholder = label;
	}

	return (
		<Fragment>
			<label htmlFor={_uid} className={hidden_label && `hidden`}>{label}</label>
			<Field {...{
				type, _uid, name: generateSlug(label), placeholder
			}} />
		</Fragment>
	);
};

export default TextInput;
