import React from 'react';
import { getFluidGatsbyImage } from 'gatsby-storyblok-image';
import Img from 'gatsby-image';

import LinkedIn from "../../../img/linkedin.svg";

import './style.scss';

const Profile = ({
	name, bio, image, linkedin, role
}) => (
	<article className="profile">
		<div className="content">
			<h3>{name}</h3>
			<div className="bio" dangerouslySetInnerHTML={{ __html: bio }} />
			{linkedin
				&& <a className="btn" href={linkedin} target="_blank">
					<LinkedIn />
					<span>Connect with {name} on LinkedIn</span>
				</a>
			}
		</div>

		{(image && image.filename && image.filename !== ``)
			&& <Img
				fluid={getFluidGatsbyImage(
					image.filename,
					{
						maxWidth: 300,
						maxHeight: 300 * 0.8
					}
				)}
			/>
		}

	</article>
);

export default Profile;
