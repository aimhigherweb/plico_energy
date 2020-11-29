import React from 'react';

// eslint-disable-next-line import/no-cycle
import Field from "..";
import generateSlug from '../../../../utils/generateSlug';

// import './style.scss';

const FormPage = ({
	fields, label, _uid, parent = ``, parents = [], onChange, values
}) => {
	if (label === ``) {
		label = false;
	}

	if (label) {
		parent = `${parent}${generateSlug(label)}_`;
		parents.push(label);
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
							parents,
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
