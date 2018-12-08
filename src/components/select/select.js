import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Icon from '../icon';
import s from './style';
import SelectTrigger from './selectTrigger';
import { MenuItem, ItemGroup } from '../menu';
import { toArray, preventDefaultEvent } from './util';
import findIndex from 'lodash/findIndex';
import { LocaleReceiver } from "../locale-provider";

const prefixCls = s.selectPrefix;

function noop() {}

const UNSELECTABLE_STYLE = {
  userSelect: 'none',
  WebkitUserSelect: 'none'
}
export default class Select extends Component {
  static defaultProps = {
    showArrow: true,
    dropdownMatchSelectWidth: true,
    disabled: false,
    defaultActiveFirstOption: true,
    allowClear: false,
    defaultOpen: false,
    optionLabelProp: 'value',
    onSearch: noop,
    onSelect: noop,
    prefixCls: prefixCls,
    onFocus: noop,
    onChange: noop,
    isNull: false,
    pagination: false
  }

  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    defaultValue: PropTypes.string,
    onChange: PropTypes.func,
    onSelect: PropTypes.func,
    onSearch: PropTypes.func,
    showSearch: PropTypes.bool,
    prefixCls: PropTypes.string,
    open: PropTypes.bool,
    filterOption: PropTypes.func,
    isPage: PropTypes.object,
    pagination: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    overflow: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  }

  constructor(props) {
    super(props);
    let open = props.open;
    if (!open) {
      open = props.defaultOpen;
    }
    let value = [];
    if ('value' in props) {
      value = toArray(props.value);
    } else {
      value = toArray(props.defaultValue);
    }
    value = this.addLabelToValue(props, value);
    let inputValue = '';
    let selectedKeys = value.map(v => v.value);
    let combobox = props.mode === 'combobox';
    let multiple = props.mode === 'multiple';
    if (props.showSearch && value.length) {
      inputValue = value.length > 0 ? (value[0].label || value[0].value) : '';
    }
    if (combobox) {
      inputValue = props.value;
    }
    if (multiple) {
      inputValue = '';
    }
    this.state = {
      open,
      inputValue,
      selectedKeys,
      value,
      hoverItem: undefined
    };
    this.choiceList = null;
  }

  addLabelToValue = (props, value) => {
    let _value = value;
    if (!_value.length) return _value;
    _value = _value.map(v => ({
      value: v,
      label: this.getLabelToProps(props.children, v)
    }));
    return _value;
  }
  getLabelToProps = (children, value) => {
    if (value === undefined) {
      return null;
    }
    let label = null;
    React.Children.forEach(children, child => {
      if (!child) {
        return;
      }
      if (child.props.isSelectOptGroup && !label) {
        const maybe = this.getLabelToProps(child.props.children, value);
        if (maybe) {
          label = maybe;
        }
      } else if (child.props.value == value && !label) {
        let c = child.props.children;
        if (c.constructor === Array) {
          c = c.join('');
        }
        label = c;
      }
    })
    return label;
  }
  componentDidMount() {
    const value = this.state.value;
    const multiple = this.props.mode === 'multiple';
    const label = value.length ? value[0].label : '';
    if (multiple && this.props.isNull && this.props.children && this.props.children.length) {
      const newValue = value.length ? value.filter(v => !!v.label).map(v => v.value) : [];
      if (newValue.length !== value.length) {
        this.props.onChange(newValue);
      }
    } else {
      if (this.props.isNull && this.props.children && this.props.children.length && label === null && !multiple) {
        this.props.onChange(undefined);
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      let value = this.addLabelToValue(nextProps, toArray(nextProps.value));
      let selectedKeys = value.map(v => v.value);
      let inputValue = '';
      let combobox = nextProps.mode === 'combobox';
      let multiple = nextProps.mode === 'multiple';
      if (nextProps.showSearch && value.length) {
        inputValue = value.length > 0 ? (value[0].label || value[0].value) : '';
      }
      if (combobox) {
        if (nextProps.optionLabelProp === 'value') {
          inputValue = nextProps.value;
        } else {
          inputValue = this.getLabelToProps(nextProps.children, nextProps.value) || nextProps.value || ''
        }
      }
      if (multiple) {
        inputValue = '';
      }
      this.setState({
        value,
        selectedKeys,
        inputValue,
        hoverItem: undefined
      })
      if (multiple && nextProps.isNull && nextProps.children && nextProps.children.length) {
        const newValue = value.length ? value.filter(v => !!v.label).map(v => v.value) : [];
        if (newValue.length !== value.length) {
          this.props.onChange(newValue);
        }
      } else {
        const label = value.length ? value[0].label : '';
        if (nextProps.isNull && nextProps.children && nextProps.children.length && label === null && !multiple) {
          this.props.onChange(undefined);
        }
      }
    } else {
      this.setState({
        hoverItem: undefined
      })
    }
  }

  componentWillMount() {
    this.adjustOpenState();
  }

  adjustOpenState = () => {
    let open = this.state.open;
    let combobox = this.props.mode === 'combobox';
    let options = [];
    if (open) {
      options = this.renderFilterOptions(this.props.children);
    }

    this._options = options;
  }
  componentWillUpdate(nextProps, nextState) {
    this.props = nextProps;
    this.state = nextState;
    this.adjustOpenState();
  }
  componentWillUnMount() {
    this.clearOuterBlurTimer();
  }
  renderFilterOptions = (children) => {
    let sel = [];
    const { prefixCls } = this.props;
    const {inputValue, hoverItem} = this.state;
    React.Children.forEach(children, (child, index) => {
      if (!child) {
        return;
      }
      if (child.props.isSelectOptGroup) {
        const innerItems = this.renderFilterOptions(child.props.children);
        if (innerItems.length) {
          let label = child.props.label;
          let key = child.key;
          if (!key && typeof label === 'string') {
            key = label;
          } else if (!label && key) {
            label = key;
          }
          sel.push(<ItemGroup key={key} title={label}>{innerItems}</ItemGroup>)
        }
        return;
      }
      const childValue = child.props.value || child.props.key || '';
      const title = this.isString(child.props.children) ? child.props.children : (this.isArray(child.props.children) ? child.props.children.join(''): '');
      if (this.filterOption(inputValue, child)) {
        sel.push(<MenuItem title={title} value={childValue} key={childValue} className={hoverItem === childValue ? `${prefixCls}-dropdown-menu-item-hover` : ''} isHover={hoverItem === childValue}>
          <span className={`${prefixCls}-dropdown-menu-item-value`}>{child.props.children}</span>
          <span className={`${prefixCls}-dropdown-menu-item-alias`}>{child.props.alias}</span>
        </MenuItem>);
      }
    });
    return sel;
  }

  isString = children => {
    return toString.call(children) === '[object String]'
  }

  isArray = children => {
    return toString.call(children) === '[object Array]'
  }
  isObject = children => {
    return toString.call(children) === '[object Object]'
  }

  filterOption = (inputValue, child) => {
    if (!inputValue) {
      return true;
    }
    let filterFn = this.props.filterOption;
    if ('filterOption' in this.props) {
      if (typeof filterFn === 'function') {
        return filterFn.call(this, inputValue, child);
      }
    } else {
      return this.defaultFilterFn(inputValue, child);
    }
    return true;
  }

  defaultFilterFn = (inputValue, child) => {
    let combobox = this.props.mode === 'combobox';
    let c = child.props.children;
    if (c.constructor === Array) {
      c = c.join('');
    }
    return c.indexOf(inputValue) > -1 || child.props.value.indexOf(inputValue) > -1 || (child.props.alias && child.props.alias.indexOf(inputValue) > -1) || combobox;
  }

  onInputChange = (e) => {
    const value = e.target.value;
    let combobox = this.props.mode === 'combobox';
    let multiple = this.props.mode === 'multiple';
    this.setState({
      open: true,
      inputValue: value
    })
    if (combobox) {
      this.props.onChange(value.length ? value : undefined);
    }
    if (multiple) {
      let width = this.mirror ? (this.mirror.clientWidth + 10) : 20;
      width = width > this.topCtrlNode.clientWidth ? this.topCtrlNode.clientWidth : width;
      this.inputNode.style.width = width + 'px';
    }
    this.props.onSearch(value);
  }

  onInputFocus = e => {
    this.clearOuterBlurTimer();
    let { showSearch, mode } = this.props;
    let combobox = mode === 'combobox';
    if (showSearch && !combobox) {
      this.setState({
        inputValue: ''
      })
    }
  }

  clearOuterBlurTimer = () => {
    if (this.outerBlurTimer) {
      clearTimeout(this.outerBlurTimer);
      this.outerBlurTimer = null;
    }
  }

  onBlur = () => {
    let { showSearch, mode } = this.props;
    let { value, inputValue } = this.state;
    let combobox = mode === 'combobox';
    let multiple = mode === 'multiple';
    this.setState({
      open: false
    })
    this._blur = false;
    if (showSearch && !multiple && !combobox) {
      if (value.length) {
        this.setState({
          inputValue: value[0].label || value[0].value
        })
      } else {
        this.setState({
          inputValue: ''
        })
      }
    }
    if (multiple) {
      this.inputNode.style.width = '10px';
    }
    if ('onBlur' in this.props) {
      this.props.onBlur(inputValue);
    }
  }

  clearTimeoutFocus = () => {
    if (this.focusTimer) {
      clearTimeout(this.focusTimer);
    }
  }
  setTimeoutFocus = () => {
    this.clearTimeoutFocus();
    this.focusTimer = setTimeout(() => {
      this.inputNode.focus();
    }, 10);
  }

  onOuterFocus = () => {
    this.clearOuterBlurTimer();
    // this.setState({
    //   open: true
    // })
    this.inputNode && (this.setTimeoutFocus());
    this.onInputFocus();
  }

  onOuterBlur = () => {
    if (!this.outerBlurTimer) {
      this.outerBlurTimer = setTimeout(() => this.onBlur(), 200);
    }
  }

  getPlaceholderElement() {
    const { inputValue, value } = this.state;
    let hidden = false;
    if (inputValue || value.length) {
      hidden = true;
    }
    const placeholder = this.props.placeholder;
    if (placeholder) {
      return (
        <div
          className={`${prefixCls}-selection-placeholder`}
          style={{
            display: hidden ? 'none' : 'block',
            ...UNSELECTABLE_STYLE
          }}
        >
          {placeholder}
        </div>
      )
    }
    return null;
  }

  saveInputRef = node => this.inputNode = node;
  saveMirrorRef = mirror => this.mirror = mirror;
  saveTopCtrlNodeRef = topCtrlNode => this.topCtrlNode = topCtrlNode;
  saveRootRef = root => this.root = root;
  saveSelectionRef = selection => this.selection = selection;
  saveChoiceListRef = choiceList => this.choiceList = choiceList;

  getInputElement() {
    let { inputValue } = this.state;
    return (
      <div className={`${prefixCls}-search-field-wrap`}>
        <input
          ref={this.saveInputRef}
          className={`${prefixCls}-search-field`}
          value={inputValue || ''}
          onChange={this.onInputChange}
          disabled={this.props.disabled}
          onFocus={this.onInputFocus}
        />
        <span ref={this.saveMirrorRef} className={`${prefixCls}-search-mirror`}>{inputValue || ''}</span>
      </div>
    )
  }
  getShowValue = (value = []) => {
    let overflowTip = null;
    let showValue = [];
    if (this.choiceList) {
      let width = this.choiceList.clientWidth;
      const ulNode = document.createElement('ul');
      ulNode.style.visibility = 'hidden';
      const liNode = document.createElement('li');
      liNode.className = `${prefixCls}-selection-choice`;
      const divNode = document.createElement('div');
      divNode.className = `${prefixCls}-selection-choice-content`;
      value.forEach((item, index) => {
        let cloneLi = liNode.cloneNode(liNode);
        let cloneDiv = divNode.cloneNode(divNode);
        cloneDiv.textContent = item.label || item.value;
        cloneLi.appendChild(cloneDiv);
        document.body.appendChild(cloneLi);
        let liNodewidth = global.getComputedStyle(cloneLi).width.replace('px', '');
        document.body.removeChild(cloneLi);  // 需要将镜像DOM进行移除
        width -= (liNodewidth + 4);
        // console.log('ellipsis', width, liNodewidth, item);
        if (width > 24 && value[index]) {
          showValue.push(value[index]);
        }
      });
    } else {
      showValue = value.slice();
    }
    return showValue;
  }

  renderTopControlNode() {
    let { value, open, inputValue } = this.state;
    const props = this.props;
    const { showSearch, overflow } = props;
    const className = `${prefixCls}-selection-rendered`;
    let innerNode = null;
    let selectedValue = null;
    let title = null;
    let multiple = props.mode === 'multiple';
    if (value.length) {
      let showSelectedValue = false;
      let opacity = 1;
      if (!showSearch) {
        showSelectedValue = true;
      } else {
        if (open) {
          showSelectedValue = !inputValue; // 此时未输入
          if (showSelectedValue) {
            opacity = 0.4;
          }
        } else {
          showSelectedValue = false;
        }
      }
      selectedValue = (
        <div key='value'
          className={`${prefixCls}-selection-selected-value`}
          style={{
            opacity,
            display: showSelectedValue ? 'block' : 'none'
          }}
        >
          {
            value.length > 0 ? (value[0].label || value[0].value) : ''
          }
        </div>
      )
    }
    if (multiple) {
      const showValue = ['ellipsis', 'clip'].indexOf(overflow) > -1 ? this.getShowValue(value) : value.slice();
      selectedValue = (
        <ul key='ul' className={`${prefixCls}-selection-choice-list`} ref={this.saveChoiceListRef}>
          {
            showValue.length ? showValue.map((item, index) => {
              return (
                <li key={index} className={`${prefixCls}-selection-choice`}>
                  <div className={`${prefixCls}-selection-choice-content`}>{item.label || item.value}</div>
                  <span className={`${prefixCls}-selection-choice-remove`} onClick={e => this.removeChoice(index, e)}>
                    <Icon type="cross" />
                  </span>
                </li>
              )
            }) : null
          }
          {showValue.length < value.length &&
            (overflow === 'ellipsis' ?
              <span>...</span> : null
            )
          }
          <li key='input' className={`${prefixCls}-search-inline`}> 
            {this.getInputElement()}
          </li>
        </ul>
      )
    }
    if (!multiple) {
      if (!showSearch) {
        innerNode = [selectedValue];
      } else {
        innerNode = [selectedValue, <div className={`${prefixCls}-search`} key='input'>
          {this.getInputElement()}
        </div>];
      }
      if (value.length) {
        title = value[0].label;
      }
    } else {
      innerNode = [selectedValue];
      if (value.length) {
        title = value.map(v => v.label).join('，');
      }
    }

    return (
      <div
        ref={this.saveTopCtrlNodeRef}
        className={className}
        title={title}
      >
        {this.getPlaceholderElement()}
        {innerNode}
      </div>
    )
  }
  removeChoice = (index, e) => {
    // e.nativeEvent.stopImmediatePropagation();
    this.clearTimeoutFocus();
    const { disabled } = this.props;
    if (!disabled) {
      let { value, selectedKeys } = this.state;
      let newValue = [...value];
      newValue.splice(index, 1);
      selectedKeys = newValue.map(i => i.value) || [];
      if (!('value' in this.props)) {
        this.setState({value: newValue, selectedKeys,});
      }
      if ('onChange' in this.props) {
        this.props.onChange(selectedKeys);
      }
    }
  }
  onDropdownVisibleChange = open => {
    let currentOpen = this.state.open;
    let { showSearch, mode } = this.props;
    let multiple = mode === 'multiple';
    let combobox = mode === 'combobox';
    if (!currentOpen && open) {
      this.setState({
        open: true
      })
      if ((showSearch && !combobox) || multiple) {
        this.setState({
          inputValue: ''
        })
      }
    } else if (currentOpen && !open) {
      if (this.inputNode) {
        if (multiple) {
          this.setState({
            inputValue: ''
          })
        }
      } else {
        this.setState({
          open: false
        })
      }
    }
  }
  onPage = () => {
    this.clearOuterBlurTimer();
    this.inputNode && this.inputNode.focus();
  }
  onMenuSelect = (selectedKeys) => {
    this.clearOuterBlurTimer();
    let { showSearch, mode } = this.props;
    let { value, hoverItem } = this.state;
    let multiple = mode === 'multiple';
    let combobox = mode === 'combobox';
    if (!multiple && !selectedKeys.length) {
      this.clearOuterBlurTimer();
      this.setState({
        open: false,
        inputValue: showSearch && value.length > 0 ? value[0].label : '',
        hoverItem: multiple ? hoverItem : undefined
      })
      return;
    };
    if (!('value' in this.props)) {
      value = this.addLabelToValue(this.props, selectedKeys);
      this.setState({
        selectedKeys,
        value,
        hoverItem: multiple ? hoverItem : undefined
      });
    }
    if (!multiple) {
      this.clearOuterBlurTimer();
      this.setState({
        open: false
      })
      if (showSearch && !combobox) {
        this.setState({
          inputValue: value.length > 0 ? value[0].label : ''
        })
      }
    } else {
      this.setState({
        inputValue: '',
        open: true,
        hoverItem: multiple ? hoverItem : undefined
      })
      this.inputNode && this.inputNode.focus();
    }
    if (multiple) {
      this.props.onChange(selectedKeys);
      this.props.onSelect(selectedKeys);
    } else {
      this.props.onChange(selectedKeys.join(','));
      this.props.onSelect(selectedKeys.join(','));
    }
  }
  handleClear = e => {
    e.nativeEvent.stopImmediatePropagation();
    e.stopPropagation();
    const props = this.props;
    const state = this.state;
    const { value, inputValue } = state;
    if (value || inputValue) {
      if (value.length) {
        if (!('value' in this.props)) {
          this.setState({
            value: []
          });
        }
        if (props.mode === 'multiple') {
          props.onChange([]);
        } else {
          props.onChange(undefined);
        }
      }
      if (inputValue) {
        this.setState({
          inputValue: ''
        })
        props.onSearch(undefined);
      }
      this.setState({
        open: false
      })
    }
  }
  renderMain = locale => {
    const props = this.props;
    const { open, inputValue, selectedKeys, value } = this.state;
    const { allowClear, disabled, className, style, showArrow, mode, size, prefixCls, showSearch, isPage, pagination } = props;
    const combobox = mode === 'combobox';
    const multiple = mode === 'multiple';

    const clearStyle = {
      display: 'none',
      ...UNSELECTABLE_STYLE
    };
    if (value.length || inputValue) {
      clearStyle.display = 'block';
    };
    const clear = (<span key='clear' className={`${prefixCls}-selection-clear`} style={clearStyle} onMouseDown={preventDefaultEvent} onClick={this.handleClear}></span>);
    const rootCls = {
      [`${prefixCls}-open`]: open,
      [`${prefixCls}-focused`]: open,
      [`${prefixCls}-combobox`]: combobox,
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-enabled`]: !disabled,
      [`${prefixCls}-allow-clear`]: allowClear
    };
    const ctrlNode = this.renderTopControlNode();
    let options = this._options;
    if (!options.length && !combobox) {
      options = [<MenuItem disabled value='NOT_FOUND' key='NOT_FOUND'>{this.props.notFoundContent || locale.notFoundContent}</MenuItem>]
    }
    let otherProps = {};
    if (multiple || combobox || showSearch) {
      otherProps = {
        tabIndex: 0
      }
    }

    let isPageObj = {};
    if (this.isObject(pagination)) {
      isPageObj = {
        ...pagination,
        visibleCount: pagination.pageSize || pagination.visibleCount || pagination.defaultPageSize  || 10,
      };
    } else if (pagination) {
      isPageObj = {
        visibleCount: 10,
      };
    } else if (isPage) {
      isPageObj = isPage;
    } else if (options && options.length > 1000) {
      isPageObj = { visibleCount: 100 };
    }
    return (
      <SelectTrigger
        ref={trigger => this.trigger = trigger}
        dropdownStyle={props.dropdownStyle}
        dropdownClassName={props.dropdownClassName}
        inputValue={inputValue}
        visible={open}
        dropdownMatchSelectWidth={props.dropdownMatchSelectWidth}
        defaultActiveFirstOption={props.defaultActiveFirstOption}
        options={options}
        getPopupContainer={props.getPopupContainer}
        prefixCls={prefixCls}
        onMenuSelect={this.onMenuSelect}
        selectedKeys={selectedKeys}
        multiple={multiple}
        combobox={combobox}
        disabled={disabled}
        onDropdownVisibleChange={this.onDropdownVisibleChange}
        isPage={isPageObj}
        onPage={this.onPage}
        popupElementWidth={this.root && this.root.offsetWidth || 0}
        selectComponent={this}
      >
        <div ref={this.saveRootRef}
          style={style}
          className={cn(className, prefixCls, rootCls)}
          onFocus={!props.disabled && this.onOuterFocus}
          onBlur={!props.disabled && this.onOuterBlur}
          tabIndex="0"
        >
          <div ref={this.saveSelectionRef}
            className={cn(`${prefixCls}-selection`, {[`${prefixCls}-selection-multiple`]: multiple, [`${prefixCls}-selection-sm`]: size === 'small', [`${prefixCls}-selection-lg`]: size === 'large'})}
            role="combobox"
            aria-haspopup="true"
            aria-expanded={open}
            {...otherProps}
          >
            {ctrlNode}
            {
              (allowClear && !disabled) ? clear : null
            }
            {
              !showArrow ? null : <span key='arrow' style={UNSELECTABLE_STYLE} className={`${prefixCls}-arrow`} onClick={this.onArrowClick}></span>
            }
          </div>
        </div>
      </SelectTrigger>
    )
  }

  render() {
    return <LocaleReceiver componentName="Select">
      {this.renderMain}
    </LocaleReceiver>
  }
}
