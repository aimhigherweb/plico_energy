import React, { Fragment, useEffect, useState } from 'react';

import systemConfig from '../../../../../utils/systemConfig';

const SystemConfiguration = ({
	_uid, label, fieldChanged, field_id, values
}) => {
	const [inverters, setInverters] = useState([]),
		[batteries, setBatteries] = useState([]),
		[systems, setSystems] = useState(false),
		[pricing, setPrice] = useState({}),
		[cost, setCost] = useState(false),
		[message, setMessage] = useState(`Loading Options`),
		selectInverter = (e) => {
			setBatteries([]);
			setSystems(false);
			setPrice({});
			setCost(false);
			systemConfig({
				query: `relatedbatterykeys?InverterId=${e.target.value}`,
				setFunction: setBatteries,
				values
			});
			fieldChanged(`${field_id}_inverterId`, e.target.value);
		},
		selectBattery = (e) => {
			setCost(false);
			setPrice({});
			setSystems(true);
			systemConfig({
				query: `products/${e.target.value}?includepricing`,
				setFunction: setPrice,
				values
			});
			fieldChanged(`${field_id}_batteryId`, e.target.value);
		},
		selectSystems = (e) => {
			setCost(pricing.weeklyFee * e.target.value);
			fieldChanged(`${field_id}_numberOfSystems`, e.target.value);
			fieldChanged(`${field_id}_weeklyCost`, pricing.weeklyFee * e.target.value);
		};

	useEffect(() => {
		systemConfig({
			query: `inverters`,
			setFunction: setInverters,
			setMessage,
			values
		});
	}, []);

	return (
		<Fragment>
			{message && <p>{message}</p>}
			{inverters.length > 0
				&& <Fragment>
					<h3>Inverter Selection</h3>
					<label htmlFor={`inverters${_uid}`}>Inverter option</label>
					{inverters.length
					&& <select
						id={`inverters${_uid}`}
						name={`${field_id}_inverterId`}
						onChange={(e) => selectInverter(e)}
					>
						<option>Please call me to discuss</option>
						{inverters.map((opt) => (
							<option key={opt.id} value={opt.id}>{opt.name}</option>
						))}
					</select>
					}
				</Fragment>
			}

			{batteries.length > 0
			&& <Fragment>
				<h3>Battery Selection</h3>
				<p>Plico is able to install an extra battery per system to increase storage capacity. The standard option is 3 batteries per system with 7.2kW storage capacity, this can be upgraded to 4 batteries with 9.6kW storage capacity for $3.50 extra per week.</p>
				<label htmlFor={`batteries${_uid}`}>Battery storage option</label>
				<select
					id={`batteries${_uid}`}
					name={`${field_id}_batteryId`}
					onChange={(e) => selectBattery(e)}
				>
					<option default>Please call me to discuss</option>
					{batteries.map((opt) => (

						<option key={opt.productId} value={opt.productId}>{opt.batteryComboName}</option>
					))}
				</select>
			</Fragment>
			}
			{systems
			&& <Fragment>
				<h3>Number of Systems</h3>
				<p>If you have above average energy requirements, you may also consider installing more than one system at your property.</p>
				<label htmlFor={`number-systems${_uid}`}>Number of Systems required</label>
				<select
					id={`number-systems${_uid}`}
					name={`${field_id}_numberOfSystems`}
					onChange={(e) => selectSystems(e)}
				>
					<option default>Please call me to discuss</option>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
				</select>
			</Fragment>
			}
			{cost
			&& <Fragment>
				<label htmlFor={`weekly-cost${_uid}`}>Total Weekly Cost</label>
				<input
					type='text'
					id={`weekly-cost${_uid}`}
					name={`${field_id}_weeklyCost`}
					value={`$ ${cost}`}
					readonly
				/>
			</Fragment>
			}
			{cost
			&& 	<fieldset>
				<legend>The information I have provided is true and correct to the best of my/our knowledge.</legend>
				<div class="options">
					<input
						type="radio"
						id={`agreement${_uid}_yes`}
						name={`${field_id}_agreement`}
						value="yes"
						onChange={(e) => (fieldChanged(`${field_id}_agreement`, e.target.value))}
					/>
					<label htmlFor={`agreement${_uid}_yes`} >Yes</label>
					<input
						type="radio"
						id={`agreement${_uid}_no`}
						name={`${field_id}_agreement`}
						value="no"
						onChange={(e) => (fieldChanged(`${field_id}_agreement`, e.target.value))}
					/>
					<label htmlFor={`agreement${_uid}_no`} >No</label>
				</div>
			</fieldset>
			}
		</Fragment>
	);
};

export default SystemConfiguration;
