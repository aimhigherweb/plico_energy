import generateSlug from './generateSlug';

const formFields = (formFields) => {
	const fields = {};

	formFields.forEach((f1) => {
		const f1_slug = generateSlug(f1.label)
		fields[f1_slug] = ``;

		f1.fields?.forEach(f2 => {
			const f2_slug = f1_slug !== '' ? `${f1_slug}_${generateSlug(f2.label)}` : generateSlug(f2.label)
			fields[f2_slug] = ``;

			f2.fields?.forEach(f3 => {
				const f3_slug = f2_slug !== '' ? `${f2_slug}_${generateSlug(f3.label)}` : generateSlug(f3.label)
				fields[f3_slug] = ``;
			})
		})
	});

	console.log(fields);

	return fields;
};

export default formFields;
