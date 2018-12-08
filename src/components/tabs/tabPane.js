import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import classnames from 'classnames';

const TabPane = createReactClass({
  displayName: 'TabPane',
  propTypes: {
    className: PropTypes.string,
    active: PropTypes.bool,
    style: PropTypes.any,
    destroyInactiveTabPane: PropTypes.bool,
    forceRender: PropTypes.bool,
    placeholder: PropTypes.node
  },
  getDefaultProps() {
    return { placeholder: null };
  },
  render() {
    const props = this.props;
    const { className, active, forceRender, children, placeholder, style, destroyInactiveTabPane } = props;
    const prefixCls = `${props.rootPrefixCls}-tabpane`;
    this.isActived = this.isActived || active; // 判断是否渲染过
    const cls = classnames({
      [prefixCls]: 1,
      [`${prefixCls}-inactive`]: !active,
      [`${prefixCls}-active`]: active,
      [className]: className
    });
    const isRender = destroyInactiveTabPane ? active : this.isActived;
    return (
      <div
        style={style}
        role="tabpanel"
        aria-hidden={props.active ? 'false' : 'true'}
        className={cls}
      >
        { isRender || forceRender ? children : placeholder }
      </div>
    );
  }
});

export default TabPane;
