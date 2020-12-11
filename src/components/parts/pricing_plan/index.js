import React, { Fragment } from 'react';

import CTA from '../cta';

import './styles.scss';

const Plan = ({
	cta, description, features, name, price, callout
}) => (
	<li className={`plan ${(callout && callout !== ``) && `callout`}`}>
		<p className="callout">{callout}</p>
		<h3>{name}</h3>

		<p className="description">{description}</p>
		<div className="features">
			<p className="price">
				{(price && price !== ``)
					? <Fragment>${price.split(`.`)[0]}<small>.{price.split(`.`)[1]}</small></Fragment>
					: `TBC`
				}
			</p>
			{(price && price !== ``)
				&& <small className="frequency">per week</small>
			}
			<div dangerouslySetInnerHTML={{ __html: features }} />
			{cta && <CTA cta_button={cta} />}
		</div>
	</li>
);

export default Plan;
