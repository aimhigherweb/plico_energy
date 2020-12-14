import React, { Fragment } from 'react';
import { Link } from 'gatsby';
import { Hits, connectStateResults } from 'react-instantsearch-dom';

import './style.scss';

const Results = connectStateResults(({ searchState }) => (
		searchState && searchState.query ? (
			<Fragment>
				<Hits className="search_results" hitComponent={PageResult} />
				<Link className="see-more" to={`/search?q=${searchState.query}`}>See more results</Link>
			</Fragment>
		) : null
	)),

	PageResult = ({ hit }) => {
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
