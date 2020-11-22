import React, { useEffect } from 'react';
import LazyLinePainter from 'lazy-line-painter';
import { Waypoint } from 'react-waypoint';
import uniqueId from '../../../utils/uniqueId';

import './style.scss';

const Animated = ({ children, className }) => {
	const id = `animated${uniqueId()}`,
		runAnimation = () => {
			if (typeof window !== `undefined`) {
				const el = document.querySelector(`#${id}`);

				if (!el.classList.contains(`visible`) && window.matchMedia(`(prefers-reduced-motion: no-preference)`).matches) {
					const myAnimation = new LazyLinePainter(
						el,
						{
							strokeOpacity: 1
						}
					);

					myAnimation.paint();
					el.classList.add(`visible`);
				}
			}
		};

	return (
		<div id={id} className={className}>
			{children}
			<Waypoint
				onEnter={runAnimation}
			/>
		</div>
	);
};

export default Animated;
