import React, { useState, useEffect, Fragment } from 'react';

import formFields, { checkConditions } from '../../../utils/formFields';
import generateSlug from '../../../utils/generateSlug';

import Field from '../form_field';

const FormLogic = ({ form }) => {
	const formData = form.fields.content.multi_page ? form.fields.content.fields : [form.fields.content.fields],
		totalSteps = formData.length,
		existingData = typeof window !== `undefined` && window.localStorage.getItem(`formData_${form.slug}`) ? JSON.parse(window.localStorage.getItem(`formData_${form.slug}`)) : {},
		[step, setStep] = useState(0),
		[currentStepData, setCurrentStepData] = useState(formData[step]),
		[values, setValues] = useState(existingData),
		fieldChanged = (fieldId, value) => {
			setValues((currentValues) => {
				currentValues[fieldId] = value;

				return currentValues;
			});

			if (typeof window !== `undefined`) {
				window.localStorage.setItem(`formData_${form.slug}`, JSON.stringify(values));
			}

			if (currentStepData.fields) {
				setCurrentStepData((currentStepData) => ({ ...currentStepData }));
			} else {
				setCurrentStepData((currentStepData) => ([...currentStepData]));
			}
		},
		checkStep = (direction) => {
			const findNextStep = (step) => {
				const data = formData[step];

				if (!checkConditions(values, data.conditional)) {
					return findNextStep(step + direction);
				}

				return step;
			};

			setStep(findNextStep(step + direction));
		},
		nextStep = () => {
			checkStep(1);
		},
		prevStep = () => {
			checkStep(-1);
		},
		encode = (data) => Object.keys(data)
			.map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
			.join(`&`);

	useEffect(() => {
		const upcomingStepData = formData[step];

		setCurrentStepData(upcomingStepData);

		setValues((currentValues) => {
			const newValues = formFields(formData);

			return { ...newValues, ...currentValues };
		});
	}, [step]);

	return (
		<form
			// onSubmit={(e) => e.preventDefault()}
			className="custom"
			name={`custom_${form.slug}`}
			method="post"
			// action={`${form.fields.content.success_page}/`}
			// netlify
			// netlify-honeypot="bot-field"
			onSubmit={(e) => {
				fetch(`/`, {
					method: `POST`,
					headers: {
						'Content-Type': `application/x-www-form-urlencoded`
					},
					body: encode({
						'form-name': `custom_${form.slug}`,
						...values
					})
				})
					.then(() => console.log(`success`))
					.catch((error) => console.log(error));

				e.preventDefault();

				window.location.replace(`${form.fields.content.success_page}/`);
			}}
		>
			<input type="hidden" name="form-name" value={`custom_${form.slug}`} />
			{/* <input type="hidden" name="bot-field" /> */}
			<Fragment>
				{totalSteps > 1
					&& <Field
						{...{
							component: currentStepData.component,
							data: {
								...currentStepData,
								fieldChanged,
								values
							},
							values,
						}}
					/>
				}
				{totalSteps <= 1
					&& currentStepData.length
						&& <Fragment>
							{currentStepData.map((field) => (
								<Field
									key={field._uid}
									{...{
										component: field.component,
										data: {
											...field,
											fieldChanged,
											values
										},
										values,
									}}
								/>
							))}
						</Fragment>

				}

				{step > 0 && (
					<button
						type="button"
						onClick={() => prevStep()}
					>
								Back
					</button>
				)}
				{step < totalSteps && (
					<button
						type={step + 1 < totalSteps ? `button` : `submit`}
						onClick={() => nextStep()}
					>
						{step + 1 < totalSteps ? `Save and Continue` : form.fields.content.submit}
					</button>
				)}
			</Fragment>
		</form>
	);
};

export default FormLogic;
