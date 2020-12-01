/* eslint-disable one-var */
import React, {Fragment} from 'react'

import generateSlug from './generateSlug';

const formFields = (formData) => {
	let fieldsObject = {};

	const checkSubFields = (field) => {
		let fields = {};

		if(field.component == 'custom') {
			fields = {
				...fields,
				...customFields(field, field.field_id)
			}
		}
		else if (field.fields) {
			let subFields = {};
			if (field.field_id) {
				field.fields.forEach(subField => {
					subFields = {
						...subFields,
						...checkSubFields(subField)
					};
				});

				fields = {
					...fields,
					[field.field_id]: subFields
				};
			}
			else {
				field.fields.forEach(subField => {
					fields = {
						...fields,
						...checkSubFields(subField)
					};
				});
			}
		}
		else if (field.field_id) {
			fields[field.field_id] =``;
		}

		return fields
	}

	formData.forEach((f1) => {

		if(f1.component) {
			fieldsObject = {
				...fieldsObject,
				...checkSubFields(f1)
			}
		}
		else {			
			f1.forEach(page => {
				fieldsObject = {
					...fieldsObject,
					...checkSubFields(page)
				}
			})
		}
	});
	return fieldsObject;
};

const customFields = (field, slug) => {
	let fields = {}
	if(field.type === 'call_between_time') {
		fields = {
			...fields,
			[slug]: {
				'start-time': '',
				'end-time': ''
			}
		}
	}
	else if(field.type === 'address') {
		fields = {
			...fields,
			[slug]: {
				'street-address-1': '',
				'street-address-2': '',
				'suburb': '',
				'state': 'wa',
				'postcode': '',
				'country': 'Australia',
			}
		}
	}
	else if(field.type === 'system_configuration') {
		fields = {
			...fields,
			[slug]: {
				'inverters': '',
				'batteries': '',
				'number-systems': '',
				'weekly-cost': '',
				'agreement': '',
			}
		}
	}

	return fields
}


export const checkConditions = (values, conditional) => {
	if(!conditional || conditional.field == '') {
		return true
	}

	const name = conditional?.field,
		structure = name.split(`_`);

	let value;

	if (structure.length >= 1 && values[structure[0]]) {
		value = values[structure[0]];

		if (structure.length >= 2 && (value[structure[1]] || value[structure[1]] === ``)) {
			value = value[structure[1]];

			if (structure.length >= 3 && (value[structure[2]] || value[structure[2]] === ``)) {
				value = value[structure[2]];
			}
		}
	} 

	if(conditional.value?.toLowerCase().split(',').includes(value?.toLowerCase())) {
		return true
	}

	return false

}

export default formFields;
