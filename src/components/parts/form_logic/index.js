import React, { useState, useEffect } from 'react';
import { Formik, Form, useFormikContext } from 'formik';

import formFields from '../../../utils/formFields';

import Field from '../form_field';

const FormLogic = ({ form }) => {
	const [formValues, setFormValues] = useState(formFields(form.fields.content.fields)),
		[stepNumber, setStepNumber] = useState(0),
		[snapshot, setSnapshot] = useState(formFields(form.fields.content.fields)),
		handleChange = (e) => {
			const { name, value } = e.target;

			setFormValues({ ...formValues, [name]: value });
		},
		encode = (data) => Object.keys(data)
			.map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
			.join(`&`),
		onSubmit = (values) => {
			fetch(`${form.fields.content.success_page}/`, {
				method: `POST`,
				headers: { "Content-Type": `application/x-www-form-urlencoded` },
				body: encode({
					"form-name": `custom_${form.slug}`,
					...values
				})
			})
				.then(() => {
					console.log(`success, form has been submitted`);
					window.location.replace(`${form.fields.content.success_page}/`);
				})
				.catch((err) => {
					console.error(err);
				});
		},
		fieldData = form.fields.content.fields,
		steps = form.fields.content.multi_page ? fieldData : [fieldData],
		step = steps[stepNumber],
		totalSteps = steps.length,
		isLastStep = stepNumber === totalSteps - 1,
		next = (values) => {
			console.log({ formValues, values });
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
					&& !steps[nextStepNumber].conditional.value.split(`,`).includes(formValues[steps[nextStepNumber].conditional.field])
				) {
					nextStepNumber++;
				} else {
					nextStep = true;
					setSnapshot(formValues);
					setStepNumber(nextStepNumber);
				}
			}
		},
		previous = (values) => {
			console.log({ formValues, values });
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
					&& !steps[prevStepNumber].conditional.value.split(`,`).includes(formValues[steps[prevStepNumber].conditional.field])
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

	return (
		<Formik
			initialValues={snapshot}
			onSubmit={handleSubmit}
			handleChange={(e) => { handleChange(e); }}
			validateOnChange={false}
			validateOnBlur={false}
			enableReinitialize={true}
		>
			{(formik) => (
				<Form
					className="custom"
					name={`custom_${form.slug}`}
					method="POST"
					action={`${form.fields.content.success_page}/`}
					netlify
					netlify-honeypot="bot-field"
				>
					<input type="hidden" name="form-name" value={`custom_${form.slug}`} />
					<input type="hidden" name="bot-field" />
					{totalSteps > 1
						&& <div className="progress">
							<label
								htmlFor="form_progress"
							>
								Form Progress
							</label>
							<progress
								max="100"
								value={Math.round(((stepNumber + 1) / totalSteps) * 100)}
							>
								{`${Math.round(((stepNumber + 1) / totalSteps) * 100)}%`}
							</progress>
						</div>
					}
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
							onClick={() => previous(formik.values)}
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
