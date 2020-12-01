import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';

import Block from "../../parts/block";
import Curve from '../../../img/blob_video.svg';
import ContentBlock from '../../parts/content_block';
import NumberedBlock from '../../parts/numbered_block';
import CollapsibleBlock from '../../parts/collapsible_block';

import './style.scss';

const FeaturedSections = ({ heading, content, sections }) => {
	const images = sections.some((sect) => (sect.image && sect.image.filename && sect.image.filename == ``)),
		blocks = sections.length;
	let Component = ContentBlock,
		classes = ``;

	if (sections[0].component == `numbered_content_block`) {
		Component = NumberedBlock;
	}

	if (sections[0].component == `collapsible_content_block`) {
		Component = CollapsibleBlock;
		classes = `${classes} collapsible_blocks`;
	}

	return (
		<Block className={`featured_sections ${(!images && blocks > 4) && `blocks`} ${(!images && blocks < 4) && `small`} ${classes}`}>
			<Curve className="curve" />
			<h2 dangerouslySetInnerHTML={{ __html: heading }} />
			<div dangerouslySetInnerHTML={{ __html: content }} />
			<div className="sects">
				{sections.map((sect, index) => (
					<Component
						key={sect._uid}
						{...{ ...sect, index } }
					/>
				))}
			</div>

		</Block>
	);
};

export default FeaturedSections;
