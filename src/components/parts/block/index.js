import React from 'react';

import './style.scss';

const Block = ({
	children, className, styles, order
}) => (
	<section className={`${className} block ${order && `next_${order.nextBlock} prev_${order.previousBlock}`}`} style={styles}>
		{children}
	</section>
);

export default Block;
