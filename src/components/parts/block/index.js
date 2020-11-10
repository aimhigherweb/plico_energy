import React from 'react';

import './style.scss';

const Block = ({ children, className }) => (
	<section className={`${className} block`}>
		{children}
	</section>
);

export default Block;
