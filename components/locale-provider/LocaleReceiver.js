import React from "react";
import PropTypes from 'prop-types';
import defaultLocale from "./zh_CN";

export default class LocaleReceiver extends React.Component {
  static defaultProps = {
    componentName: PropTypes.string
  }; 

  static contextTypes = {
    tdLocale: PropTypes.object
  }

  getLocale() {
    const { tdLocale = {} } = this.context;
    const { componentName } = this.props;
    const locale = {
      ...defaultLocale,
      ...tdLocale
    }
    return locale[componentName] || {}
  }

  render() {
    return this.props.children(this.getLocale())
  }
}