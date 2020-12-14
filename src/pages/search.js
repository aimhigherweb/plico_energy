import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Configure } from 'react-instantsearch-dom';
import Results from '../components/parts/results';

import '../styles/custom/search.scss';

import Layout from '../components/partials/layout';

const SearchPage = () => {
	const meta = {
			name: `Search`,
			description: `Search for things on Plico`
		},
		searchClient = algoliasearch(
			process.env.GATSBY_ALGOLIA_APP_ID,
			process.env.GATSBY_ALGOLIA_SEARCH_KEY
		);

	return (
		<Layout {...{ classes: `page search`, meta }}>
			<h1>Search</h1>
			<InstantSearch searchClient={searchClient} indexName="all">
				<SearchBox />
				<Results />
			</InstantSearch>
		</Layout>
	);
};

export default SearchPage;
