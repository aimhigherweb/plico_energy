import React, { Fragment } from 'react';
import { Link } from 'gatsby';
import {
	Hits, connectStateResults, connectHighlight, Snippet as BoxSnippet
} from 'react-instantsearch-dom';

import resultsSnippet from '../../../utils/resultsSnippets';

// import './style.scss';

const Results = connectStateResults(({ searchState }) => (
		searchState && searchState.query ? (
			<Hits className="search_results" hitComponent={PageResult} />
		) : null
	)),

	PageResult = ({ hit }) => {
		if ([`news`, `landing_page`, `pages`, `testimonials`, `faqs`].includes(hit.component)) {
			return (
				<li>

					<h2><Link to={hit.slug}>{hit.name}</Link></h2>

					<BoxSnippet hit={hit} attribute="content.content" />

					{/* <Snippet hit={hit} /> */}
				</li>
			);
		}
		return null;
	},
	CustomSnippet = ({ highlight, attribute = `content.content`, hit }) => {
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
