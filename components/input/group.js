import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

const Group = (props) => {
  const { prefixCls, className, style, size, compact, children } = props;
  const cls = cn(`${prefixCls}-group`, {
    [`${prefixCls}-group-lg`]: size === 'large',
    [`${prefixCls}-group-sm`]: size === 'small',
    [`${prefixCls}-group-compact`]: compact,
  }, className);
  return (
    <span className={cls} style={style}>
      {children}
    </span>
  );
};

Group.propTypes = {
  prefixCls: PropTypes.string,
  compact: PropTypes.bool,
  className: PropTypes.string,
};

Group.defaultProps = {
  prefixCls: 'td-input',
  className: '',
  style: {},
  compact: false,
};

export default Group;
