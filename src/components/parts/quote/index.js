import React from 'react';

import Animated from '../animated_svg';
import Sun from '../../../img/animations/sun_plug.svg';
import Blob from '../../../img/quote_blob.svg';

import './style.scss';

const Quote = ({ content, illustration }) => {
	const Illustration = Sun;
	return (
		<blockquote className={`quote_block ${illustration !== `null` && `illustration_${illustration}`}`}>
			<div dangerouslySetInnerHTML={{ __html: content }} />
			{illustration !== `null`
				&& <Animated className="quote_illustration">
					<Illustration />
				</Animated>
			}
			<Blob className="background" />
		</blockquote>
	);
};

export default Quote;
