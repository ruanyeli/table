import React from 'react';
import { createPortal } from 'react-dom';
/* eslint-disable no-unused-vars */
import Dialog from './dialog';

export default class DialogWrap extends React.Component {
  static defaultProps = {
    visible: false
  }

  constructor(props) {
    super(props);
    if (props.visible) {
      this._container = this.getContainer();
    } else {
      this._container = null;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible && !this._container) {
      this._container = this.getContainer();
    }
  }

  // shouldComponentUpdate({ visible }) {
  //   return !!(this.props.visible || visible);
  // }

  componentWillUnmount() {
    this.removeContainer();
  }

  removeContainer = () => {
    if (this._container && this._container.parentNode) {
      this._container.parentNode.removeChild(this._container);
    }
  }

  getComponent = (componentArg) => {
    console.log(this.props, componentArg)
    return (
      <Dialog
        {...this.props}
        {...componentArg}
        key="dialog"
      />
    )
  }

  getContainer = (instance) => {
    if (this.props.getContainer) {
      return this.props.getContainer();
    }
    const container = document.createElement('div');
    document.body.appendChild(container);
    return container;
  }

  render () {
    if (this._container) {
      return createPortal(this.getComponent(), this._container)
    } else {
      return null
    }
  }
}
