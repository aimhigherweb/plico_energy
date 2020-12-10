/* eslint-disable one-var */
import React, {Fragment} from 'react';

import generateSlug from './generateSlug';

const formFields = (formData) => {
	let fieldsObject = {};

	const checkSubFields = (field, values) => {
		let fields = values
		
		if (field.fields) {
			field.fields.forEach(subField => {
				fields = {
					...fields,
					...checkSubFields(subField, fields)
				};
			});
		}
		else if (field.field_id) {
			const structure = field.field_id.split(`_`)

			let value = ''

			if (field.component == `custom`) {
				value = {
					...value,
					...customFields(field.type, structure[structure.length - 1])
				};
			}

			if(structure.length === 1) {
				fields = {
					...fieldsObject,
					[structure[0]]: value
				}
			}
			else if(structure.length === 2) {
				if(!fields[structure[0]]) {
					fields = {
						...fields,
						[structure[0]]: {
							[structure[1]]: value
						}
					}
				}
				else {
					fields = {
						...fields,
						[structure[0]]: {
							...fields[structure[0]],
							[structure[1]]: value
						}
					}
				}
			}
			else if(structure.length === 3) {
				if(!fields[structure[0]]) {
					fields = {
						...fields,
						[structure[0]]: {
							[structure[1]]: {
								[structure[2]]: value
							}
						}
					}
				}
				else if(!fields[structure[0]][structure[1]]) {
					fields = {
						...fields,
						[structure[0]]: {
							...fields[structure[0]],
							[structure[1]]: {
								[structure[2]]: value
							}
						}
					}
				}
				else {
					fields = {
						...fields,
						[structure[0]]: {
							...fields[structure[0]],
							[structure[1]]: {
								...fields[structure[0]][structure[1]],
								[structure[2]]: value
							}
						}
					}
				}
			}
		}

		return fields;
	};

	formData.forEach((f1) => {

		if (f1.component) {
			fieldsObject = {
				...fieldsObject,
				...checkSubFields(f1, fieldsObject)
			};
		}
		else {			
			f1.forEach(page => {
				fieldsObject = {
					...fieldsObject,
					...checkSubFields(page, fieldsObject)
				};
			});
		}
	});

	return fieldsObject;
};

const customFields = (type, slug) => {
	let fields = {};
	if (type === `call_between_time`) {
		fields = {
				startTime: ``,
				endTime: ``
		};
	}
	else if (type === `address`) {
		fields = {
				'streetAddress1': ``,
				'streetAddress2': ``,
				suburb: ``,
				state: `wa`,
				postcode: ``,
				country: `Australia`,
		};
	}
	else if (type === `system_configuration`) {
		fields = {
				inverterId: ``,
				productId: ``,
				'numberOfSystems': ``,
				'weeklyCost': ``,
				agreement: ``,
		};
	}

	return fields;
};


export const checkConditions = (values, conditional) => {
	if (!conditional || conditional.field == ``) {
		return true;
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

	if (conditional.value?.toLowerCase().split(`,`).includes(value?.toLowerCase())) {
		return true;
	}

	return false;

};

export default formFields;
