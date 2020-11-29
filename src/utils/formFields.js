import React, {Fragment} from 'react'

import generateSlug from './generateSlug';

const formFields = (formData) => {
	let fields = {};

	formData.forEach((f1) => {
		if(!f1.label) {
			f1.forEach(page => {
				const page_slug = page.label && generateSlug(page.label)
				fields[page_slug] = ``;

				if(page.component == 'custom') {
					fields = {
						...fields,
						...customFields(page, page_slug)
					}
				}
	
			page.fields?.forEach(f2 => {
				const f2_slug = page_slug !== '' ? `${page_slug}_${generateSlug(f2.label)}` : generateSlug(f2.label)
				fields[f2_slug] = ``;

				if(f2.component == 'custom') {
					fields = {
						...fields,
						...customFields(page, f2_slug)
					}
				}
	
				f2.fields?.forEach(f3 => {
					const f3_slug = f2_slug !== '' ? `${f2_slug}_${generateSlug(f3.label)}` : generateSlug(f3.label)
					fields[f3_slug] = ``;

					if(f3.component == 'custom') {
						fields = {
							...fields,
							...customFields(page, f3_slug)
						}
					}
				})
			})
			})
		}
		else {
			const f1_slug = f1.label && generateSlug(f1.label)
			fields[f1_slug] = ``;

		f1.fields?.forEach(f2 => {
			const f2_slug = f1_slug !== '' ? `${f1_slug}_${generateSlug(f2.label)}` : generateSlug(f2.label)
			fields[f2_slug] = ``;

			f2.fields?.forEach(f3 => {
				const f3_slug = f2_slug !== '' ? `${f2_slug}_${generateSlug(f3.label)}` : generateSlug(f3.label)
				fields[f3_slug] = ``;
			})
		})
		}
	});

	return fields;
};

const customFields = (field, slug) => {
	const fields = {}
	if(field.type === 'call_between_time') {
		fields[`${slug}_start-time`] = ''
		fields[`${slug}_end-time`] = ''
	}
	else if(field.type === 'address') {
		fields[`${slug}_street-address-1`] = ''
		fields[`${slug}_street-address-2`] = ''
		fields[`${slug}_suburb`] = ''
		fields[`${slug}_state`] = ''
		fields[`${slug}_postcode`] = ''
		fields[`${slug}_country`] = ''
	}
	else if(field.type === 'system_configuration') {
		fields[`${slug}_inverters`] = ''
		fields[`${slug}_batteries`] = ''
		fields[`${slug}_number-systems`] = ''
		fields[`${slug}_weekly-cost`] = ''
		fields[`${slug}_agreement`] = ''
	}

	return fields
}

export const StaticForm = ({fields}) => (
	fields.map((f1) => {
		const f1_slug = generateSlug(f1.label),
		f2_fields = f1.fields?.map(f2 => {
			const f2_slug = f1_slug !== '' ? `${f1_slug}_${generateSlug(f2.label)}` : generateSlug(f2.label),
			f3_fields = f2.fields?.map(f3 => {
				const f3_slug = f2_slug !== '' ? `${f2_slug}_${generateSlug(f3.label)}` : generateSlug(f3.label)

				return (
					<input key={f3_slug} type="text" name={f3_slug} />
				)
			})

			return (
				<Fragment>
					<input type="text" name={f2_slug} key={f2_slug} />
					{f3_fields}
				</Fragment>
			)
		})

		return (
			<Fragment>
				
				{f2_fields}
			</Fragment>
		)
	})
)


export const checkConditions = (values, conditional) => {
	if(!conditional || conditional.field == '') {
		return true
	}

	if(conditional.value.split(',').includes(values[conditional.field])) {
		return true
	}

	return false

}

export default formFields;
