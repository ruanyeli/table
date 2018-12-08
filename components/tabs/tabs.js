
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TabPane from './tabPane';
import TabContent from './tabContent';
import TabBar from './tabbar';
import s from './style';

function getDefaultActiveKey(props) {
  let activeKey;
  React.Children.forEach(props.children, (child) => {
    if (child && !activeKey && !child.props.disabled) {
      activeKey = child.key;
    }
  });
  return activeKey;
}
function activeKeyIsValid(props, key) {
  const keys = React.Children.map(props.children, child => child && child.key);
  return keys.indexOf(key) >= 0;
}
function noop() {

}
export default class Tabs extends Component {
  static defaultProps = {
    prefixCls: s.tabsPrefix,
    tabBarPosition: 'top',
    type: 'line',
    onChange: noop,
    onPrevClick: noop,
    onNextClick: noop,
    closable: false,
    destroyInactiveTabPane: false,
    animated: true,
    onTabTitleChange: noop,
    titleEditable: false
  };

  static propTypes = {
    type: PropTypes.string,
    size: PropTypes.oneOf(['large', 'default', 'small']),
    htmlType: PropTypes.oneOf(['submit', 'button', 'reset']),
    destroyInactiveTabPane: PropTypes.bool,
    onChange: PropTypes.func,
    children: PropTypes.any,
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    tabBarPosition: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    style: PropTypes.object,
    activeKey: PropTypes.string,
    defaultActiveKey: PropTypes.string,
    closable: PropTypes.bool,
    animated: PropTypes.bool,
    tabBarStyle: PropTypes.object,
    onTabTitleChange: PropTypes.func,
    titleEditable: PropTypes.bool
  };

  constructor(props) {
    super(props);
    let activeKey;
    if ('activeKey' in props) {
      activeKey = props.activeKey;
    } else if ('defaultActiveKey' in props) {
      activeKey = props.defaultActiveKey;
    } else {
      activeKey = getDefaultActiveKey(props);
    }
    this.state = {
      activeKey
    }
  }

  componentWillReceiveProps(nextProps) {
    if ('activeKey' in nextProps) {
      this.setState({
        activeKey: nextProps.activeKey
      })
    } else if (!activeKeyIsValid(nextProps, this.state.activeKey)) { // 删除或者添加的情况
      this.setState({
        activeKey: getDefaultActiveKey(nextProps)
      })
    }
  }

  onTabClick = activeKey => {
    if (this.props.onTabClick) {
      this.props.onTabClick(activeKey);
    }
    this.setActiveKey(activeKey);
  };

  setActiveKey = activeKey => {
    if (this.state.activeKey !== activeKey) {
      if (!('activeKey' in this.props)) {
        this.setState({
          activeKey
        })
      }
      this.props.onChange(activeKey);
    }
  };
  
  render() {
    const props = this.props;
    const state = this.state;
    const { prefixCls, tabBarPosition, className, style, children, type, 
      closable, animated, destroyInactiveTabPane, tabBarStyle, titleEditable,
      preTabbarExtra, postTabbarExtra } = props;
    const { activeKey } = state;
    const cls = classnames({
      [prefixCls]: true,
      [`${prefixCls}-${tabBarPosition}`]: true,
      [`${prefixCls}-vertical`]: tabBarPosition === 'left' || tabBarPosition === 'right',
      [`${prefixCls}-${type}`]: true,
      [className]: !!className
    });
    const contents = [
      React.cloneElement(<TabBar />, {
        key: 'tabBar',
        children,
        prefixCls,
        tabBarPosition,
        closable,
        activeKey,
        animated,
        style: tabBarStyle,
        onTabClick: this.onTabClick,
        onPrevClick: props.onPrevClick,
        onNextClick: props.onNextClick,
        onRemove: props.onRemove,
        onTabTitleChange: props.onTabTitleChange,
        titleEditable,
        preTabbarExtra,
        postTabbarExtra,
      }),
      React.cloneElement(<TabContent />, {
        key: 'tabContent',
        children,
        prefixCls,
        tabBarPosition,
        activeKey,
        animated,
        destroyInactiveTabPane,
      })
    ];
    if (tabBarPosition === 'bottom') {
      contents.reverse();
    }
    return (
      <div
        className={cls}
        style={style}
      >
        {
          contents
        }
      </div>
    );
  }
}

Tabs.TabPane = TabPane;
