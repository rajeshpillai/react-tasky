/* global addEventListener */

/* eslint no-restricted-globals: ["off", "addEventListener"]*/

import React from 'react';
import PropTypes from 'prop-types';
import RouteHelper from './RouteHelper';

const matchPath = (pathname, options) => {
	const {exact = false, path} = options;
	if (!path) {
		return {
			path: null,
			url: pathname,
			isExact: true,
		}
	}

	const match = new RegExp(`^${path}`).exec(pathname);

	if (!match) {
		return null;
	}

	const url = match[0];
	const isExact = pathname === url;

	if (exact && !isExact) {
		// There was a match but it wasn't
		// and exact match as specified by
		// the exact prop.

		return null;
	}

	return {
		path,
		url,
		isExact
	}
}

export default class Route extends React.Component {
	static propTypes = {
		exact: PropTypes.bool
	}

	componentWillMount() {
		addEventListener("popstate", this.handlePop);
		RouteHelper.register(this);
	}

	componentWillUnmount() {
		RouteHelper.unregister(this);
		removeEventListener("popstate", this.handlePop);
	}

	handlePop = () => {
		this.forceUpdate();
	}

	render() {
		const {
			path,
			exact,
			component,
			render
		} = this.props;

		const match = matchPath(
			location.pathname,
			{path, exact}
		);

		if (!match) {
			return null;
		}

		if (component) {
			// The component prop takes precedent over the
			// render method.  If the current location matches the
			// path prop, create a new element passing in 
			// match as the prop.

			return React.createElement(component, {match});
		}

		if (render) {
			// If there's a match but component
			// was undefined, invoke the render 
			// prop passing in match as an argument.

			return render({match});
		}

		return null;
	}
}