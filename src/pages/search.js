import React, { useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, PoweredBy } from 'react-instantsearch-dom';
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
		),
		params = {};

	let query = ``;

	if (typeof window !== `undefined`) {
		window.location.search.replace(/^\?/, ``).split(`&`).forEach((i) => {
			const values = i.split(`=`);

			params[values[0]] = values[1];
		});
	}

	if (params.q) {
		query = params.q;
	}

	const [search, setSearchState] = useState({ query }),

		onSearchStateChange = (updatedSearchState) => {
			setSearchState(updatedSearchState);

			if (typeof window !== `undefined`) {
				window.history.pushState({}, ``, `?q=${updatedSearchState.query}`);
			}
		};

	return (
		<Layout {...{ classes: `page search`, meta }}>
			<h1>Search</h1>
			<InstantSearch
				searchClient={searchClient}
				indexName="all"
				createURL={(searchState) => `?q=${searchState.query}`}
				searchState={search}
				onSearchStateChange={onSearchStateChange}
			>
				<SearchBox searchAsYouType={false} />
				<Results />
				<PoweredBy />
			</InstantSearch>
		</Layout>
	);
};

export default SearchPage;
