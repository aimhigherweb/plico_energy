import React from 'react';

// eslint-disable-next-line import/no-cycle
import Field from "..";
import generateSlug from '../../../../utils/generateSlug';

const FormPage = ({
	fields, label, field_id = ``, _uid, values, fieldChanged, content, description
}) => {
	if (label === ``) {
		label = false;
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
