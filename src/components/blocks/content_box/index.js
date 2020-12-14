import React from 'react';

import Block from "../../parts/block";
import ContentBlock from '../../parts/content_block';

import './style.scss';

const ContentBox = ({
	heading, content, cta_button, featureImage, image
}) => {
	const classes = `content_box_block`;

	return (
		<Block
			className={classes}
		>
			<ContentBlock
				{...{
					heading,
					content,
					cta: cta_button,
					featureImage,
					image
				}}
			/>

		</Block>
	);
};

export default ContentBox;
