/* eslint-disable one-var */

import React, { Fragment } from 'react';
import { Field } from 'formik';

import generateSlug from '../../../../utils/generateSlug';

const TextInput = ({
	label, type, _uid, hidden_label, parent = ``
}) => {
	let field = `input`,
		placeholder = ``;

	if (type === `textarea`) {
		field = `textarea`;
	}

	if (hidden_label) {
		placeholder = label;
	}

	if (type === `email` && placeholder == ``) {
		placeholder = `hello@domain.com`;
	}

	return (
		<Fragment>
			<label
				htmlFor={_uid}
				className={hidden_label && `invisible`}
			>
				{label}
			</label>
			<Field
				as={field}
				type={type}
				name={`${parent}${generateSlug(label)}`}
				id={_uid}
				placeholder={placeholder}
			/>
		</Fragment>
	);
};

export default TextInput;
