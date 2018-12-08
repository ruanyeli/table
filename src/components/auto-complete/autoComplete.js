import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _findIndex from 'lodash/findIndex';
import s from './style';
import Select from '../select';

function isSelectOptionOrSelectOptGroup(child) {
  // return child && child.type && (child.type.isSelectOption || child.type.isSelectOptGroup);
  return true
}

export default class AutoComplete extends Component {
  static defaultProps = {
    prefixCls: s.selectPrefix,
    showSearch: false
  }

  static propTypes = {
    className: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      value: props.value || undefined
    }
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value
      });
    }
  }

  onChange = (value) => {
    const { dataSource, children } = this.props;
    if (this.props.onChange) {
      this.props.onChange(value);
    } else {
      this.setState({
        value
      });
    }
    const childArray = React.Children.toArray(children);
    if (this.props.onSelect) {
      if (dataSource && dataSource.length > 0) {
        const findIndex = _findIndex(dataSource, item => {
          if (React.isValidElement(item)) {
            return item.props.value === value;
          }
          switch (typeof item) {
            case 'string':
              return item === value;
            case 'object':
              return item.value === value;
            default:
              throw new Error('AutoComplete[dataSource] only supports type `string[] | Object[]`.');
          }
        })
        if (findIndex >= 0) {
          this.props.onSelect(value, React.isValidElement(dataSource[findIndex]) ? {
            value: dataSource[findIndex].props.value,
            text: dataSource[findIndex].props.children
          } : dataSource[findIndex]);
        }
      } else if (childArray && childArray.length > 0) {
        const findIndex = _findIndex(childArray, item => {
          return item.props.value === value;
        })
        if (findIndex >= 0) {
          this.props.onSelect(value, {
            value: childArray[findIndex].props.value,
            text: childArray[findIndex].props.children
          });
        }
      }
    }
  }

  render() {
    let {
      size, className = '', prefixCls, dataSource, children, onSelect
    } = this.props;

    const cls = classNames({
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-sm`]: size === 'small',
      [className]: !!className,
      [`${prefixCls}-show-search`]: true,
      [`${prefixCls}-auto-complete`]: true,
      [`${s.autoCompletePrefix}`]: true
    });

    let options;
    const childArray = React.Children.toArray(children);
    if (childArray.length && isSelectOptionOrSelectOptGroup(childArray[0])) {
      options = children;
    } else {
      options = dataSource ? dataSource.map((item) => {
        if (React.isValidElement(item)) {
          return item;
        }
        switch (typeof item) {
          case 'string':
            return <Option key={item} value={item}>{item}</Option>;
          case 'object':
            return (
              <Option disabled={!!item.disabled} key={item.value} value={item.value}>
                {item.text}
              </Option>
            );
          default:
            throw new Error('AutoComplete[dataSource] only supports type `string[] | Object[]`.');
        }
      }) : [];
    }
    return <Select
      {...this.props}
      onSelect={() => {}}
      onChange={this.onChange}
      mode="combobox"
      showSearch
      className={cls}
      value={this.state.value}
    >
      {options}
    </Select>;
  }
}
