import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

const Address = () => (
	<StaticQuery
		query={graphql`
			{
				site: storyblokEntry(full_slug: {eq: "details"}) {
					fields {
						content {
							address_line_1
							address_line_2
							address_post_code
							address_state
							address_suburb
						}
					}
				}
			}

		`}
		render={({ site }) => {
			const {
				address_line_1,
				address_line_2,
				address_post_code,
				address_state,
				address_suburb
			} = site.fields.content;

			return (
				<address>
					<p>{address_line_1}</p>
					<p>{(address_line_2 && address_line_2 !== ``) && `${address_line_2},`} <span>{address_suburb} {address_state}</span> {address_post_code}</p>
				</address>
			);
		}}
	/>
);

export default Address;
