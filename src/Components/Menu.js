import React from 'react';
import Link from './Router/Link';

const Menu = () => {
	return (
		<div className="main-menu">
			<ul >
				<li><Link to="/">Projects</Link></li>
				<li><Link to="#">Users</Link></li>
			</ul>
		</div>
	);
}

export default Menu;