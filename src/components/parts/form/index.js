import React, { useState, useEffect } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { Formik, Form as FormikForm } from 'formik';

import Field from '../form_field';

import './style.scss';

const Form = ({ form }) => (
	<StaticQuery
		query={graphql`
			fragment formFields on StoryblokEntryFieldsContentFields {
				component
				label
				type
				_uid
				options {
					component
					label
				}
				conditional {
					value
					field
				}
			}
			fragment formSubFields on StoryblokEntryFieldsContentFieldsFields {
				component
				label
				type
				_uid
				options {
					component
					label
				}
				conditional {
					value
					field
				}
			}
			fragment formSubSubFields on StoryblokEntryFieldsContentFieldsFieldsFields {
				component
				label
				type
				_uid
				conditional {
					value
					field
				}
			}
			{
				forms: allStoryblokEntry(
					filter: {
						field_component: {eq: "form"}
					}
				) {
					edges {
						node {
							name
							slug
							uuid
							fields {
								content {
									submit
									fields {
										...formFields
										fields {
											...formSubFields
											fields {
												...formSubSubFields
											}
										}
									}
								}
							}
						}
					}
				}
			}

		`}
		render={({ forms }) => {
			const selectedForm = forms.edges.find(({ node }) => node.uuid === form),
				formData = selectedForm.node,
				initialValues = {
					name: ``,
					email: ``,
					message: ``,
					'do-you-have-existing-solar': ``,
					'electricity-bill_average-bill-cost': ``
				},
				[formValues, setFormValues] = useState(initialValues),
				handleChange = (e) => {
					const { name, value } = e.target;
					setFormValues({ ...formValues, [name]: value });
				};

			return (
				<Formik
					initialValues={initialValues}
					onSubmit={(values, actions) => {
						alert(JSON.stringify(values, null, 2));
						actions.setSubmitting(false);
					}}
					validateOnChange={false}
					validateOnBlur={false}
					enableReinitialize={true}
				>
					<FormikForm
						className="custom"
						name={formData.slug}
						method="POST"
						action="/thanks/"
						data-netlify="true"
						data-netlify-honeypot="bot-field"
					>
						<input type="hidden" name="bot-field" />
						<input type="hidden" name="form-name" value={formData.slug} />
						{formData.fields.content.fields.map((field) => (
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
						<button type="submit">{formData.fields.content.submit}</button>
					</FormikForm>
				</Formik>
			);
		}}
	/>
);

export default Form;
