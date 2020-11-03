import React from 'react';

import { Link } from 'gatsby';

const A = ({ children, url, className }) => {
	if (RegExp(`https*://`).test(url)) {
		return <a href={url} className={className} target="_blank">{children}</a>;
	}

	return <Link className={className} to={url}>{children}</Link>;
};

export default A;
