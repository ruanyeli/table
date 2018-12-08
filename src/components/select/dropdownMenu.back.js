import React, { Component, cloneElement } from 'react';
import { findDOMNode } from 'react-dom';
import _findIndex from 'lodash/findIndex';
import { ItemGroup } from '../menu';
import cn from 'classnames';
import Menu from '../menu';
import scrollIntoView from 'dom-scroll-into-view';
import { LocaleReceiver } from "../locale-provider";

function toArray(children) {
  const ret = [];
  React.Children.forEach(children, (c) => {
    ret.push(c);
  });
  return ret;
}

export default class DropdownMenu extends Component {
  constructor(props) {
    super(props);
    const { arr, start, end } = this.setMenuItems(props);
    this.state = {
      menuItems: arr,
      start,
      end,
      preSelectItem: undefined
    }
  }
  setMenuItems = props => {
    const { isPage, menuItems, selectedKeys, multiple } = props;
    let visibleCount;
    let selectedIndex = -1;
    let arr = [];
    let start = 0;
    let end = menuItems.length;
    if (isPage && !multiple) {
      visibleCount = isPage.visibleCount || 10;
      if (menuItems.length > visibleCount) {
        selectedIndex = _findIndex(menuItems, item => item.key === selectedKeys[0]);
        if (selectedIndex < 0) {
          arr = menuItems.slice(0, visibleCount);
          start = 0;
          end = visibleCount;
        } else {
          if (selectedIndex + visibleCount > menuItems.length) {
            arr = menuItems.slice(menuItems.length - visibleCount, menuItems.length);
            end = menuItems.length;
            start = menuItems.length - visibleCount;
          } else {
            arr = menuItems.slice(selectedIndex, selectedIndex + visibleCount);
            end = selectedIndex + visibleCount;
            start = selectedIndex;
          }
        }
      } else {
        arr = [...menuItems];
      }
    } else {
      arr = [...menuItems];
    }
    return {arr, start, end};
  }
  componentWillMount() {
    this.lastInputValue = this.props.inputValue;
  }

  keydownHandle = e => {
    const { preSelectItem, menuItems } = this.state;
    // 38 up, 40 down
    if (e.keyCode == 38 || e.keyCode == 40) {
      let preSelectItemIndex;
      const selectItems = [];
      menuItems.forEach(item => {
        if (item.type === ItemGroup) {
          toArray(item.props.children).forEach(_item => {
            selectItems.push(_item);
          })
        } else {
          selectItems.push(item);
        }
      })
      if (selectItems.length) {
        if (preSelectItem === undefined) {
          if (e.keyCode == 38) {
            preSelectItemIndex = selectItems.length - 1
          } else {
            preSelectItemIndex = 0;
          }
        } else {
          const index = _findIndex(selectItems, i => i.key === preSelectItem);
          if (e.keyCode == 38) {
            if (index <= 0) {
              preSelectItemIndex = selectItems.length - 1;
            } else {
              preSelectItemIndex = index - 1;
            }
          } else {
            if (index < 0 || index === selectItems.length - 1) {
              preSelectItemIndex = 0;
            } else {
              preSelectItemIndex = index + 1;
            }
          }
        }
        this.setState({
          preSelectItem: selectItems[preSelectItemIndex].key
        })
      }
    } else if (e.keyCode === 13) { // enter
      if (preSelectItem) {
        let { multiple, selectedKeys, selectComponent } = this.props;
        if (multiple) {
          if (selectedKeys.indexOf(preSelectItem) === -1) {
            selectedKeys.push(preSelectItem);
          }
        } else {
          selectedKeys = [preSelectItem]
        }
        this.props.onMenuSelect(selectedKeys);
        if (!multiple) {
          selectComponent.onBlur();
          if (selectComponent.props.showSearch) {
            selectComponent.inputNode.blur();
          }
          this.setState({
            preSelectItem: undefined
          })
        }
      }
    }
  }

  componentDidMount() {
    this.scrollActiveItemtoView();
    this.lastVisible = this.props.visible;
    this.props.selectComponent.root.addEventListener('keydown', this.keydownHandle);
  }
  componentWillReceiveProps(nextProps) {
    if (
      !nextProps.multiple && !nextProps.combobox &&
      (nextProps.visible && nextProps.visible !== this.props.visible) ||
      (nextProps.visible && nextProps.visible === this.props.visible && nextProps.inputValue !== this.props.inputValue)
    ) {
      const { arr, start, end } = this.setMenuItems(nextProps);
      this.setState({menuItems: arr, start, end});
    } else if ((nextProps.multiple || nextProps.combobox) && nextProps.visible) {
      this.setState({
        menuItems: nextProps.menuItems
      })
    }
  }
  shouldComponentUpdate(nextProps) {
    if (!nextProps.visible) {
      this.lastVisible = false;
    }
    return nextProps.visible;
  }
  componentDidUpdate(prevProps) {
    const props = this.props;
    if (!prevProps.visible && props.visible || (props.visible && this.hoverActiveItem)) {
      this.scrollActiveItemtoView();
    }
    this.lastVisible = props.visible;
    this.lastInputValue = props.inputValue;
  }
  scrollActiveItemtoView = () => {
    const itemComponent = findDOMNode(this.hoverActiveItem || this.firstActiveItem);
    if (itemComponent) {
      scrollIntoView(itemComponent, findDOMNode(this.menuDom), {
        onlyScrollIfNeeded: true
      });
    }
  }
  
  saveHoverActiveItemRef = ref => this.hoverActiveItem = ref;
  saveFirstActiveItemRef = ref => this.firstActiveItem = ref;

  renderMenu() {
    const props = this.props;
    let { prefixCls, onMenuSelect, selectedKeys, multiple } = props;
    let { menuItems, preSelectItem } = this.state;
    if (menuItems && menuItems.length) {
      const menuProps = {};
      menuProps.onSelect = onMenuSelect;
      let cloneMenuItems = menuItems;
      const activeKeyProps = {};
      if (selectedKeys.length || preSelectItem) {
        if (props.visible && !this.lastVisible) {
          activeKeyProps.activeKey = selectedKeys[0];
        }
        let foundFirst = false, fondHover = false;
        const clone = (item, index) => {
          if (!fondHover && preSelectItem === item.key) {
            fondHover = true;
            return cloneElement(item, {
              className: `${item.className} ${prefixCls}-menu-item-hover`,
              ref: this.saveHoverActiveItemRef
            })
          } else {
            if (!foundFirst && selectedKeys.indexOf(item.key) !== -1) {
              foundFirst = true;
              return cloneElement(item, {
                ref: this.saveFirstActiveItemRef
              })
            }
          }
          return item;
        }
        cloneMenuItems = menuItems.map(item => {
          if (item.type == ItemGroup) {
            const children = toArray(item.props.children).map(clone);
            return cloneElement(item, {}, children);
          }
          return clone(item);
        })
      }
      return (
        <Menu {...menuProps} multiple={multiple} ref={this.saveMenuRef} selectedKeys={selectedKeys} prefixCls={`${prefixCls}-menu`}>{cloneMenuItems}</Menu>
      )
    }
    return null;
  }

  saveMenuRef = menuDom => {
    this.menuDom = menuDom;
  }
  onPrev = () => {
    this.props.onPage();
    const { isPage, menuItems } = this.props;
    let { start, end } = this.state;
    let arr = [];
    const visibleCount = isPage.visibleCount || 10;
    start = (start - visibleCount) < 0 ? 0 : (start - visibleCount);
    end = (start + visibleCount) > menuItems.length ? menuItems.length : (start + visibleCount);
    arr = menuItems.slice(start, end);
    this.setState({
      menuItems: arr,
      start,
      end
    })
  }
  onNext = () => {
    this.props.onPage();
    const { isPage, menuItems } = this.props;
    let { start, end } = this.state;
    let arr = [];
    const visibleCount = isPage.visibleCount || 10;
    start = start + visibleCount;
    end = (end + visibleCount) > menuItems.length ? menuItems.length : (end + visibleCount);
    arr = menuItems.slice(start, end);
    this.setState({
      menuItems: arr,
      start,
      end
    })
  }
  renderMain = locale => {
    const renderMenu = this.renderMenu();
    const { isPage, menuItems, prefixCls } = this.props;
    const { start, end } = this.state;
    const classnames = cn({
      [`${prefixCls}-page-prev`]: isPage && start !== 0,
      [`${prefixCls}-page-next`]: isPage && end !== menuItems.length
    })
    return renderMenu ? (
      <div style={{overflow: 'auto'}} className={classnames}>
        {
          isPage && start !== 0 ? <div className='prev' onClick={this.onPrev}>{locale.prev}</div> : null
        }
        {renderMenu}
        {
          isPage && end !== menuItems.length ? <div className='next' onClick={this.onNext}>{locale.next}</div> : null
        }
      </div>
    ) : null
  }

  render() {
    return <LocaleReceiver componentName="Select">
      {this.renderMain}
    </LocaleReceiver>
  }
}

DropdownMenu.displayName = 'DropdownMenu';
