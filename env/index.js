require(`dotenv`).config();

// console.log(process.env);

const envs = {};

Object.keys(process.env).forEach((key) => {
	if (RegExp(/^GATSBY_FORM_/).test(key)) {
		envs[key] = process.env[key];
	}
});

module.exports = {
	...envs
};
