import React from 'react';
import { Link } from 'gatsby';
import { connectHits } from 'react-instantsearch-dom';

import './style.scss';

const Results = connectHits(({ hits }) => (
		<ul className="results">
			{hits.map((hit) => (
				<Hit ley={hit.objectID} {...hit} />
			))}
		</ul>
	)),

	Hit = ({
		name, slug, component
	}) => {
		if ([`news`, `landing_page`, `pages`, `testimonials`, `faqs`].includes(component)) {
			return (
				<li>
					<Link to={slug}>
						{name}
					</Link>
				</li>
			);
		}
		return null;
	};

export default Results;
