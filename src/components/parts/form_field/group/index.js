import React from 'react';
import { useFormikContext } from 'formik';

// eslint-disable-next-line import/no-cycle
import Field from "..";
import generateSlug from '../../../../utils/generateSlug';

import './style.scss';

const FieldGroup = ({
	fields, label, _uid, parent = ``, onChange, values
}) => {
	const hidden_label = label && true;

	if (label === ``) {
		label = false;
	}

	if (label) {
		parent = `${parent}${generateSlug(label)}_`;
	}

	return (
		<fieldset id={`field_${_uid}`}>
			{label && <legend>{label}</legend>}
			<div>
				{fields.map((field) => (
					<Field
						key={JSON.stringify(field)}
						{...{
							component: field.component,
							data: {
								...field,
								hidden_label,
								parent,
								onChange
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
