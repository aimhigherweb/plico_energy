import React from 'react';

import './style.scss';

const Block = ({ children, className, styles }) => (
	<section className={`${className} block`} style={styles}>
		{children}
	</section>
);

export default Block;
