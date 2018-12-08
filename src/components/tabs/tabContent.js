import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { findIndex } from 'lodash';
import { setTransform } from './utils';
import _ from 'lodash';

export default class TabContent extends Component {
  static propTypes = {
    prefixCls: PropTypes.string
  }
  getTabPanes = () => {
    const props = this.props;
    const { activeKey, children, prefixCls,
    destroyInactiveTabPane } = props;
    const newChildren = [];
    React.Children.forEach(children, child => {
      if (!child) {
        return;
      }
      const key = child.key;
      const active = activeKey === key;
      newChildren.push(
        React.cloneElement(child, {
          active,
          rootPrefixCls: prefixCls,
          destroyInactiveTabPane
        })
      )
    });
    return newChildren;
  }

  saveContentNodeRef = contentNode => this.contentNode = contentNode;

  render() {
    const props = this.props;
    const { prefixCls, animated, children, activeKey } = props;
    let { style } = props;
    const cls = classnames({
      [`${prefixCls}-content`]: true,
      [animated ? `${prefixCls}-content-animated` : `${prefixCls}-content-no-animated`]: true
    });
    const childrenList = (_.isArray(children) ? children : [children] || []).filter(i => !!i);
    const index = findIndex(childrenList, child => child && child.key === activeKey);
    if (index > -1) {
      let contentStyle = {}
      setTransform(contentStyle, `translate3d(-${index * 100}%, 0, 0)`);
      style = {
        ...style,
        ...contentStyle
      }
    }
    return (
      <div
        className={cls}
        style={style}
        ref={this.saveContentNodeRef}
      >
        {
          this.getTabPanes()
        }
      </div>
    )
  }
}
