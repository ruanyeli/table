import React from "react";
import PropTypes from 'prop-types';
import moment from 'moment';

export default class LocaleProvider extends React.Component {
  static defaultProps = {
    locale: PropTypes.object
  };

  componentWillReceiveProps(nextProps) {
    moment.locale(nextProps.locale.DatePicker.momentLocale);
  }

  componentWillMount() {
    moment.locale(this.props.locale.DatePicker.momentLocale);
  }

  static childContextTypes = {
    tdLocale: PropTypes.object,
  };

  getChildContext() {
    return {
      tdLocale: {
        ...this.props.locale
      }
    };
  }

  render() {
    return React.Children.only(this.props.children)
  }
}