import React, { Fragment, useState } from 'react';

import Block from "../../parts/block";
import CTA from '../../parts/cta';

import calculateSavings from './calculation';

const Results = ({ savings, results_text }) => {
		if (savings > 0) {
			return (
				<Fragment>
					<p>You could save <span>${savings}</span> annually</p>
					<p>{results_text}</p>
				</Fragment>
			);
		}
		return (
			<p>With your current energy usage, installing a Plico Energy system will cost you approximately an extra <span>${savings}</span> daily. This is a small price to pay for getting off coal and being able to stay powered up if the grid goes down.</p>
		);
	},

	SavingsCalculator = ({
		heading, slider_heading, slider_disclaimer, results_text, results_cta
	}) => {
		const initial = 170,
	 [bill, setBill] = useState(initial),
			[savings, setSavings] = useState(calculateSavings(initial)),
			changeSlider = (e) => {
				setBill(e);
				setSavings(calculateSavings(e));
			};

		console.log(results_cta);

		return (
			<Block className={`form_block`}>
				<h2>{heading}</h2>
				<form>
					<label dangerouslySetInnerHTML={{ __html: slider_heading }} />
					<input
						type="range"
						min="100"
						max="500"
						step="10"
						value={bill}
						onChange={(e) => changeSlider(e.target.value)}
					/>
					<p>${bill}</p>
					<p>{slider_disclaimer}</p>
				</form>
				<div>
					<Results {...{ savings, results_text }} />
					{results_cta && <CTA {...{ cta_button: results_cta }} />}
				</div>
			</Block>
		);
	};

export default SavingsCalculator;
