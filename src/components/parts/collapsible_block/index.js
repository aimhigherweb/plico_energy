import React, { useState } from 'react';

import './style.scss';

const CollapsibleBlock = ({
	heading, content, collapsed_heading, collapsed_content
}) => {
	const [open, setOpen] = useState(false),
		toggleContent = () => {
			setOpen(!open);
		};

	return (
		<article className="repeatable_content collapsible" open={open}>
			<button onClick={toggleContent}><span>Toggle Content</span></button>
			<div className="front">
				<h3 dangerouslySetInnerHTML={{ __html: heading }} />
				<div dangerouslySetInnerHTML={{ __html: content }} />
			</div>
			<div className="back">
				<h3 dangerouslySetInnerHTML={{ __html: collapsed_heading }} />
				<div dangerouslySetInnerHTML={{ __html: collapsed_content }} />
			</div>

		</article>
	);
};

export default CollapsibleBlock;
