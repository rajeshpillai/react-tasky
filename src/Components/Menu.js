/* global location */
/* eslint no-restricted-globals: ["off", "location"]*/

import React from 'react';
import Link from './Router/Link';

export default class Menu extends React.Component {
	state ={menu: [
		{title: "Projects", url: "/", active:true},
		{title: "Users", url: "/users",active:false}
	]};

	onClick = (e, to) => {
		var activeMenu = this.state.menu.map((m) => {
			if (m.url === to) {
				m.active = true;
			} else {
				m.active = false;
			}
			return m;

		});
		this.setState({
			menu:  [...activeMenu]
		})
	}

	render() {

		var links = this.state.menu.map((m) => {
			var activeClass = m.active ? "menu-active": "";
			return (
				<li key={m.title}>
					<Link to={m.url} className={activeClass} onClick={this.onClick}>{m.title} </Link>
				</li>
			);
		})
		return (
			<div className="main-menu">
				<ul>
					{links}
				</ul>
			</div>
		);
	}
}