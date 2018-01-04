import React from 'react';
import PropTypes from 'prop-types';
import {RouteHelper} from './RouteHelper';


class Redirect extends Component {
  static defaultProps = {
    push: false
  }

  static propTypes = {
    to: PropTypes.string.isRequired,
    push: PropTypes.bool.isRequired,
  }

  componentDidMount() {
    const { to, push } = this.props

    push ? historyPush(to) : historyReplace(to)
  }

  render() {
    return null
  }
}