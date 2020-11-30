const systemConfig = (path, setFunction, setMessage) => {
	console.log(`fetching data`);
	return fetch(`https://sepricecatalog.azurewebsites.net/api/${path}`, {
		method: `GET`,
		mode: `cors`,
		headers: {
			'Access-Control-Allow-Origin': `https://sepricecatalog.azurewebsites.net`,
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
			console.error(err);
		});
};

export default systemConfig;
