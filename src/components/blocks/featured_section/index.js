import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';

import Block from "../../parts/block";
import Curve from '../../../img/blob_video.svg';
import ContentBlock from '../../parts/content_block';

import './style.scss';

const FeaturedSections = ({ heading, content, sections }) => (
	<Block className="featured_sections">
		<Curve className="curve" />
		<h2>{heading}</h2>
		<div dangerouslySetInnerHTML={{ __html: content }} />
		{sections.map((sect) => (
			<ContentBlock
				key={sections._uid}
				{...sect }
			/>
		))}
	</Block>
);

export default FeaturedSections;
