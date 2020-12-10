const systemConfig = ({
	query, setFunction, setMessage, values
}) => {
	console.log(`fetching data`);
	return fetch(`https://sepricecatalog.azurewebsites.net/api/${query}`, {
		method: `GET`,
		mode: `cors`,
		headers: {
			'Content-Type': `application/json`,
			'x-functions-key': process.env.GATSBY_FUNCTIONS_KEY,
		}
	}).then((res) => res.json())
		.then((data) => {
			console.log(data);
			if (setMessage) {
				setMessage(null);
			}
			setFunction(data);
		})
		.catch((err) => {
			if (setMessage) {
				setMessage(`Something went wrong fetching our system details, please try again later`);
			}
			Sentry.setContext(`formData`, { values: JSON.stringify(values) });
			Sentry.captureException(err);
		});
};

export default systemConfig;
