import React from 'react';
import { getFluidGatsbyImage } from 'gatsby-storyblok-image';
import Img from 'gatsby-image';

import Block from "../../parts/block";
import CTA from '../../parts/cta';
import ImageBlob from '../../parts/image_blob';
import FeatureImage from '../../parts/feature_image';
import Background from '../../../img/blob_video.svg';
import Illustration from '../../parts/illustration';
import Plan from '../../parts/pricing_plan';

import './style.scss';

const PricingBlock = ({
	heading, content, plans, disclaimer
}) => (
	<Block
		className="pricing_block"
	>
		<h2>{heading}</h2>
		<ul className="plans">
			{plans.map((plan) => (
				<Plan {...plan} />
			))}
		</ul>
		<p className="disclaimer">{disclaimer}</p>
		<div dangerouslySetInnerHTML={{ __html: content }} />
	</Block>
);

export default PricingBlock;
