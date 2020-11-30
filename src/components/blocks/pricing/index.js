import React from 'react';

import Block from "../../parts/block";
import Plan from '../../parts/pricing_plan';

import './style.scss';

const PricingBlock = ({
	heading, content, plans, disclaimer
}) => (
	<Block
		className="pricing_block"
	>
		<h2>{heading}</h2>
		<p>Choose a plan to request a tailored quote for your property.</p>
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
