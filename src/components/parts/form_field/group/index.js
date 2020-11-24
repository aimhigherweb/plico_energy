import React from 'react';

// eslint-disable-next-line import/no-cycle
import Field from "..";

import './style.scss';

const FieldGroup = ({ fields, label, _uid }) => {
	const hidden_label = label && true;

	if (label === ``) {
		label = false;
	}

	return (
		<fieldset id={`field_${_uid}`}>
			{label && <legend>{label}</legend>}
			<div>
				{fields.map((field) => (
					<Field
						key={JSON.stringify(field)}
						{...{ component: field.component, data: { ...field, hidden_label } }}
					/>
				))}
			</div>
		</fieldset>
	);
};

export default FieldGroup;
