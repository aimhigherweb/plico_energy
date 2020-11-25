import React from 'react';

import Block from "../../parts/block";
import Form from '../../parts/form';
import Illustration from '../../parts/illustration';

import './style.scss';

const FormBlock = ({
	heading, content, illustration, form
}) => (
	<Block className="form_block">
		<h2>{heading}</h2>
		<div dangerouslySetInnerHTML={{ __html: content }} />
		<Form {...{ form }} />
		{illustration && <Illustration {...illustration[0]} />}
	</Block>
);

export default FormBlock;
