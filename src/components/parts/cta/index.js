import React from 'react';

import A from '../link';

import './style.scss';

const CTA = ({ cta_button }) => (
	<ul className="cta_buttons">
		{cta_button.map((cta) => {
			let styles = {};

			if (cta.cta_colour) {
				styles = {
					"--cta_background": cta.cta_colour.colour,
					"--cta_text": cta.cta_colour.colour === `#ffffff` ? `#18304c` : `#ffffff`
				};
			}

			return (
				<li key={cta.cta_link}>
					<A
						className="btn cta"
						style={styles}
						url={cta.cta_link}
					>
						{cta.cta_text}
					</A>
				</li>
			);
		})}
	</ul>
);

export default CTA;
