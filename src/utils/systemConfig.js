const systemConfig = (path, setFunction, setMessage) => {
	console.log(`fetching data`);
	return fetch(`https://sepricecatalog.azurewebsites.net/api/${path}`, {
		method: `GET`,
		mode: `cors`,
		headers: {
			'Content-Type': `application/json`,
			'x-functions-key': process.env.GATSBY_FUNCTIONS_KEY,
		}
	}).then((res) => res.json())
		.then((data) => {
			if (setMessage) {
				setMessage(null);
			}
			setFunction(data);
		})
		.catch((err) => {
			if (setMessage) {
				setMessage(`Something went wrong fetching our system details, please try again later`);
			}
			Sentry.captureException(err);
			Sentry.captureMessage(`Something went wrong fetching our system details, please try again later`);
		});
};

export default systemConfig;
