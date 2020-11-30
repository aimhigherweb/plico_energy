import React from 'react';
import { getFluidGatsbyImage } from 'gatsby-storyblok-image';

import Animated from '../animated_svg';
import BannerSquiggle from '../../../img/animations/banner_squiggle.svg';

import './style.scss';

const BannerBlob = ({ filename, width }) => (
	<div className="image_blob_banner">
		<svg viewBox="0 0 732 629">
			<defs>
				<clipPath id="clip_image_banner" clipPathUnits="objectBoundingBox">
					<path d="M0.059,0.322 C0.019,0.424,0,0.515,0.021,0.698 C0.036,0.837,0.086,0.893,0.155,0.963 C0.205,1,0.289,1,0.356,1 C0.462,1,0.48,0.989,0.533,0.96 C0.567,0.942,0.595,0.925,0.621,0.915 C0.713,0.875,0.766,0.869,0.831,0.845 C0.927,0.809,0.99,0.707,1,0.577 C1,0.482,1,0.301,0.882,0.165 C0.799,0.086,0.673,0,0.422,0.031 L0.418,0.031 C0.336,0.051,0.256,0.07,0.178,0.141 C0.147,0.17,0.092,0.237,0.059,0.322" />
				</clipPath>
			</defs>
			<image xlinkHref={getFluidGatsbyImage(filename, { maxWidth: width, maxHeight: width * 0.84 }).src} preserveAspectRatio="none" />
		</svg>
		<Animated className="squiggle">
			<BannerSquiggle />
		</Animated>
	</div>
);

export default BannerBlob;
