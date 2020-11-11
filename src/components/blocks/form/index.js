import React from 'react';

import Block from "../../parts/block";
import Form from '../../parts/form';

const FormBlock = ({
	heading, content
}) => (
	<Block>
		<h2>{heading}</h2>
		<div dangerouslySetInnerHTML={{ __html: content }} />
		<Form />
	</Block>
);

export default FormBlock;
