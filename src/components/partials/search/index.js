import React, { useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox } from 'react-instantsearch-dom';

import Results from './results';
import Icon from '../../../img/search.svg';

import './style.scss';

const Search = () => {
	const [open, setOpen] = useState(false),
		toggleSearch = () => {
			setOpen(!open);
		},
		searchClient = algoliasearch(
			process.env.GATSBY_ALGOLIA_APP_ID,
			process.env.GATSBY_ALGOLIA_SEARCH_KEY
		);

	return (
		<div className="search" open={open}>
			<button onClick={toggleSearch}>
				<Icon />
				<span>Toggle Search Form</span>
			</button>
			<div className="search-modal">
				<InstantSearch searchClient={searchClient} indexName="pages">
					<SearchBox />
					<Results />
				</InstantSearch>
			</div>
		</div>
	);
};

export default Search;
