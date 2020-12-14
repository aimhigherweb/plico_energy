import React, { Fragment } from 'react';
import { Link } from 'gatsby';
import { Hits, connectStateResults, connectHighlight } from 'react-instantsearch-dom';

import resultsSnippet from '../../../utils/resultsSnippets';

// import './style.scss';

const Results = connectStateResults(({ searchState }) => (
		searchState && searchState.query ? (
			<Hits className="search_results" hitComponent={PageResult} />
		) : null
	)),

	PageResult = ({ hit }) => {
		const sections = [
			`name`,
			`id`,
			`slug`,
			`field_component`,
			{
				fields: {
					content: [`content`,
						`quote`,
						`name`,
						`location`,
						{
							banner: [`main_quote`,
								`sub_quote`,
								`additional_quote`,
								{
									cta_button: [`cta_text`]
								}
							]
						},
						{
							body: [`heading`,
								`sub_heading`,
								`content`,
								{
									cta_button: [`cta_text`]
								},
								`cta_text`,
								{
									media: [`content`]
								},
								{
									sections: [`heading`,
										`content`,
										`collapsed_heading`,
										`collapsed_content`,
										{
											cta: [`cta_text`]
										}
									]
								},
								{
									plans: [{
										cta: [`cta_text`]
									},
									`description`,
									`features`,
									`callout`,
									`name`,
									`price`
									]
								},
								{
									table: {
										thead: [`value`],
										tbody: {
											body: [`value`]
										}
									}
								},
								{
									profiles: [`role`,
										`name`,
										`bio`,
										`linkedin`,
									]
								}
							]
						}
					]
				}
			}
		];

		if ([`news`, `landing_page`, `pages`, `testimonials`, `faqs`].includes(hit.component)) {
			return (
				<li>

					<h2><Link to={hit.slug}>{hit.name}</Link></h2>

					<Snippet
						attribute={`content.content`}
						hit={hit}
						tagName="mark"
						nonHighlightedTagName="span"
						className="snippet"
					/>
				</li>
			);
		}
		return null;
	},
	CustomSnippet = ({ highlight, attribute, hit }) => {
		const parsedHit = highlight({
			highlightProperty: `_snippetResult`,
			attribute,
			hit,
		});

		return (
			<p className="snippet">
				{resultsSnippet(hit).map((snippet) => (
					<Fragment>
						<span dangerouslySetInnerHTML={{ __html: snippet }} />
						...
					</Fragment>
				))}
			</p>

		);
	},
	Snippet = connectHighlight(CustomSnippet);

export default Results;
