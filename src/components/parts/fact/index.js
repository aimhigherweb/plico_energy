import React from 'react';

import Animated from '../animated_svg';
import Sun from '../../../img/animations/sun_plug.svg';
import Blob from '../../../img/quote_blob.svg';
import QuestionMark from '../../../img/question_mark.svg';

import './style.scss';

const Fact = ({ content, heading }) => (
	<div className="fact_block">
		<QuestionMark className="question" />
		<h2>{heading}</h2>
		<div dangerouslySetInnerHTML={{ __html: content }} />
		<Blob className="background" />
	</div>
);

export default Fact;
