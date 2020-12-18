import React, { useState, useEffect, Fragment } from 'react';

import formFields, { checkConditions, fieldData } from '../../../utils/formFields';
import Progress from '../form_progress';

import Field from '../form_field';

const FormLogic = ({ form }) => {
	const formData = form.fields.content.multi_page ? form.fields.content.fields : [form.fields.content.fields],
		totalSteps = formData.length,
		existingData = typeof window !== `undefined` && window.localStorage.getItem(`formData_${form.slug}`) ? JSON.parse(window.localStorage.getItem(`formData_${form.slug}`)) : {},
		[step, setStep] = useState(0),
		[currentStepData, setCurrentStepData] = useState(formData[step]),
		[values, setValues] = useState(existingData),
		fieldChanged = (fieldId, value) => {
			const structure = fieldId.split(`_`);

			if (structure) {
				setValues((currentValues) => {
					if (structure.length === 1) {
						currentValues[structure[0]] = value;
					} else if (structure.length === 2) {
						currentValues[structure[0]][structure[1]] = value;
					} else if (structure.length === 3) {
						currentValues[structure[0]][structure[1]][structure[2]] = value;
					} else if (structure.length === 4) {
						currentValues[structure[0]][structure[1]][structure[2]][structure[3]] = value;
					}

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
			className="custom"
			id={`${form.slug}`}
			name={`custom_${form.slug}`}
			method="post"
			onSubmit={(e) => {
				if (step + 1 < totalSteps) {
					e.preventDefault();
					if (window.dataLayer) {
						dataLayer.push({ event: `form-nextstep`, 'form-step': step + 1, form: form.slug });
					}
					nextStep();
				} else {
					if (window.dataLayer) {
						dataLayer.push({ event: `form-submit`, form: form.slug });
					}
					fetch(`/`, {
						method: `POST`,
						headers: {
							'Content-Type': `application/x-www-form-urlencoded`
						},
						body: encode({
							'form-name': `custom_${form.slug}`,
							...values,
							...fieldData(values),
							values: JSON.stringify(values)
						})
					})
						.then(() => {
							console.log(`success`);
							// e.preventDefault();
							window.location.replace(`${form.fields.content.success_page}/`);
							// window.navigate(`${form.fields.content.success_page}/`);
						})
						.catch((error) => {
							console.error(error);
							Sentry.setContext(`formData`, { values: JSON.stringify(values) });
							Sentry.captureException(error);
						});

					e.preventDefault();

					// e.preventDefault();

					// e.preventDefault();
				}
			}}
		>
			{form.fields.content.multi_page && <Progress progress={(step + 1) / totalSteps * 100} />}
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
						className={totalSteps > 1 ? `multistep` : ``}
						type="submit"
					>
						{step + 1 < totalSteps ? `Save and Continue` : form.fields.content.submit}
					</button>
				)}
			</Fragment>
		</form>
	);
};

export default FormLogic;
