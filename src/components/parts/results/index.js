import React, { Fragment } from 'react';
import { Link } from 'gatsby';
import { Hits, connectStateResults, connectHighlight } from 'react-instantsearch-dom';

import { stripMarkdown } from "../../../utils/markdown";

// import './style.scss';

const Results = connectStateResults(({ searchState }) => (
		searchState && searchState.query ? (
			<Hits className="search_results" hitComponent={PageResult} />
		) : null
	)),

	PageResult = ({ hit }) => {
		const sections = [`body.content`, `content`, `body.section.content`, `body.heading`, `body.sections.heading`, `body.sub_heading`];

		if ([`news`, `landing_page`, `pages`, `testimonials`, `faqs`].includes(hit.component)) {
			return (
				<li>

					<h2><Link to={hit.slug}>{hit.name}</Link></h2>

					{sections.map((s) => (
						<Snippet
							attribute={s}
							hit={hit}
						/>
					))}
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
				{parsedHit.map(
					(part, index) => (part.isHighlighted ? (
						<mark key={index}>{stripMarkdown(part.value)}</mark>
					) : (
						<span key={index}>{stripMarkdown(part.value)}</span>
					))
				)}
			</p>
		);
	},
	Snippet = connectHighlight(CustomSnippet);

export default Results;
