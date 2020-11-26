import React, { useRef } from 'react';
import { Waypoint } from 'react-waypoint';

import './style.scss';

const Animated = ({ children, className, position }) => {
	const ref = useRef(null),
		runAnimation = () => {
			if (typeof window !== `undefined`) {
				const LazyLinePainter = require(`lazy-line-painter`);
				const el = ref.current;

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
		<div ref={ref} className={className}>
			{position === `top`
				&& <span className="animated-offset">
					<Waypoint onEnter={runAnimation}/>
				</span>}
			{children}
			{position !== `top`
				&& <Waypoint onEnter={runAnimation}/>
			}
		</div>
	);
};

export default Animated;
