import React from 'react';

// eslint-disable-next-line import/no-cycle
import Field from "..";
import generateSlug from '../../../../utils/generateSlug';

const FormPage = ({
	fields, label, _uid, parent = ``, parents = [], values, fieldChanged, content, description
}) => {
	if (label === ``) {
		label = false;
	}

	if (label) {
		parent = `${parent}${generateSlug(label)}_`;
		parents.push(label);
	}

	return (
		<div id={`page_${_uid}`} className="page">
			{label && <h2>{label}</h2>}
			{content && <div className="description" dangerouslySetInnerHTML={{ __html: content }} />}
			{description && <div className="description" dangerouslySetInnerHTML={{ __html: description }} />}
			{fields.map((field) => (
				<Field
					key={JSON.stringify(field)}
					{...{
						component: field.component,
						data: {
							...field,
							parent,
							parents,
							fieldChanged,
							values
						},
						values
					}}
				/>
			))}
		</div>
	);
};

export default FormPage;
