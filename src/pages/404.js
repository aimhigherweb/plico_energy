import React from 'react';

import Layout from '../components/partials/layout';

import '../styles/custom/not_found.scss';

const FourOhFour = () => (
	<Layout {...{ classes: `page` }}>
		<h1>Page not found</h1>
		<p>Looks like that page doesn't exist anymore or has moved. Try going back to the <a href="/">home page</a> or selecting one of the options from our menu instead.</p>
	</Layout>
);

export default FourOhFour;
