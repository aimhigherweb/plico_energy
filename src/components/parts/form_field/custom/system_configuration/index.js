import React, { Fragment, useEffect, useState } from 'react';

import { Field } from 'formik';

import generateSlug from '../../../../../utils/generateSlug';
import systemConfig from '../../../../../utils/systemConfig';

const SystemConfiguration = ({
	_uid, label, parent
}) => {
	const [inverters, setInverters] = useState([]),
		[batteries, setBatteries] = useState([]),
		[systems, setSystems] = useState(false),
		[pricing, setPrice] = useState({}),
		[cost, setCost] = useState(false),
		selectInverter = (e) => {
			setBatteries([]);
			setSystems(false);
			setPrice({});
			setCost(false);
			systemConfig(`relatedbatterykeys?InverterId=${e.target.value}`, setBatteries);
		},
		selectBattery = (e) => {
			setCost(false);
			setPrice({});
			setSystems(true);
			systemConfig(`products/${e.target.value}?includepricing`, setPrice);
		},
		selectSystems = (e) => {
			setCost(pricing.weeklyFee * e.target.value);
		};

	useEffect(() => {
		systemConfig(`inverters`, setInverters);
	}, []);

	return (
		<Fragment>
			{!inverters.length && <p>Loading options</p>}
			{inverters.length > 0
				&& <Fragment>
					<h3>Inverter Selection</h3>
					<label htmlFor={`inverters${_uid}`}>Inverter option</label>
					{inverters.length
					&& <Field
						as='select'
						id={`inverters${_uid}`}
						name={`${parent}${generateSlug(label)}_inverters`}
						onChange={(e) => selectInverter(e)}
					>
						<option>Please call me to discuss</option>
						{inverters.map((opt) => (
							<option key={opt.id} value={opt.id}>{opt.name}</option>
						))}
					</Field>
					}
				</Fragment>
			}

			{batteries.length > 0
			&& <Fragment>
				<h3>Battery Selection</h3>
				<p>Plico is able to install an extra battery per system to increase storage capacity. The standard option is 3 batteries per system with 7.2kW storage capacity, this can be upgraded to 4 batteries with 9.6kW storage capacity for $3.50 extra per week.</p>
				<label htmlFor={`batteries${_uid}`}>Battery storage option</label>
				<Field
					as='select'
					id={`batteries${_uid}`}
					name={`${parent}${generateSlug(label)}_batteries`}
					onChange={(e) => selectBattery(e)}
				>
					<option>Please select</option>
					{batteries.map((opt) => (

						<option key={opt.productId} value={opt.productId}>{opt.batteryComboName}</option>
					))}
				</Field>
			</Fragment>
			}
			{systems
			&& <Fragment>
				<h3>Number of Systems</h3>
				<p>If you have above average energy requirements, you may also consider installing more than one system at your property.</p>
				<label htmlFor={`number-systems${_uid}`}>Number of Systems required</label>
				<Field
					as='select'
					id={`number-systems${_uid}`}
					name={`${parent}${generateSlug(label)}_number-systems`}
					onChange={(e) => selectSystems(e)}
				>
					<option default>Please call me to discuss</option>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
				</Field>
			</Fragment>
			}
			{cost
			&& <Fragment>
				<label htmlFor={`weekly-cost${_uid}`}>Total Weekly Cost</label>
				<Field
					type='text'
					id={`weekly-cost${_uid}`}
					name={`${parent}${generateSlug(label)}_weekly-cost`}
					value={`$ ${cost}`}
					readonly
				/>
			</Fragment>
			}
			{cost
			&& <Fragment>
				<Field
					type='checkbox'
					id={`agreement${_uid}`}
					name={`${parent}${generateSlug(label)}_agreement`}
				/>
				<label htmlFor={`agreement${_uid}`}>I understand & accept the <b>total weekly cost</b> listed above for the system configuration I have selected.</label>
			</Fragment>
			}
		</Fragment>
	);
};

export default SystemConfiguration;
