import React, { Component, cloneElement } from 'react';
import Trigger from 'rc-trigger';
import KeyCode from '../util/keyCode';
import arrayTreeFilter from 'array-tree-filter';
import shallowEqualArrays from 'shallow-equal/arrays';
import Menus from './menus';

const BUILT_IN_PLACEMENTS = {
  bottomLeft: {
    points: ['tl', 'bl'],
    offset: [0, 4],
    overflow: {
      adjustX: 1,
      adjustY: 1
    }
  },
  topLeft: {
    points: ['bl', 'tl'],
    offset: [0, -4],
    overflow: {
      adjustX: 1,
      adjustY: 1
    }
  },
  bottomRight: {
    points: ['tr', 'br'],
    offset: [0, 4],
    overflow: {
      adjustX: 1,
      adjustY: 1
    }
  },
  topRight: {
    points: ['br', 'tr'],
    offset: [0, -4],
    overflow: {
      adjustX: 1,
      adjustY: 1
    }
  }
};

export default class CascaderTrigger extends Component {
  static defaultProps = {
    options: [],
    onChange() {},
    onPopupVisibleChange() {},
    disabled: false,
    transitionName: '',
    prefixCls: 'rc-cascader',
    popupClassName: '',
    popupPlacement: 'bottomLeft',
    builtinPlacements: BUILT_IN_PLACEMENTS
  };

  constructor(props) {
    super(props);
    let initialValue = [];
    if ('value' in props) {
      initialValue = props.value || [];
    } else if ('defaultValue' in props) {
      initialValue = props.defaultValue || [];
    }

    this.state = {
      popupVisible: props.popupVisible,
      activeValue: initialValue,
      value: initialValue
    };
  }
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps && !shallowEqualArrays(this.props.value, nextProps.value)) {
      const newValues = {
        value: nextProps.value || [],
        activeValue: nextProps.value || []
      };
      if ('loadData' in nextProps) {
        delete newValues.activeValue;
      }
      this.setState(newValues);
    }
    if ('popupVisible' in nextProps) {
      this.setState({
        popupVisible: nextProps.popupVisible
      });
    }
  }
  getPopupDOMNode() {
    return this.trigger.getPopupDomNode();
  }
  getCurrentLevelOptions() {
    const { options } = this.props;
    const { activeValue = [] } = this.state;
    const result = arrayTreeFilter(options, (o, level) => o.value === activeValue[level]);
    if (result[result.length - 2]) {
      return result[result.length - 2].children;
    }
    return [...options].filter(o => !o.disabled);
  }
  getActiveOptions(activeValue) {
    return arrayTreeFilter(this.props.options, (o, level) => o.value === activeValue[level]);
  }
  setPopupVisible = (popupVisible) => {
    if (!('popupVisible' in this.props)) {
      this.setState({ popupVisible });
    }
    if (popupVisible && !this.state.visible) {
      this.setState({
        activeValue: this.state.value
      });
    }
    this.props.onPopupVisibleChange(popupVisible);
  }
  handleChange = (options, setProps, e) => {
    if (e.type !== 'keydown' || e.keyCode === KeyCode.ENTER) {
      this.props.onChange(options.map(o => o.value), options);
      this.setPopupVisible(setProps.visible);
    }
  }
  handlePopupVisibleChange = (popupVisible) => {
    this.setPopupVisible(popupVisible);
  }
  handleMenuSelect = (targetOption, menuIndex, e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    const triggerNode = this.trigger.getRootDomNode();
    if (triggerNode && triggerNode.focus) {
      triggerNode.focus();
    }
    const { changeOnSelect, loadData } = this.props;
    if (!targetOption || targetOption.disabled) {
      return;
    }
    let { activeValue } = this.state;
    activeValue = activeValue.slice(0, menuIndex + 1);
    activeValue[menuIndex] = targetOption.value;
    const activeOptions = this.getActiveOptions(activeValue);
    if (targetOption.isLeaf === false && !targetOption.children && loadData) {
      if (changeOnSelect) {
        this.handleChange(activeOptions, { visible: true }, e);
      }
      this.setState({ activeValue });
      loadData(activeOptions);
      return;
    }
    if (targetOption.__IS_FILTERED_OPTION) {
      const optionPath = targetOption.path;
      if (optionPath && (optionPath[optionPath.length - 1].isLeaf === false)) {
        let data = optionPath[optionPath.length - 1];
        data.loading = false;
        loadData([data]);
        return;
      }
    }
    const newState = {};
    if (!targetOption.children || !targetOption.children.length) {
      this.handleChange(activeOptions, { visible: false }, e);
      newState.value = activeValue;
    } else if (changeOnSelect) {
      this.handleChange(activeOptions, { visible: true }, e);
      newState.value = activeValue;
    }
    newState.activeValue = activeValue;
    if ('value' in this.props ||
        (e.type === 'keydown' && e.keyCode !== KeyCode.ENTER)) {
      delete newState.value;
    }
    this.setState(newState);
  }
  handleKeyDown = (e) => {
    const { children } = this.props;
    if (children && children.props.onKeyDown) {
      children.props.onKeyDown(e);
      return;
    }
    const activeValue = [...this.state.activeValue];
    const currentLevel = activeValue.length - 1 < 0 ? 0 : activeValue.length - 1;
    const currentOptions = this.getCurrentLevelOptions();
    const currentIndex = currentOptions.map(o => o.value).indexOf(activeValue[currentLevel]);
    if (e.keyCode !== KeyCode.DOWN &&
        e.keyCode !== KeyCode.UP &&
        e.keyCode !== KeyCode.ENTER &&
        e.keyCode !== KeyCode.BACKSPACE &&
        e.keyCode !== KeyCode.ESC) {
      return;
    }
    if (!this.state.popupVisible &&
        e.keyCode !== KeyCode.BACKSPACE &&
        e.keyCode !== KeyCode.ESC) {
      this.setPopupVisible(true);
      return;
    }
    if (e.keyCode === KeyCode.DOWN || e.keyCode === KeyCode.UP) {
      let nextIndex = currentIndex;
      if (nextIndex !== -1) {
        if (e.keyCode === KeyCode.DOWN) {
          nextIndex += 1;
          nextIndex = nextIndex >= currentOptions.length ? 0 : nextIndex;
        } else {
          nextIndex -= 1;
          nextIndex = nextIndex < 0 ? currentOptions.length - 1 : nextIndex;
        }
      } else {
        nextIndex = 0;
      }
      activeValue[currentLevel] = currentOptions[nextIndex].value;
    } else if (e.keyCode === KeyCode.ESC) {
      this.setPopupVisible(false);
      return;
    }
    if (!activeValue || activeValue.length === 0) {
      this.setPopupVisible(false);
    }
    const activeOptions = this.getActiveOptions(activeValue);
    const targetOption = activeOptions[activeOptions.length - 1];
    this.handleMenuSelect(targetOption, activeOptions.length - 1, e);

    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }
  }

  saveTriggerRef = trigger => this.trigger = trigger;
  
  render() {
    const {
      prefixCls, transitionName, popupClassName, options, disabled,
      builtinPlacements, popupPlacement, children, ...restProps
    } = this.props;
    let menus = <div />;
    let emptyMenuClassName = '';
    if (options && options.length > 0) {
      let isPage = '';
      if (this.props.isPage) {
        isPage = this.props.isPage;
      } else if (options.length > 1000) {
        isPage = {visibleCount: 100}
      }
      menus = (
        <Menus
          {...this.props}
          value={this.state.value}
          activeValue={this.state.activeValue}
          onSelect={this.handleMenuSelect}
          visible={this.state.popupVisible}
          isPage={isPage}
        />
      );
    } else {
      emptyMenuClassName = ` ${prefixCls}-menus-empty`;
    }
    return (
      <Trigger
        ref={this.saveTriggerRef}
        {...restProps}
        options={options}
        disabled={disabled}
        popupPlacement={popupPlacement}
        builtinPlacements={builtinPlacements}
        popupTransitionName={transitionName}
        action={disabled ? [] : ['click']}
        popupVisible={disabled ? false : this.state.popupVisible}
        onPopupVisibleChange={this.handlePopupVisibleChange}
        prefixCls={`${prefixCls}-menus`}
        popupClassName={popupClassName + emptyMenuClassName}
        popup={menus}
      >
        {cloneElement(children, {
          onKeyDown: this.handleKeyDown,
          tabIndex: 0
        })}
      </Trigger>
    );
  }
}
