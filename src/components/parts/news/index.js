import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import CTA from '../cta';

import './style.scss';

const News = ({
	name, excerpt, featureImage, slug, date, cta, tags
}) => (
	<article className="article">
		<div className="content">
			{date && <p className="date">{date}</p>}
			{tags && <p className="tags">{tags.join(` `)}</p>}
			<h3>{name}</h3>
			<p className="excerpt">{excerpt}</p>
			{cta
				? <CTA {...{ cta_button: cta }} />
				: <Link to={slug} className="block">Read More</Link>
			}
		</div>

		{featureImage
			&& <Img
				fluid={featureImage.childImageSharp.fluid}
			/>
		}
	</article>
);

export default News;
