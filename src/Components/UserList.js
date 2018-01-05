import React from 'react';
import Link from './Router/Link';

const UserList = (props) => {
	var {users} = props;
	var projectView = users.map((user) => {
		return (
			<li className="project" key={user.id}>
				<div className="project-header">
					<Link to={"/users/" + user.id}>{user.name}</Link>
				</div>

				<div className="project-footer">&copy;</div>

			</li>
		);	
	});
	return (
		<ul className="project-list">
			{projectView}
		</ul>
	);	
}

export default UserList;