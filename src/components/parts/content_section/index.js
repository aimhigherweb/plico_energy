import React from 'react';

import Blob from '../../../img/blob_background.svg';

import './style.scss';

const Section = ({ heading, content, index }) => (
	<div className={`section ${index % 2 !== 0 && `secondary`} s_${index + 1}`}>
		<h3>{heading}</h3>
		<div dangerouslySetInnerHTML={{ __html: content }} />
	</div>
);

export default Section;
