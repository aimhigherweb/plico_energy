import React from 'react';
import { getFluidGatsbyImage } from 'gatsby-storyblok-image';

import Animated from '../animated_svg';

import Border from '../../../img/animations/blob_outline.svg';

import './style.scss';

const ImageBlob = ({ filename, width, flipped = false }) => (
	<div className="image">
		<svg viewBox="0 0 732 629">
			<defs>
				<clipPath id="clip_image_flipped" clipPathUnits="objectBoundingBox">
					<path d="M0.734,0.041 C0.816,0.098,0.875,0.159,0.948,0.32 C1,0.443,0.991,0.519,0.97,0.621 C0.951,0.687,0.896,0.761,0.839,0.798 C0.745,0.852,0.724,0.85,0.667,0.861 C0.631,0.868,0.6,0.873,0.575,0.88 C0.482,0.908,0.436,0.937,0.372,0.96 C0.278,0.993,0.178,0.95,0.102,0.856 C0.045,0.788,-0.045,0.642,0,0.444 C0.028,0.326,0.087,0.176,0.302,0.039 L0.305,0.037 C0.381,0,0.454,-0.036,0.551,-0.028 C0.59,-0.025,0.666,-0.006,0.734,0.041" />
				</clipPath>
				<clipPath id="clip_image" clipPathUnits="objectBoundingBox">
					<path d="M0.074,0.745 C0.025,0.645,0,0.554,0.007,0.365 C0.012,0.223,0.058,0.162,0.121,0.082 C0.169,0.034,0.251,0,0.319,0.002 C0.427,0.01,0.445,0.024,0.501,0.047 C0.536,0.063,0.566,0.077,0.592,0.085 C0.688,0.116,0.742,0.117,0.808,0.136 C0.908,0.163,0.977,0.26,1,0.391 C1,0.486,1,0.671,0.911,0.822 C0.833,0.912,0.713,1,0.459,1 L0.455,1 C0.371,0.993,0.29,0.982,0.206,0.917 C0.173,0.89,0.113,0.828,0.074,0.745" />
				</clipPath>
			</defs>
			<image xlinkHref={getFluidGatsbyImage(filename, { maxWidth: width }).src} preserveAspectRatio="none" />
		</svg>
		<Animated className="border">
			<Border />
		</Animated>
	</div>
);

export default ImageBlob;
