import React from 'react';
import { Link } from 'gatsby';
import { Hits, connectStateResults } from 'react-instantsearch-dom';

import './style.scss';

const Results = connectStateResults(({ searchState }) => (
		searchState && searchState.query ? (
			<Hits className="search_results" hitComponent={PageResult} />
		) : null
	)),

	PageResult = ({ hit }) => {
		console.log(hit);
		if ([`news`, `landing_page`, `pages`, `testimonials`, `faqs`].includes(hit.component)) {
			return (
				<li>
					<Link to={hit.slug}>
						{hit.name}
					</Link>
				</li>
			);
		}
		return null;
	};

export default Results;
