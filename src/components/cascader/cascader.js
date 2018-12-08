/**
 * Created by wxy on 2017/6/16.
 */
import React from 'react';
import CascaderTrigger from './cascaderTrigger';
import arrayTreeFilter from 'array-tree-filter';
import classNames from 'classnames';
import omit from 'omit.js';
import KeyCode from '../util/keyCode';
import _findIndex from 'lodash/findIndex';
import Input from '../input/index';
import Icon from '../icon/index';
import s from './style/index';

function highlightKeyword(str, keyword, prefixCls) {
  return str.split(keyword)
    .map((node, index) => index === 0 ? node : [
      <span className={`${prefixCls}-menu-item-keyword`} key="seperator">{keyword}</span>,
      node
    ]);
}

function defaultFilterOption(inputValue, path) {
  return path.some(option => option.label.indexOf(inputValue) > -1 || option.value.indexOf(inputValue) > -1);
}

function defaultRenderFilteredOption(inputValue, path, prefixCls) {
  return path.map(({ label }, index) => {
    const node = label.indexOf(inputValue) > -1 ? highlightKeyword(label, inputValue, prefixCls) : label;
    return index === 0 ? node : [' / ', node];
  });
}

function defaultSortFilteredOption(a, b, inputValue) {
  function callback(elem) {
    return elem.label.indexOf(inputValue) > -1;
  }
  const aIndex = _findIndex(a, callback);
  const bIndex = _findIndex(b, callback);
  return aIndex - bIndex;
}

export default class Cascader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || props.defaultValue || [],
      inputValue: '',
      inputFocused: false,
      popupVisible: false,
      flattenOptions: props.showSearch && this.flattenTree(props.options, props.changeOnSelect)
    };
  }
  static defaultProps = {
    prefixCls: s.cascaderPrefix,
    inputPrefixCls: s.inputPrefix,
    placeholder: '',
    transitionName: 'slide-up',
    popupPlacement: 'bottomLeft',
    options: [],
    disabled: false,
    allowClear: false,
    notFoundContent: 'Not Found'
  };

  handleChange = (value, selectedOptions) => {
    this.setState({ inputValue: '' });
    if (selectedOptions[0].__IS_FILTERED_OPTION) {
      const unwrappedValue = value[0];
      const unwrappedSelectedOptions = selectedOptions[0].path;
      this.setValue(unwrappedValue, unwrappedSelectedOptions);
      return;
    }
    this.setValue(value, selectedOptions);
  }

  handlePopupVisibleChange = (popupVisible) => {
    this.setState({
      popupVisible,
      inputFocused: popupVisible,
      inputValue: popupVisible ? this.state.inputValue : ''
    });

    const onPopupVisibleChange = this.props.onPopupVisibleChange;
    if (onPopupVisibleChange) {
      onPopupVisibleChange(popupVisible);
    }
  }

  handleInputBlur = () => {
    this.setState({
      inputFocused: false
    });
  }

  handleInputClick = (e) => {
    const { inputFocused, popupVisible } = this.state;
    if (inputFocused || popupVisible) {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
    }
  }

  handleKeyDown = (e) => {
    if (e.keyCode === KeyCode.BACKSPACE) {
      e.stopPropagation();
    }
  }

  handleInputChange = (e) => {
    const inputValue = e.target.value;
    this.setState({ inputValue });
    const { onInputChange } = this.props;
    if (onInputChange) {
      onInputChange(inputValue);
    }
  }

  setValue = (value, selectedOptions = []) => {
    if (!('value' in this.props)) {
      this.setState({ value });
    }
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(value, selectedOptions);
    }
  }

  getLabel() {
    const { options } = this.props;
    const displayRender = label => label.join(' / ');
    const value = this.state.value;
    const unwrappedValue = Array.isArray(value[0]) ? value[0] : value;
    const selectedOptions = arrayTreeFilter(options, (o, level) => o.value === unwrappedValue[level]);
    const label = selectedOptions.map(o => o.label);
    return displayRender(label, selectedOptions);
  }

  clearSelection = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!this.state.inputValue) {
      this.setValue([]);
      this.setState({ popupVisible: false });
    } else {
      this.setState({ inputValue: '' });
    }
  }

  flattenTree(options, changeOnSelect, ancestor = []) {
    let flattenOptions = [];
    options.forEach((option) => {
      const path = ancestor.concat(option);
      if (changeOnSelect || !option.children) {
        flattenOptions.push(path);
      }
      if (option.children) {
        flattenOptions = flattenOptions.concat(this.flattenTree(option.children, changeOnSelect, path));
      }
    });
    return flattenOptions;
  }

  generateFilteredOptions(prefixCls) {
    const { showSearch, notFoundContent } = this.props;
    const {
      filter = defaultFilterOption,
      render = defaultRenderFilteredOption,
      sort = defaultSortFilteredOption
    } = showSearch;
    const { flattenOptions, inputValue } = this.state;
    const filtered = flattenOptions.filter((path) => filter(this.state.inputValue, path))
      .sort((a, b) => sort(a, b, inputValue));

    if (filtered.length > 0) {
      return filtered.map((path) => {
        return {
          __IS_FILTERED_OPTION: true,
          path,
          label: render(inputValue, path, prefixCls),
          value: path.map(o => o.value),
          disabled: path.some(o => o.disabled),
          title: path.map(({ label }) => label).join('/')
        };
      });
    }
    return [{ label: notFoundContent, value: 'ANT_CASCADER_NOT_FOUND', disabled: true }];
  }

  saveInputRef = input => this.input = input;

  render() {
    const { props, state } = this;
    const {
      prefixCls, inputPrefixCls, children, placeholder, size, disabled,
      className, style, allowClear, showSearch = false, isPage, dropdownColumnStyle, ...otherProps
    } = props;
    const value = state.value;

    const sizeCls = classNames({
      [`${inputPrefixCls}-lg`]: size === 'large',
      [`${inputPrefixCls}-sm`]: size === 'small'
    });
    const clearIcon = (allowClear && !disabled && value.length > 0) || state.inputValue ? (
      <Icon
        type="cross-circle"
        className={`${prefixCls}-picker-clear`}
        onClick={this.clearSelection}
      />
    ) : null;
    const arrowCls = classNames({
      [`${prefixCls}-picker-arrow`]: true,
      [`${prefixCls}-picker-arrow-expand`]: state.popupVisible
    });
    const pickerCls = classNames(className, {
      [`${prefixCls}-picker`]: true,
      [`${prefixCls}-picker-with-value`]: state.inputValue,
      [`${prefixCls}-picker-disabled`]: disabled
    });

    const inputProps = omit(otherProps, ['onChange', 'onInputChange', 'options', 'popupPlacement', 'transitionName', 'displayRender', 'onPopupVisibleChange', 'changeOnSelect', 'expandTrigger', 'popupVisible', 'getPopupContainer', 'loadData', 'popupClassName', 'filterOption', 'renderFilteredOption', 'sortFilteredOption', 'notFoundContent']);

    let options = props.options;
    if (state.inputValue) {
      options = this.generateFilteredOptions(prefixCls);
    }
    if (!state.popupVisible) {
      options = this.cachedOptions;
    } else {
      this.cachedOptions = options;
    }

    const dropdownMenuColumnStyleProps = {...dropdownColumnStyle};
    const isNotFound = (options || []).length === 1 && options[0].value === 'ANT_CASCADER_NOT_FOUND';
    if (isNotFound) {
      dropdownMenuColumnStyleProps.height = 'auto'; // Height of one row.
    }
    const resultListMatchInputWidth = !(showSearch.matchInputWidth === false);
    if (resultListMatchInputWidth && state.inputValue && this.input) {
      dropdownMenuColumnStyleProps.width = this.input.input.offsetWidth;
    }
    const label = this.getLabel();
    const inputStyle = {};
    if (showSearch) {
      inputStyle.cursor = 'text';
    }
    const input = children || (
      <span
        style={style}
        className={pickerCls}
        title={label}
      >
        <span className={`${prefixCls}-picker-label`} onClick={() => {
          this.input && this.input.input.focus && this.input.input.focus(); // 高亮
        }}>
          {label}
        </span>
        <Input
          {...inputProps}
          ref={this.saveInputRef}
          placeholder={value && value.length > 0 ? undefined : placeholder}
          className={`${prefixCls}-input ${sizeCls}`}
          value={state.inputValue}
          disabled={disabled}
          readOnly={!showSearch}
          autoComplete="off"
          onClick={showSearch ? this.handleInputClick : undefined}
          onBlur={showSearch ? this.handleInputBlur : undefined}
          onKeyDown={this.handleKeyDown}
          onChange={showSearch ? this.handleInputChange : undefined}
          style={inputStyle}
        />
        {clearIcon}
        <Icon type="unfold" className={arrowCls} />
      </span>
    );

    return (
      <CascaderTrigger
        {...props}
        options={options}
        value={value}
        popupVisible={state.popupVisible}
        onPopupVisibleChange={this.handlePopupVisibleChange}
        onChange={this.handleChange}
        dropdownMenuColumnStyle={dropdownMenuColumnStyleProps}
        inputValue={state.inputValue}
      >
        {input}
      </CascaderTrigger>
    );
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({ value: nextProps.value || [] });
    }
    if (nextProps.showSearch && this.props.options !== nextProps.options) {
      this.setState({ flattenOptions: this.flattenTree(nextProps.options, nextProps.changeOnSelect) });
    }
  }
}
