import React, { useState, useEffect } from 'react';
import { Formik, Form, useFormikContext } from 'formik';

import Field from '../form_field';

const FormLogic = ({ form }) => {
	const initialValues = {
			name: ``,
			email: ``,
			message: ``,
			'do-you-have-existing-solar': ``,
			'electricity-bill_average-bill-cost': ``,
			'property-details_property-ownership': ``
		},
		[formValues, setFormValues] = useState(initialValues),
		[stepNumber, setStepNumber] = useState(0),
		[snapshot, setSnapshot] = useState(initialValues),
		handleChange = (e) => {
			const { name, value } = e.target;

			setFormValues({ ...formValues, [name]: value });

			console.log({ formValues, value: formValues[`property-details_property-ownership`] });
		},
		onSubmit = async (values) => {
			sleep(300).then(() => console.log(`Wizard submit`, values));
		},
		fieldData = form.fields.content.fields,
		steps = form.fields.content.multi_page ? fieldData : [fieldData],
		step = steps[stepNumber],
		totalSteps = steps.length,
		isLastStep = stepNumber === totalSteps - 1,
		next = () => {
			let nextStep = false,
				nextStepNumber = stepNumber + 1;

			while (!nextStep) {
				if (nextStepNumber === totalSteps - 1) {
					nextStep = true;
					setSnapshot(formValues);
					setStepNumber(nextStepNumber);
				}

				if (
					steps[nextStepNumber].conditional
					&& steps[nextStepNumber].conditional.field !== ``
					&& formValues[steps[nextStepNumber].conditional.field] !== steps[nextStepNumber].conditional.value
				) {
					nextStepNumber++;
				} else {
					nextStep = true;
					setSnapshot(formValues);
					setStepNumber(nextStepNumber);
				}
			}
		},
		previous = () => {
			let prevStep = false,
				prevStepNumber = stepNumber - 1;

			while (!prevStep) {
				if (prevStepNumber === 0) {
					prevStep = true;
					setSnapshot(formValues);
					setStepNumber(prevStepNumber);
				}

				if (
					steps[prevStepNumber].conditional
					&& steps[prevStepNumber].conditional.field !== ``
					&& formValues[steps[prevStepNumber].conditional.field] !== steps[prevStepNumber].conditional.value
				) {
					prevStepNumber--;
				} else {
					prevStep = true;
					setSnapshot(formValues);
					setStepNumber(prevStepNumber);
				}
			}
		},
		handleSubmit = async (values, bag) => {
			if (isLastStep) {
				return onSubmit(values, bag);
			}
			bag.setTouched({});
			next(values);
		};

	console.log(steps);

	return (
		<Formik
			initialValues={snapshot}
			onSubmit={handleSubmit}
			validateOnChange={false}
			validateOnBlur={false}
			enableReinitialize={true}
		>
			{(formik) => (
				<Form
					className="custom"
					name={form.slug}
					method="POST"
					action="/thanks/"
					data-netlify="true"
					data-netlify-honeypot="bot-field"
				>
					{totalSteps > 1
						&& <p>Form progress {Math.round(((stepNumber + 1) / totalSteps) * 100)}%</p>
					}
					<input type="hidden" name="bot-field" />
					<input type="hidden" name="form-name" value={form.slug} />
					{totalSteps > 1
						&& <Field
							key={step._uid}
							{...{
								component: step.component,
								data: {
									...step,
									onChange: handleChange,

								},
								values: formValues,
								conditional: step.conditional
							}}
						/>}

					{totalSteps <= 1 && step.map((field) => (
						<Field
							key={field._uid}
							{...{
								component: field.component,
								data: {
									...field,
									onChange: handleChange,

								},
								values: formValues,
								conditional: field.conditional
							}}
						/>
					))}
					{(stepNumber > 0)
						&& <button
							type="button"
							onClick={() => previous(formValues)}
						>
							Back
						</button>}
					<button type="submit">
						{isLastStep ? form.fields.content.submit : `Save and Continue`}
					</button>
				</Form>
			)}
		</Formik>
	);
};

export default FormLogic;
