import React from 'react';

// eslint-disable-next-line import/no-cycle
import Field from "..";

import './style.scss';

const FieldGroup = ({
	fields, label, _uid, fieldChanged, values
}) => {
	const hidden_label = label && true;

	if (label === ``) {
		label = false;
	}

	return (
		<fieldset id={`field_${_uid}`}>
			{label && <legend>{label}</legend>}
			<div>
				{fields.map((field, index) => (
					<Field
						key={JSON.stringify(field)}
						{...{
							component: field.component,
							data: {
								...field,
								hidden_label,
								fieldChanged,
								classes: index % 2 !== 0 ? `second` : ``
							},
							conditional: field.conditional,
							values
						}}
					/>
				))}
			</div>
		</fieldset>
	);
};

export default FieldGroup;
