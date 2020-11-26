import React, { useState, useEffect } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { Formik, Form as FormikForm } from 'formik';

import FormLogic from '../form_logic';

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
					value
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
					value
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
				options {
					component
					label
					value
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
									multi_page
									submit
									success_page
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
				formData = selectedForm.node;

			return (
				<FormLogic form={formData} />
			);
		}}
	/>
);

export default Form;
