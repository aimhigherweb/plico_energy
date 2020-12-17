import React from 'react';

import Animated from '../animated_svg';

import Border from '../../../img/animations/blob_outline.svg';

import './style.scss';

const ImageBlob = ({ graphic }) => (
	<div className="image image_blob">
		<svg viewBox="0 0 732 629">
			<defs>
				<clipPath id="clip_image" clipPathUnits="objectBoundingBox">
					<path d="M0.073,0.742 C0.025,0.642,0,0.552,0.007,0.364 C0.012,0.222,0.057,0.161,0.12,0.082 C0.167,0.034,0.248,0,0.315,0.002 C0.422,0.01,0.44,0.024,0.495,0.047 C0.53,0.063,0.559,0.077,0.585,0.085 C0.68,0.116,0.733,0.117,0.799,0.135 C0.897,0.162,0.966,0.259,0.993,0.389 C1,0.484,1,0.668,0.9,0.819 C0.823,0.908,0.705,1,0.454,1 L0.45,1 C0.367,0.989,0.287,0.978,0.204,0.913 C0.171,0.887,0.112,0.825,0.073,0.742" />
				</clipPath>
			</defs>
			<image href={graphic.fluid.src} preserveAspectRatio="none" />
		</svg>
		<Animated className="border">
			<Border />
		</Animated>
	</div>
);

export default ImageBlob;
