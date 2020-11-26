const systemConfig = (path, setFunction) => {
	console.log(`fetching data`);
	return fetch(`https://sepricecatalog.azurewebsites.net/api/${path}`, {
		method: `GET`,
		mode: `cors`,
		headers: {
			'Access-Control-Allow-Origin': `https://sepricecatalog.azurewebsites.net`,
			'Content-Type': `application/json`,
			'x-functions-key': process.env.GATSBY_FUNCTIONS_KEY,
		}
	}).then((res) => res.json()).then((data) => setFunction(data)).catch((err) => console.error(err));
};

export default systemConfig;
