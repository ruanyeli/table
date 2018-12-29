import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import s from './style';
import { getDomKeys } from './util';
const noop = function() {};

export default class Menu extends React.Component {
  static defaultProps = {
    prefixCls: s.menuPrefix,
    children: '',
    mode: 'inline',
    multiple: false,
    theme: 'light',
    onClick: noop
  }

  static propTypes = {
    theme: PropTypes.oneOf(['light', 'dark']),
    mode: PropTypes.oneOf(['inline', 'vertical', 'horizontal']),
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    defaultSelectedKeys: PropTypes.arrayOf(PropTypes.string),
    selectedKeys: PropTypes.arrayOf(PropTypes.string),
    onSelect: PropTypes.func,
    defaultOpenKeys: PropTypes.arrayOf(PropTypes.string),
    openKeys: PropTypes.arrayOf(PropTypes.string),
    onOpenChange: PropTypes.func,
    multiple: PropTypes.bool
  }

  constructor(props) {
    super(props);
    let selectedKeys = props.defaultSelectedKeys || [];
    let openKeys = props.defaultOpenKeys || [];
    if ('selectedKeys' in props) {
      selectedKeys = props.selectedKeys || [];
    }
    if ('openKeys' in props) {
      openKeys = props.openKeys || [];
    }
    const domKeys = getDomKeys(props.children);
    this.state = {
      openKeys,
      selectedKeys,
      domKeys
    }
  }

  componentWillReceiveProps(nextProps) {
    const props = {};
    if ('selectedKeys' in nextProps) {
      props.selectedKeys = nextProps.selectedKeys || [];
    }
    if ('openKeys' in nextProps) {
      props.openKeys = nextProps.openKeys || [];
    }
    this.setState(props);
  }

  renderItem = (child, index) => {
    const { prefixCls, level, mode, multiple, children, onClick } = this.props;
    const { openKeys, selectedKeys, domKeys } = this.state;
    let items = React.Children.map(children, (child, index) => {
      if (!child) {
        return ''
      }
      let newChildProps = {
        prefixCls,
        openKeys,
        selectedKeys,
        domKeys,
        onSelect: this.onSelect,
        onOpenChange: this.onOpenChange,
        level: level ? (level + 1) : 1,
        eventKey: child.key === undefined || child.key === null ? `root-${index}` : child.key,
        mode,
        multiple,
        disabled: child.props.disabled || false,
        onClick
      }
      return React.cloneElement(child, newChildProps);
    })
    return items;
  }

  onSelect = (selectedKeys) => {
    const { mode } = this.props;
    if ('onSelect' in this.props) {
      this.props.onSelect(selectedKeys);
    } else {
      this.setState({
        selectedKeys
      })
    }
    if (mode !== 'inline') {
      this.onOpenChange([]);
    }
  }

  onOpenChange = (openKeys) => {
    if ('onOpenChange' in this.props) {
      this.props.onOpenChange(openKeys);
    } else {
      this.setState({
        openKeys
      })
    }
  }

  render() {
    const { prefixCls, style, mode, theme, className } = this.props;
    return <ul className={classnames(prefixCls, `${prefixCls}-${mode}`, `${prefixCls}-${theme}`, className)} style={style}>
      {this.renderItem()}
    </ul>;
  }
}
