import React from 'react';

import Block from "../../parts/block";
import Testimonials from '../../parts/testimonials';

import './style.scss';

const TestimonialsBlock = ({
	heading, content, testimonials
}) => (
	<Block className="testimonial_block">
		<h2>{heading}</h2>
		<div dangerouslySetInnerHTML={{ __html: content }} />
		<Testimonials {...{ testimonials }} />
	</Block>
);

export default TestimonialsBlock;
