import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import Field from '../form_field';

import './style.scss';

const Form = ({ form }) => (
	<StaticQuery
		query={graphql`
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
										component
										fields {
											component
											label
											type
											_uid
										}
										label
										type
										_uid
										options {
											component
											label
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
				<form
					className="custom"
					name={formData.slug}
					method="POST"
					action="/thanks/"
					data-netlify="true"
					data-netlify-honeypot="bot-field"
				>
					{formData.fields.content.fields.map((field) => (
						<Field
							key={field._uid}
							{...{ component: field.component, data: field }}
						/>
					))}
					<button type="submit">{formData.fields.content.submit}</button>
				</form>
			);
		}}
	/>
);

export default Form;
