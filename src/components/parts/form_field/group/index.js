import React from 'react';

import Field from "..";

import './style.scss';

const FieldGroup = ({ fields, label }) => {
	const hidden_label = label && true;

	if (label == ``) {
		label = false;
	}

	return (
		<fieldset>
			<div>
				{label && <legend>{label}</legend>}
				{fields.map((field) => (
					<Field {...{ component: field.component, data: { ...field, hidden_label } }} />
				))}
			</div>
		</fieldset>
	);
};

export default FieldGroup;
