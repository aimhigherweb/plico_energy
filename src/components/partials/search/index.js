import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';

import Results from './results';

const Search = () => {
	const searchClient = algoliasearch(
		process.env.GATSBY_ALGOLIA_APP_ID,
		process.env.GATSBY_ALGOLIA_SEARCH_KEY
	);

	return (
		<div>
			<div>
				<InstantSearch searchClient={searchClient} indexName="pages">
					<SearchBox />
					<Results />
				</InstantSearch>
			</div>
		</div>
	);
};

export default Search;
