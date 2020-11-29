import React from 'react';

// eslint-disable-next-line import/no-cycle
import Field from "..";
import generateSlug from '../../../../utils/generateSlug';

import './style.scss';

const FieldGroup = ({
	fields, label, _uid, parent = ``, parents = [], fieldChanged, values
}) => {
	const hidden_label = label && true;

	if (label === ``) {
		label = false;
	}

	if (label) {
		parent = `${parent}${generateSlug(label)}_`;
		parents.push(label);
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
								parent,
								parents,
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
