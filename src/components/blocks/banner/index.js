import React from 'react';

import Block from "../../parts/block";
import CTA from '../../parts/cta';
import FeatureImage from '../../parts/feature_image';

import './style.scss';

const Banner = ({
	main_quote, sub_quote, cta_button, media
}) => (
	<Block className="banner">
		<blockquote>
			<p className="main">{main_quote}</p>
			<p className="sub">{sub_quote}</p>
			<CTA {...{ cta_button }} />
		</blockquote>
		<div className="feature">
			{media && <FeatureImage {...media[0]} />}
		</div>
	</Block>
);

export default Banner;
