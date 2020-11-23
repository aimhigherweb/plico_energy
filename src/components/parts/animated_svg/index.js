import React, { useEffect } from 'react';
import { Waypoint } from 'react-waypoint';
import uniqueId from '../../../utils/uniqueId';

import './style.scss';

const Animated = ({ children, className }) => {
	const id = `animated${uniqueId()}`,
		runAnimation = () => {
			console.log(`running animation`);
			if (typeof window !== `undefined`) {
				console.log(`window defined and running`);
				const LazyLinePainter = require(`lazy-line-painter`);
				console.log(`import package`);
				const el = document.querySelector(`#${id}`);
				console.log(`found element`);
				console.log(id);
				console.log(el);

				console.log(e.classList);
				console.log(window.matchMedia(`(prefers-reduced-motion: no-preference)`));

				if (!el.classList.contains(`visible`) && window.matchMedia(`(prefers-reduced-motion: no-preference)`).matches) {
					console.log(`animation is good to go`);
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
