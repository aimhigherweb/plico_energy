const systemConfig = () => {
	console.log(`fetching data`);
	console.log(process.env.GATSBY_FUNCTIONS_KEY);
	return fetch(`https://sepricecatalog.azurewebsites.net/api/inverters`, {
		method: `GET`,
		mode: `cors`,
		headers: {
			'Access-Control-Allow-Origin': `*`,
			'Content-Type': `application/json`,
			'x-functions-key': process.env.GATSBY_FUNCTIONS_KEY,
		}
	}).then((res) => res.json()).then((data) => data).catch((err) => console.error(err));
};

export default systemConfig;
