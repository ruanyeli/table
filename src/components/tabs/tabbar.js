import React, { Component } from 'react';
import classnames from 'classnames';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import { debounce } from 'lodash';
import { setTransform } from './utils';
import Icon from '../icon';
import Input from '../input';

export default class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      next: false,
      prev: false,
      editing: false,
    };
    this.offset = 0;
    this.inkBarStyle = {};
  }

  componentDidMount() {
    this.didUpdate();
    const debounceResize = debounce(() => {
      this.setNextPrev();
      this.scrollToActiveTab();
    })
    this.resizeEvent = addEventListener(window, 'resize', debounceResize);
  }

  componentDidUpdate(prevProps) {
    this.didUpdate(prevProps);
  }

  didUpdate = prevProps => {
    const props = this.props;
    this.setInkBarOffset();
    if (prevProps && prevProps.tabBarPosition !== props.tabBarPosition) {
      this.setOffset(0);
      this.setNextPrev();
      return;
    }
    const isNextPrev = this.setNextPrev();
    if (this.showNextPrev() !== this.showNextPrev(isNextPrev)) { // 最开始默认都是不滚动的，滚动与不滚动切换时
      this.setState({}, this.scrollToActiveTab);
    } else if (!prevProps || props.activeKey !== prevProps.activeKey) {
      this.scrollToActiveTab();
    }
  };

  setNextPrev = () => {
    const navWH = this.getOffsetWH(this.navNode);
    const navWrapWH = this.getOffsetWH(this.navWrapNode);
    const minOffset = navWrapWH - navWH;
    const { offset } = this;
    let { next, prev } = this.state;
    if (minOffset >= 0) {
      next = false;
      this.setOffset(0, false);
    } else if (minOffset < offset) {
      next = true;
    } else {
      next = false;
      this.setOffset(minOffset, false);
    }
    if (this.offset >= 0) {
      prev = false;
    } else {
      prev = true;
    }
    this.setNext(next);
    this.setPrev(prev);
    return {
      next,
      prev
    }
  };

  showNextPrev = state => {
    if (state) {
      return state.next || state.prev;
    }
    return this.state.next || this.state.prev;
  };

  setNext = v => {
    if (this.state.next !== v) {
      this.setState({
        next: v
      })
    }
  };

  setPrev = v => {
    if (this.state.prev !== v) {
      this.setState({
        prev: v
      })
    }
  };

  setOffset = (offset, checkNextPrev = true) => {
    const target = Math.min(0, offset);
    const { tabBarPosition } = this.props;
    if (this.offset !== target) {
      this.offset = target;
      const navStyle = this.navNode.style;
      if (tabBarPosition === 'top' || tabBarPosition === 'bottom') {
        setTransform(navStyle, `translate3d(${target}px, 0, 0)`);
      } else {
        setTransform(navStyle, `translate3d(0, ${target}px, 0)`);
      }
      if (checkNextPrev) {
        this.setNextPrev();
      }
    }
  };

  setInkBarOffset = () => {
    const { tabBarPosition } = this.props;
    const inkBarStyle = this.inkBarNode.style;
    const activeTabWH = this.getOffsetWH(this.activeTab);
    let offset = 0;
    // 找到activeTab相对于父级的距离
    if (tabBarPosition === 'top' || tabBarPosition === 'bottom') {
      inkBarStyle.width = activeTabWH + 'px';
      inkBarStyle.height = '2px';
      offset = this.activeTab ? this.activeTab.offsetLeft : 0;
      setTransform(inkBarStyle, `translate3d(${offset}px, 0, 0)`);
    } else {
      inkBarStyle.height = activeTabWH + 'px';
      inkBarStyle.width = '2px';
      offset = this.activeTab ? this.activeTab.offsetTop : 0;
      setTransform(inkBarStyle, `translate3d(0, ${offset}px, 0)`);
    }
  };

  scrollToActiveTab = () => {
    const navWrapWH = this.getOffsetWH(this.navWrapNode);
    const activeTabWH = this.getOffsetWH(this.activeTab);
    let { offset } = this;
    const { tabBarPosition } = this.props;
    const activeTabLT = this.getOffsetLT(this.activeTab);
    const navWrapLT = this.getOffsetLT(this.navWrapNode);
    // 说明当前激活的tab不完全在可视区域内
    if (activeTabLT < navWrapLT) { // 左边部分不可见或全部不可见
      offset += (navWrapLT - activeTabLT);
    } else if (navWrapLT + navWrapWH < activeTabLT + activeTabWH) { // 右边部分不可见或全部不可见
      offset -= ((activeTabLT + activeTabWH) - (navWrapLT + navWrapWH));
    }
    this.setOffset(offset);
  };

  onTabClick = key => {
    if (key === this.props.activeKey) {
      this.setState({ editing: true }, () => { 
        this.props.onTabClick(key);
        if (this.props.titleEditable) {
          this._input.input.focus();
        }
      });
    } else {
      this.props.onTabClick(key);
    }
  };

  onRemove = (key, e) => {
    e.stopPropagation();
    if (!key) {
      return;
    }
    if (this.props.onRemove) {
      this.props.onRemove(key);
    }
  };

  save_inputRef = _input => this._input = _input;
  saveNavWrapNodeRef = navWrapNode => this.navWrapNode = navWrapNode;
  saveNavNodeRef = navNode => this.navNode = navNode;
  saveInkBarNodeRef = inkBarNode => this.inkBarNode = inkBarNode;

  getTabs = () => {
    const { children, activeKey, prefixCls, closable, onTabTitleChange, titleEditable } = this.props;
    const { editing } = this.state;
    const newChildren = [];
    React.Children.forEach(children, (child, index) => {
      if (!child) {
        return;
      }
      const key = child.key;
      const cls = classnames({
        [`${prefixCls}-tab`]: true,
        [`${prefixCls}-tab-active`]: key === activeKey,
        [`${prefixCls}-tab-disabled`]: child.props.disabled
      })
      const ref = {};
      if (activeKey === key) {
        ref.ref = node => { this.activeTab = node; }
      }
      const title = titleEditable && editing && activeKey === key ? <Input ref={this.save_inputRef} defaultValue={child.props.tab} onBlur={() => {
        const newTitle = this._input.input.value;
        this.setState({editing: false}, () => onTabTitleChange(activeKey, newTitle));
      }}/> : child.props.tab;
      newChildren.push(
        <div
          key={index}
          role='tab'
          aria-disabled={child.props.disabled ? 'true' : 'false'}
          aria-selected={activeKey === key ? 'true' : 'false'}
          className={cls}
          {...ref}
          onClick={child.props.disabled ? null : this.onTabClick.bind(this, key)}
        >
          {
            closable ? <div>
              { title }
              <Icon type="cross" className='close' onClick={child.props.disabled ? null : this.onRemove.bind(this, key)}/>
            </div> : title
          }
        </div>
      )
    })
    return newChildren;
  };

  getOffsetWH = node => {
    if (!node) {
      return 0;
    }
    const { tabBarPosition } = this.props;
    let prop = 'offsetWidth';
    if (tabBarPosition === 'left' || tabBarPosition === 'right') {
      prop = 'offsetHeight';
    }
    return node[prop];
  };

  getOffsetLT = node => {
    if (!node) {
      return 0;
    }
    const { tabBarPosition } = this.props;
    let prop = 'left';
    if (tabBarPosition === 'left' || tabBarPosition === 'right') {
      prop = 'top';
    }
    return node.getBoundingClientRect()[prop];
  };

  onPrev = e => {
    this.props.onPrevClick(e);
    const navWrapWH = this.getOffsetWH(this.navWrapNode);
    this.setOffset(this.offset + navWrapWH);
  };

  onNext = e => {
    this.props.onNextClick(e);
    const navWrapWH = this.getOffsetWH(this.navWrapNode);
    this.setOffset(this.offset - navWrapWH);
  };

  render() {
    const props = this.props;
    const state = this.state;
    const { prefixCls, style, animated, tabBarPosition, preTabbarExtra, postTabbarExtra } = props;
    const { prev, next } = state;
    const showPrevNext = prev || next;
    const cls = classnames({
      [`${prefixCls}-bar`]: true
    });
    const prevCls = classnames({
      [`${prefixCls}-tab-btn`]: true,
      [`${prefixCls}-tab-prev`]: true,
      [`${prefixCls}-tab-btn-disabled`]: !prev,
      [`${prefixCls}-tab-arrow-show`]: showPrevNext
    });
    const nextCls = classnames({
      [`${prefixCls}-tab-btn`]: true,
      [`${prefixCls}-tab-next`]: true,
      [`${prefixCls}-tab-btn-disabled`]: !next,
      [`${prefixCls}-tab-arrow-show`]: showPrevNext
    });
    const inkCls = classnames({
      [`${prefixCls}-ink-bar`]: true,
      [`${prefixCls}-ink-bar-animated`]: !!animated
    });
    const navCls = classnames({
      [`${prefixCls}-nav`]: true,
      [`${prefixCls}-nav-animated`]: !!animated
    });
    const prevButton = (
      <span
        unselectable='unselectable'
        className={prevCls}
        onClick={prev ? this.onPrev : null}
      >
        <span className={`${prefixCls}-tab-prev-icon ${prefixCls}-tab-btn-icon`}></span>
      </span>
    );
    const nextButton = (
      <span
        unselectable='unselectable'
        className={nextCls}
        onClick={next ? this.onNext : null}
      >
        <span className={`${prefixCls}-tab-next-icon ${prefixCls}-tab-btn-icon`}></span>
      </span>
    );
    return (
      <div
        role='tablist'
        className={cls}
        style={style}
      >
        <div
          className={classnames({
            [`${prefixCls}-nav-container`]: true,
            [`${prefixCls}-nav-container-scrolling`]: showPrevNext
          })}
        >
          { prevButton }
          { nextButton }
          <div className={`${prefixCls}-nav-wrap`} ref={this.saveNavWrapNodeRef}>
            { preTabbarExtra }
            <div className={navCls} ref={this.saveNavNodeRef}>
              <div className={inkCls} ref={this.saveInkBarNodeRef}></div>
              {
                this.getTabs()
              }
            </div>
            { postTabbarExtra }
          </div>
        </div>
      </div>
    )
  }
}
