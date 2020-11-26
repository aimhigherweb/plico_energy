import React, { Fragment } from 'react';

import { Field } from 'formik';

import generateSlug from '../../../../../utils/generateSlug';
import systemConfig from '../../../../../utils/systemConfig';

const SystemConfiguration = ({
	_uid, label, parent
}) => {
	const inverters = systemConfig(`inverters`);
	return (
		<Fragment>
			<h3>Inverter Selection</h3>
			<div>
				<label htmlFor={`inverters${_uid}`}>Number of Systems required</label>
				<Field
					as='select'
					id={`inverters${_uid}`}
					name={`${parent}${generateSlug(label)}_inverters`}
					onChange={(e) => onChange(e)}
				>
					<option default>Please call me to discuss</option>
				</Field>
			</div>

			{true
			&& <Fragment>
				<h3>Battery Selection</h3>
				<p>Plico is able to install an extra battery per system to increase storage capacity. The standard option is 3 batteries per system with 7.2kW storage capacity, this can be upgraded to 4 batteries with 9.6kW storage capacity for $3.50 extra per week.</p>
				<div>
					<label htmlFor={`batteries${_uid}`}>Battery storage option</label>
					<Field
						as='select'
						id={`batteries${_uid}`}
						name={`${parent}${generateSlug(label)}_batteries`}
						onChange={(e) => onChange(e)}
					>
						<option>Please select</option>
					</Field>
				</div>
			</Fragment>
			}
			{true
			&& <Fragment>
				<h3>Number of Systems</h3>
				<p>If you have above average energy requirements, you may also consider installing more than one system at your property.</p>
				<div>
					<label htmlFor={`number-systems${_uid}`}>Number of Systems required</label>
					<Field
						as='select'
						id={`number-systems${_uid}`}
						name={`${parent}${generateSlug(label)}_number-systems`}
						onChange={(e) => onChange(e)}
					>
						<option default>Please call me to discuss</option>
					</Field>
				</div>
			</Fragment>
			}
			{true
			&& <Fragment>
				<h3>Number of Systems</h3>
				<p>If you have above average energy requirements, you may also consider installing more than one system at your property.</p>
				<div>
					<label htmlFor={`inverters${_uid}`}>Number of Systems required</label>
					<Field
						as='select'
						id={`inverters${_uid}`}
						name={`${parent}${generateSlug(label)}_inverters`}
						onChange={(e) => onChange(e)}
					>
						<option>Please select</option>
					</Field>
				</div></Fragment>
			}
			{true
			&& <Fragment>
				<label htmlFor={`weekly-cost${_uid}`}>Total Weekly Cost</label>
				<Field
					type='text'
					id={`weekly-cost${_uid}`}
					name={`${parent}${generateSlug(label)}_weekly-cost`}
					value={`$100`}
				/>
			</Fragment>
			}
			{true
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
