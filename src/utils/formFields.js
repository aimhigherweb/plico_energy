/* eslint-disable one-var */
import React, {Fragment} from 'react';

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

export const staticFields = (form_fields) => {
	const fields = [],
	fieldsObject = formFields(form_fields)

	Object.keys(fieldsObject).forEach((sf1) => {
		const f1 = fieldsObject[sf1];
		if (typeof f1 !== `object`) {
			fields.push(sf1)
		}
		else {
			Object.keys(f1).forEach((sf2) => {
				const f2 = f1[sf2];
	
				if (typeof f2 !== `object`) {
					fields.push(`${sf1}_${sf2}`)
				}
				else {
					Object.keys(f2).forEach((sf3) => {
						const f3 = f2[sf3];
						if (typeof f3 !== `object`) {
							fields.push(`${sf1}_${sf2}_${sf3}`)
						}
						else {
							Object.keys(f3).forEach((sf4) => {
								const f4 = f3[sf4];
								if (typeof f4 !== `object`) {
									fields.push(`${sf1}_${sf2}_${sf3}_${sf4}`)
								}
							});
						}
					});
				}	
				
			});
		}
	})

	return fields
}

export const fieldData = (data) => {
	let fields = {}

	Object.keys(data).forEach((sf1) => {
		const f1 = data[sf1];
		if (typeof f1 !== `object`) {
			fields = {
				...fields,
				[sf1]: f1
			}
		}
		else {
			Object.keys(f1).forEach((sf2) => {
				const f2 = f1[sf2];
	
				if (typeof f2 !== `object`) {
					fields = {
						...fields,
						[`${sf1}_${sf2}`]: f2
					}
				}
				else {
					Object.keys(f2).forEach((sf3) => {
						const f3 = f2[sf3];
						if (typeof f3 !== `object`) {
							fields = {
								...fields,
								[`${sf1}_${sf2}_${sf3}`]: f3
							}
						}
						else {
							Object.keys(f3).forEach((sf4) => {
								const f4 = f3[sf4];
								if (typeof f4 !== `object`) {
									fields = {
										...fields,
										[`${sf1}_${sf2}_${sf3}_${sf4}`]: f4
									}
								}
							});
						}
					});
				}	
				
			});
		}
	})

	console.log(fields)

	return fields
}

export default formFields;
