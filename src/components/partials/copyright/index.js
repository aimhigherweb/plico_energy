import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import A from '../components/link';

import Search from '../../img/search.svg';

const Menu = () => (
	<StaticQuery
		query={graphql`
			query {
				menu: storyblokEntry(full_slug: {eq: "menus/main"}) {
					fields {
						content {
							menu_items {
								label
								url
							}
						}
					}
				}
				cta: storyblokEntry(full_slug: {eq: "details"}) {
					fields {
						content {
							cta_buttons {
								label
								url
							}
						}
					}
				}
			}
		`}
		render={({ menu, cta }) => (
			<nav>
				<ul>
					{menu.fields.content.menu_items.map((link) => (
						<li>
							<A {...link} />
						</li>
					))}
					<li>
						<button>
							<Search />
							Search
						</button>
					</li>
					{cta.fields.content.cta_buttons.map((link) => (
						<li>
							<A className="cta" {...link} />
						</li>
					))}
				</ul>
			</nav>
		)}
	/>
);

export default Menu;
