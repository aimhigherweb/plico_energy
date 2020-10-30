import React from 'react';

import { Link } from 'gatsby';

const A = ({ label, url }) => {
	if (RegExp(`https*://`).test(url)) {
		return <a href={url} target="_blank">{label}</a>;
	}

	return <Link to={url}>{label}</Link>;
};

export default A;
