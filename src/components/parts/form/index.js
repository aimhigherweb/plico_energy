import React from 'react';

const Form = () => (
	<form>
		<fieldset>
			<div>
				<legend data-required>Name</legend>
				<label htmlFor="first_name">First Name</label>
				<input type="text" name="first_name" id="first_name" placeholder="First Name" required />
				<label htmlFor="last_name">Last Name</label>
				<input type="text" id="last_name" name="last_name" placeholder="Last Name" required />
			</div>
		</fieldset>
		<label data-required>Email</label>
		<input placeholder="hello@domain.com" />
		<fieldset>
			<div>
				<label>Phone</label>
				<input type="text" />
				<label>Suburb or Postcode</label>
				<input type="text" />
			</div>
		</fieldset>
		<fieldset>
			<div>
				<label>I'd like to know more about</label>
				<select>
					<option disabled>Please Select</option>
					<option>Batteries</option>
				</select>
				<label>Do you have existing solar?</label>
				<select>
					<option disabled>Please Select</option>
					<option>Yes</option>
					<option>No</option>
				</select>
			</div>
		</fieldset>
		<label>Message</label>
		<textarea></textarea>
		<button type="submit">Submit</button>
	</form>
);

export default Form;
