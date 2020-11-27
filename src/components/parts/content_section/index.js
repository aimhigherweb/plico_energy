import React from 'react';

import Blob from '../../../img/blob_outline.svg';

import './style.scss';

const Section = ({ heading, content, index }) => (
	<div className={`section ${index % 2 !== 0 && `secondary`}`}>
		<h3>{heading}</h3>
		<div dangerouslySetInnerHTML={{ __html: content }} />
		<Blob className="background" />
	</div>
);

export default Section;
