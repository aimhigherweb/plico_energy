import React from 'react';

import A from '../link';

import './style.scss';

const CTA = ({ cta_button }) => (
	<ul>
		{cta_button.map((cta) => (
			<li key={cta.cta_link}>
				<A
					className="btn cta"
					style={{
						"--cta_background": cta.cta_colour.colour,
						"--cta_text": cta.cta_colour.colour === `#18304c` ? `#ffffff` : `#18304c`
					}}
					url={cta.cta_link}
				>
					{cta.cta_text}
				</A>
			</li>
		))}
	</ul>
);

export default CTA;
