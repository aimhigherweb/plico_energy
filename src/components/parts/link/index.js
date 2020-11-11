import React from 'react';

import { Link } from 'gatsby';

const A = ({
	children, url, className, style
}) => {
	if (RegExp(`https*://`).test(url)) {
		return <a href={url} style={style} className={className} target="_blank">{children}</a>;
	}

	return <Link className={className} style={style} to={url}>{children}</Link>;
};

export default A;
