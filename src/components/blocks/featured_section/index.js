import React from 'react';
import Img from 'gatsby-image';

import Block from "../../parts/block";
import Curve from '../../../img/blob_video.svg';
import ContentBlock from '../../parts/content_block';
import NumberedBlock from '../../parts/numbered_block';
import CollapsibleBlock from '../../parts/collapsible_block';

import './style.scss';

const FeaturedSections = ({
	heading, content, sections, image
}) => {
	const images = sections.some((sect) => (sect.featureImage)),
		blocks = sections.length;
	let Component = ContentBlock,
		classes = ``,
		styles = {};

	if (sections[0].component == `numbered_content_block`) {
		Component = NumberedBlock;
		classes = `${classes} numbered_blocks`;
	}

	if (sections[0].component == `collapsible_content_block`) {
		Component = CollapsibleBlock;
		classes = `${classes} collapsible_blocks`;
	}

	if (image && image.filename) {
		styles[`--background_graphic`] = `url(${image.filename})`;
		classes = `${classes} background_graphic`;
	}

	return (
		<Block
			className={`featured_sections ${(!images && blocks > 4) && `blocks`} ${(!images && blocks < 6) && `small`} ${classes}`}
			styles={styles}
		>
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
