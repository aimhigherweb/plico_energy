import React, { Fragment, useRef } from 'react';
import { Waypoint } from 'react-waypoint';

import Block from "../../parts/block";
import CTA from '../../parts/cta';

import './style.scss';

const CTABlock = ({
	cta_button, sticky
}) => {
	const ref = useRef(null),
		ctaEnter = () => {
			console.log(`enter`, ref);
			const el = ref.current,
				block = el.parentNode;
			console.log(block);
			if (block.classList.contains(`sticky`)) {
				block.classList.remove(`sticky`);
			}
		},
		ctaExit = () => {
			console.log(`exit`, ref);
			const el = ref.current,
				block = el.parentNode;
			if (!block.classList.contains(`sticky`)) {
				block.classList.add(`sticky`);
			}
		};

	return (
		<Fragment>
			{sticky
				&& <Waypoint
					onEnter={ctaEnter}
					onLeave={ctaExit}
				/>
			}
			<Block

				className={`cta_block ${sticky && `sticky`}`}
				styles={{ '--block_background': cta_button[0].cta_colour.colour.match(/#18304c/i) ? `#00bbd4` : `#18304c` }}
			>

				<div ref={ref} className="fixed">
					{cta_button && <CTA {...{ cta_button }} />}
				</div>

			</Block>
		</Fragment>
	);
};

export default CTABlock;
