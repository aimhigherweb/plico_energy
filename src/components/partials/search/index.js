import React, { useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Configure } from 'react-instantsearch-dom';

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
				<InstantSearch searchClient={searchClient} indexName="all">
					<Configure hitsPerPage={5} />
					<SearchBox />
					<Results />
				</InstantSearch>
			</div>
		</div>
	);
};

export default Search;
