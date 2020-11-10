import React from 'react';

import A from '../link';

const CTA = ({ cta_button }) => (
	<ul>
		{cta_button.map((cta) => (
			<li key={cta.cta_link}><A className="cta" url={cta.cta_link}>{cta.cta_text}</A></li>
		))}
	</ul>
);

export default CTA;
