import React from 'react';
import { useFormikContext } from 'formik';

// eslint-disable-next-line import/no-cycle
import Field from "..";
import generateSlug from '../../../../utils/generateSlug';

// import './style.scss';

const FormPage = ({
	fields, label, _uid, parent = ``, onChange, values
}) => {
	if (label === ``) {
		label = false;
	}

	if (label) {
		parent = `${parent}${generateSlug(label)}_`;
	}

	return (
		<div id={`page_${_uid}`}>
			{label && <h2>{label}</h2>}
			{fields.map((field) => (
				<Field
					key={JSON.stringify(field)}
					{...{
						component: field.component,
						data: {
							...field,
							parent,
							onChange
						},
						conditional: field.conditional,
						values
					}}
				/>
			))}
		</div>
	);
};

export default FormPage;
