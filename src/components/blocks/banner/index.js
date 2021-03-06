import React from 'react';

import Block from "../../parts/block";
import CTA from '../../parts/cta';
import FeatureImage from '../../parts/feature_image';
import Plug from '../../../img/animations/plug.svg';
import BannerSquiggle from '../../../img/animations/banner_squiggle.svg';
import Animated from '../../parts/animated_svg';

import './style.scss';

const Banner = ({
		main_quote, sub_quote, cta_button, media, additional_quote
	}) => (
		<Block className={`banner ${media[0].component}`}>
			<blockquote>
				<p className="main">{main_quote}</p>
				{additional_quote && <p className="additional">{additional_quote}</p>}
				<div className="sub" dangerouslySetInnerHTML={{ __html: sub_quote }} />
				{cta_button && <CTA {...{ cta_button }} />}
			</blockquote>
			<div className="feature">
				{media && <FeatureImage {...{ ...media[0], width: 3000, banner: true }} />}
			</div>
			<Illustration component={media[0].component} />
		</Block>
	),

	Illustration = ({ component }) => {
		if (component === `image`) {
			return (
				<Animated className="plug">
					<Plug />
				</Animated>
			);
		}

		return null;
	};

export default Banner;
