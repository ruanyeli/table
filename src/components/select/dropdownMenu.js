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
    const { isPage } = props;
    this.state = {
      preSelectItem: undefined,
      total: props.isPage.total || props.menuItems.length || 0,
      current: isPage.defaultCurrent || isPage.current || 1,
    };
    const { arr, start, end } = this.setMenuItems(props);
    // console.log('props', props);
    this.state = {
      ...this.state,
      menuItems: arr,
      start,
      end,
      
    }
  }
  setMenuItems = props => {
    const { isPage = {}, menuItems, selectedKeys, multiple } = props;
    // const { defaultCurrent } = isPage;
    // const { current } = this.state;
    let current = isPage.current || this.state.current || 1;
    let visibleCount;
    let selectedIndex = -1;
    let arr = [];
    let start = 0;
    let end = menuItems.length;
    const total = isPage.total || menuItems.length;
    // console.log('if', isPage)
    if (isPage.visibleCount && !multiple) { // 分页 && 非多选
      visibleCount = isPage.visibleCount || 10;
      if (!current || current <= 0) { // 未设置 页面
        if (menuItems.length > visibleCount) {
          selectedIndex = _findIndex(menuItems, item => item.key === selectedKeys[0]);
          if (selectedIndex < 0) { // 未找到 选中项目
            arr = menuItems.slice(0, visibleCount);
            start = 0;
            end = visibleCount;
            current = 1;
          } else { // 找到选中的第一个项目 跳转到对应位置
            if (selectedIndex + visibleCount > menuItems.length) {
              arr = menuItems.slice(menuItems.length - visibleCount, menuItems.length);
              end = menuItems.length;
              start = menuItems.length - visibleCount;
              current = Math.floor(end / visibleCount);
            } else {
              arr = menuItems.slice(selectedIndex, selectedIndex + visibleCount);
              end = selectedIndex + visibleCount;
              start = selectedIndex;
              current = Math.ceil(selectedIndex / visibleCount);
            }
          }
        } else {
          arr = [...menuItems];
        }
      } else { // 控制页面
        // current
        if (current * visibleCount <= total) { // 未超出总数上限, 正常情况
          start = (current - 1) * visibleCount;
          end = current * visibleCount;
        } else { // current 异常设置 ， 超出上限
          current = 1;
          start = 0;
          end = visibleCount;
        }
      }
    } else { // 多选 或者 未分页
      arr = [...menuItems];
    }
    // console.log('setMenuItems', {arr, start, end, total, current});
    
    return {arr, start, end, total, current};
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
    // console.log('nextProps', nextProps);
    if (
      !nextProps.multiple && !nextProps.combobox &&
      (nextProps.visible && nextProps.visible !== this.props.visible) ||
      (nextProps.visible && nextProps.visible === this.props.visible && nextProps.inputValue !== this.props.inputValue)
    ) {
      const { arr, start, end, total, current } = this.setMenuItems(nextProps);
      // console.log('componentWillReceiveProps setMenuItems', arr, start, end, total);
      
      this.setState({menuItems: arr, start, end, total, current});
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
    let { prefixCls, onMenuSelect, selectedKeys, multiple, isPage } = props;
    let { preSelectItem, start, end } = this.state;
    let  menuItems = props.menuItems || [];
    if (isPage.visibleCount) { // 有分页
      menuItems = menuItems.slice(start, end).length > 0 ? menuItems.slice(start, end) : menuItems;
    }
    // console.log('menuItems renderMenu', start, end, menuItems, props.menuItems);

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
    // const { isPage, menuItems } = this.props;
    const { isPage } = this.props;
    const { pageSize } = isPage;
    let { start, end, total } = this.state;
    let arr = [];
    const visibleCount = isPage.visibleCount || 10;
    start = (start - visibleCount) < 0 ? 0 : (start - visibleCount);
    end = (start + visibleCount) > total ? total : (start + visibleCount);
    // arr = menuItems.slice(start, end);
    if (this.props.isPage && this.props.isPage.onChange) {
      // console.log( 'onPrev',start, end, visibleCount);
      this.props.isPage.onChange(Math.floor(end / visibleCount), visibleCount)
    }
    this.setState({
      // menuItems: arr,
      start,
      end
    })
  }
  onNext = () => {
    this.props.onPage();
    // const { isPage, menuItems } = this.props;
    const { isPage } = this.props;
    let { start, end, total } = this.state;
    let arr = [];
    const visibleCount = isPage.visibleCount || 10;
    start = start + visibleCount;
    end = (end + visibleCount) > total ? total : (end + visibleCount);
    // arr = menuItems.slice(start, end);
    if (this.props.isPage && this.props.isPage.onChange) {
      // console.log( 'onNext',start, end, visibleCount);
      this.props.isPage.onChange(Math.ceil(end / visibleCount), visibleCount)
    }
    this.setState({
      // menuItems: arr.length > 0 ? arr : menuItems,
      start,
      end
    })
  }
  renderMain = locale => {
    const renderMenu = this.renderMenu();
    const { isPage, menuItems, prefixCls } = this.props;
    const { start, end, total } = this.state;
    // console.log('renderMain', this.state, this.props, renderMenu);
    
    const classnames = cn({
      [`${prefixCls}-page-prev`]: isPage && start !== 0,
      // [`${prefixCls}-page-next`]: isPage && end !== menuItems.length
      [`${prefixCls}-page-next`]: isPage && end < total
    })
    return renderMenu ? (
      <div style={{overflow: 'auto'}} className={classnames}>
        {
          isPage && start !== 0 ? <div className='prev' onClick={this.onPrev}>{locale.prev}</div> : null
        }
        {renderMenu}
        {/* {
          isPage && end !== menuItems.length ? <div className='next' onClick={this.onNext}>{locale.next}</div> : null
        } */}
        {
          isPage && end < total ? <div className='next' onClick={this.onNext}>{locale.next}</div> : null
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
