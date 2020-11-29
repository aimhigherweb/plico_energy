import React from 'react';

import Block from "../../parts/block";
import FeatureImage from '../../parts/feature_image';
import Section from '../../parts/content_section';
import Lightning from '../../../img/animations/lightning_hand_squiggle.svg';
import Globe from '../../../img/animations/planet_hand_squiggle.svg';
import Pig from '../../../img/animations/pig_squiggle.svg';
import Animated from '../../parts/animated_svg';

import './style.scss';

const ContentSections = ({
	heading, content, media, illustration_selection, background, sections
}) => {
	let classes = `content_sections sections_${sections.length}`,
		Illustration = null;

	if (media.length) {
		classes = `${classes} ${media[0].component}`;
	}

	if (background) {
		classes = `${classes} background`;
	}

	if (illustration_selection) {
		classes = `${classes} illustration_${illustration_selection}`;
	}

	if (illustration_selection === `lightning`) {
		Illustration = Lightning;
	}

	if (illustration_selection === `globe`) {
		Illustration = Globe;
	}

	if (illustration_selection === `pig`) {
		Illustration = Pig;
	}

	return (
		<Block
			className={classes}
		>

			<div className="main">
				<h2>{heading}</h2>
				<div dangerouslySetInnerHTML={{ __html: content }} />
				{(illustration_selection && illustration_selection !== `none`)
					&& <Animated className="illustration">
						<Illustration />
					</Animated>
				}
			</div>
			{media && <FeatureImage {...media[0]} />}
			{sections.map((sect, index) => <Section {...{ ...sect, index }} />)}

		</Block>
	);
};

export default ContentSections;
