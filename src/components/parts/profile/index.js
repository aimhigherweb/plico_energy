import React from 'react';
import Img from 'gatsby-image';

import LinkedIn from "../../../img/linkedin.svg";

import './style.scss';

const Profile = ({
	name, bio, featureImage, linkedin, role
}) => (
	<article className="profile">
		<div className="content">
			<h3>{name}</h3>
			<p className="role">{role}</p>
			<div className="bio" dangerouslySetInnerHTML={{ __html: bio }} />
			{linkedin
				&& <a className="btn" href={linkedin} target="_blank">
					<LinkedIn />
					<span>Connect with {name} on LinkedIn</span>
				</a>
			}
		</div>

		{(featureImage)
			&& <Img
				fluid={featureImage.childImageSharp.fluid}
			/>
		}

	</article>
);

export default Profile;
