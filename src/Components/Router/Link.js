import React from 'react';
import PropTypes from 'prop-types';

import RouteHelper from './RouteHelper';



export default class Link extends React.Component {
	static propTypes = {
		to: PropTypes.string.isRequired,
		replace: PropTypes.bool,
	}

	handleClick = (event) => {
		const {replace, to} = this.props;
		event.preventDefault();

		replace ? RouteHelper.historyReplace(to) : RouteHelper.historyPush(to);
		
		this.props.onClick && this.props.onClick(event, to);
	}

	render() {
		const {to, children} = this.props;

		return (
			<a href={to} {...this.props} onClick={this.handleClick} >
				{children}
			</a>
		);
	}
}	