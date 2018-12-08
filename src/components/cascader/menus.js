import React from 'react';
import arrayTreeFilter from 'array-tree-filter';
import { findDOMNode } from 'react-dom';
import Icon from '../icon';
import _findIndex from 'lodash/findIndex';

export default class Menus extends React.Component {
  static defaultProps = {
    options: [],
    value: [],
    activeValue: [],
    onSelect() {},
    prefixCls: 'rc-cascader-menus',
    visible: false,
    expandTrigger: 'click'
  };

  constructor(props) {
    super(props);
    const pagesize = this.checkPageSize(props);
    this.state = {
      pagesize: pagesize !== -1 ? pagesize : 0
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isPage) {
      if (nextProps.inputValue !== this.props.inputValue) {
        this.setState({pagesize: 0});
      } else if (nextProps.visible && !this.props.visible) {
        const pagesize = this.checkPageSize(nextProps);
        pagesize !== -1 && this.setState({pagesize});
      }
    }
  }

  checkPageSize(nextProps) {
    let pagesize = -1;
    const { isPage, activeValue, options } = nextProps;
    if (isPage && activeValue && activeValue.length > 0) {
      const findIndex = _findIndex(options, i => i.value === activeValue[0]);
      if (findIndex >= 0) {
        pagesize = Math.floor(findIndex / nextProps.isPage.visibleCount)
      }
    }
    return pagesize
  }

  componentDidMount() {
    this.scrollActiveItemToView();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.visible && this.props.visible) {
      this.scrollActiveItemToView();
    }
  }

  getOption(option, menuIndex) {
    const { prefixCls, expandTrigger } = this.props;
    const onSelect = this.props.onSelect.bind(this, option, menuIndex);
    let expandProps = {
      onClick: onSelect
    };
    let menuItemCls = `${prefixCls}-menu-item`;
    const hasChildren = option.children && option.children.length > 0;
    if (hasChildren || option.isLeaf === false || option.path && option.path[option.path.length - 1].isLeaf === false) {
      menuItemCls += ` ${prefixCls}-menu-item-expand`;
    }
    if (expandTrigger === 'hover' && hasChildren) {
      expandProps = {
        onMouseEnter: this.delayOnSelect.bind(this, onSelect),
        onMouseLeave: this.delayOnSelect.bind(this)
      };
    }
    if (this.isActiveOption(option, menuIndex)) {
      menuItemCls += ` ${prefixCls}-menu-item-active`;
      expandProps.ref = r => this[`activeItem${menuIndex}`] = r;
    }
    if (option.disabled) {
      menuItemCls += ` ${prefixCls}-menu-item-disabled`;
    }
    if (option.loading) {
      menuItemCls += ` ${prefixCls}-menu-item-loading`;
    }
    let title = '';
    if (option.title) {
      title = option.title;
    } else if (typeof option.label === 'string') {
      title = option.label;
    }
    return (
      <li
        key={option.value}
        className={menuItemCls}
        title={title}
        {...expandProps}
      >
        {option.label}
      </li>
    );
  }

  getOptions() {
    const { isPage, options } = this.props;
    const { pagesize } = this.state;
    if (isPage) {
      if (options.length > pagesize * isPage.visibleCount) {
        return options.slice(pagesize * isPage.visibleCount, (pagesize + 1) * isPage.visibleCount)
      } else {
        this.setState({
          pagesize: 0
        });
      }
    } else {
      return options || []
    }
  }

  getActiveOptions(values) {
    const activeValue = values || this.props.activeValue;
    const options = this.getOptions();
    return arrayTreeFilter(options, (o, level) => o.value === activeValue[level]);
  }

  getShowOptions() {
    const options = this.getOptions();
    const result = this.getActiveOptions()
      .map(activeOption => activeOption.children)
      .filter(activeOption => !!activeOption);
    result.unshift(options);
    return result;
  }

  goPageSize(pagesize, str) {
    const itemComponent = this[str];
    if (itemComponent) {
      const target = findDOMNode(itemComponent);
      target.parentNode.scrollTop = 0;
    }
    this.setState({
      pagesize
    });
  }

  hasNext() {
    const { isPage, options } = this.props;
    const { pagesize } = this.state;
    return (pagesize + 1) * isPage.visibleCount < options.length
  }

  hasPrev() {
    const { pagesize } = this.state;
    return pagesize > 0
  }

  savePrevRef = prev => this.prev = prev;
  saveNextRef = next => this.next = next;

  renderPaginationPrev = () => {
    const { isPage } = this.props;
    const { pagesize } = this.state;
    if (isPage && this.hasPrev()) {
      return <li ref={this.savePrevRef} onClick={() => this.goPageSize(pagesize - 1, 'prev')} className="td-cascader-prev"><Icon type="angle-double-up" /></li>
    } else {
      return null
    }
  }
  renderPaginationNext = () => {
    const { isPage } = this.props;
    const { pagesize } = this.state;
    if (isPage && this.hasNext()) {
      return <li ref={this.saveNextRef} onClick={() => this.goPageSize(pagesize + 1, 'next')} className="td-cascader-next"><Icon type="angle-double-down" /></li>
    } else {
      return null
    }
  }

  delayOnSelect(onSelect, ...args) {
    if (this.delayTimer) {
      clearTimeout(this.delayTimer);
      this.delayTimer = null;
    }
    if (typeof onSelect === 'function') {
      this.delayTimer = setTimeout(() => {
        onSelect(args);
        this.delayTimer = null;
      }, 150);
    }
  }

  scrollActiveItemToView() {
    const optionsLength = this.getShowOptions().length;
    for (let i = 0; i < optionsLength; i++) {
      const itemComponent = this[`activeItem${i}`];
      if (itemComponent) {
        const target = findDOMNode(itemComponent);
        target.parentNode.scrollTop = target.offsetTop;
      }
    }
  }

  isActiveOption(option, menuIndex) {
    const { activeValue = [] } = this.props;
    return activeValue[menuIndex] === option.value;
  }

  render() {
    const { prefixCls, dropdownMenuColumnStyle } = this.props;
    return (
      <div>
        {this.getShowOptions().map((options, menuIndex) =>
          <ul className={`${prefixCls}-menu`} key={menuIndex} style={dropdownMenuColumnStyle}>
            {menuIndex === 0 && this.renderPaginationPrev()}
            {options.map(option => this.getOption(option, menuIndex))}
            {menuIndex === 0 && this.renderPaginationNext()}
          </ul>
        )}
      </div>
    );
  }
}
