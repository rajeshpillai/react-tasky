import React from 'react';
import Link from './Router/Link';

const UserList = (props) => {
	var {users} = props;
	var projectView = users.map((user) => {
		return (
			<li className="user" key={user.id}>
				<div className="user-header">
					<Link to={"/users/" + user.id}>{user.name}</Link>
				</div>

				<div className="user-footer"></div>

			</li>
		);	
	});
	return (
		<ul className="user-list">
			{projectView}
		</ul>
	);	
}

export default UserList;