/* eslint-disable one-var */

import React, { Fragment } from 'react';
import { Field, useFormikContext } from 'formik';

import generateSlug from '../../../../utils/generateSlug';

const TextInput = ({
	label, type, _uid, hidden_label, parent = ``, onChange
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

	const value = useFormikContext().values[`${parent}${generateSlug(label)}`];

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
				// onChange={(e) => onChange(e)}
				onBlur={(e) => onChange(e)}
			/>
		</Fragment>
	);
};

export default TextInput;
