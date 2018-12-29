import Trigger from 'rc-trigger';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';
import cn from 'classnames';
import DropdownMenu from './dropdownMenu';

const BUILT_IN_PLACEMENTS = {
  bottomLeft: {
    points: ['tl', 'bl'],
    offset: [0, 4],
    overflow: {
      adjustX: 0,
      adjustY: 1
    }
  },
  topLeft: {
    points: ['bl', 'tl'],
    offset: [0, -4],
    overflow: {
      adjustX: 0,
      adjustY: 1
    }
  }
}

export default class SelectTrigger extends Component {
  getDropdownElement = newProps => {
    const props = this.props;
    return (
      <DropdownMenu
        {...newProps}
        prefixCls={this.getDropdownPrefixCls()}
        onMenuSelect={props.onMenuSelect}
        defaultActiveFirstOption={props.defaultActiveFirstOption}
        dropdownMenuStyle={props.dropdownMenuStyle}
        selectedKeys={props.selectedKeys}
        multiple={props.multiple}
        combobox={props.combobox}
        onPage={props.onPage}
      />
    )
  }
  getDropdownPrefixCls = () => {
    return `${this.props.prefixCls}-dropdown`;
  }

  getPopupDOMNode = () => {
    return this.trigger.getPopupDomNode();
  }

  saveTriggerRef = trigger => this.trigger = trigger;
  
  render() {
    const props = this.props;
    const { visible, inputValue, options, onPopupFocus, disabled, dropdownClassName, multiple, onDropdownVisibleChange, isPage, dropdownStyle, dropdownMatchSelectWidth, popupElementWidth, selectComponent } = props;
    const popupElement = this.getDropdownElement({
      multiple,
      inputValue,
      visible,
      menuItems: options,
      onPopupFocus,
      isPage,
      selectComponent
    });
    const dropdownPrefixCls = this.getDropdownPrefixCls();
    const popupClassName = {
      [dropdownClassName]: !!dropdownClassName,
      [`${dropdownPrefixCls}-${multiple ? 'multiple' : 'single'}`]: true
    }
    let hideAction;
    if (disabled) {
      hideAction = [];
    } else {
      hideAction = ['click'];
    }

    const popupStyle = { ...dropdownStyle };
    if (!('width' in popupStyle)) {
      const widthProp = dropdownMatchSelectWidth ? 'width' : 'minWidth';
      popupStyle[widthProp] = `${popupElementWidth}px`;
    }

    return (
      <Trigger ref={this.saveTriggerRef}
         popupPlacement='bottomLeft'
         popupStyle={popupStyle}
         popup={popupElement}
         popupVisible={visible}
         getPopupContainer={props.getPopupContainer}
         prefixCls={dropdownPrefixCls}
         popupClassName={cn(popupClassName)}
         builtinPlacements={BUILT_IN_PLACEMENTS}
         showAction={disabled ? [] : ['click']}
         hideAction={hideAction}
         onPopupVisibleChange={onDropdownVisibleChange}
         popupTransitionName='slide-up'
      >
        {props.children}
      </Trigger>
    )
  }
}
