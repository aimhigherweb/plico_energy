import React from 'react';

import Block from "../../parts/block";
import Profile from '../../parts/profile';

import './style.scss';

const TeamProfiles = ({ profiles }) => (
	<Block className="featured_sections team_profiles">
		<div className="sects">
			{profiles.map((profile) => (
				<Profile
					key={profile._uid}
					{...profile }
				/>
			))}
		</div>

	</Block>
);

export default TeamProfiles;
