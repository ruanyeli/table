import React from 'react';
import PropTypes from 'prop-types';
export default class OptGroup extends React.Component {
  static defaultProps = {
    isSelectOptGroup: true
  }
  static propTypes = {
    label: PropTypes.string
  }
}
