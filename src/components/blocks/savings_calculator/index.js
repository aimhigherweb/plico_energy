import React, { Fragment, useState } from 'react';

import Block from "../../parts/block";
import CTA from '../../parts/cta';
import Animated from '../../parts/animated_svg';
import Plug from '../../../img/animations/plug.svg';

import calculateSavings from './calculation';

import './style.scss';

const Results = ({ savings, results_text }) => {
		if (savings > 0) {
			return (
				<Fragment>
					<p className="feature">You could save <span className="savings">${savings}</span> annually</p>
					<p>{results_text}</p>
				</Fragment>
			);
		}
		return (
			<p>With your current energy usage, installing a Plico Energy system will cost you approximately an extra <span className="savings">${savings}</span> daily. This is a small price to pay for getting off coal and being able to stay powered up if the grid goes down.</p>
		);
	},

	SavingsCalculator = ({
		heading, slider_heading, slider_disclaimer, results_text, results_cta
	}) => {
		const initial = 170,
			min = 100,
			max = 500,
	 [bill, setBill] = useState(initial),
			[savings, setSavings] = useState(calculateSavings(initial)),
			changeSlider = (e) => {
				setBill(e);
				setSavings(calculateSavings(e));
			};

		return (
			<Block className={`form_block block calculator`}>
				<Animated className="plug">
					<Plug />
				</Animated>
				<h2>{heading}</h2>
				<form>
					<label dangerouslySetInnerHTML={{ __html: slider_heading }} />
					<input
						type="range"
						min={min}
						max={max}
						step="10"
						value={bill}
						onChange={(e) => changeSlider(e.target.value)}
						style={{ '--percentage': `${((bill - min) / (max - min)) * 100}%` }}
					/>
					<p className="bill">${bill}</p>
					<p className="disclaimer">{slider_disclaimer}</p>
				</form>
				<div className="results">
					<Results {...{ savings, results_text }} />
					{results_cta && <CTA {...{ cta_button: results_cta }} />}
				</div>
			</Block>
		);
	};

export default SavingsCalculator;
