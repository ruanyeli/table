import React from 'react';
import cn from 'classnames';
import omit from 'lodash/omit';
import './style/index';

export default function Icon(props) {
  const { type, className = '' } = props;
  const iconPrefix = 'y-icon';
  const classString = cn({
    [iconPrefix]: true,
    [`${iconPrefix}-${type}`]: !!type,
  }, className);
  // console.log('classString', classString, props);
  return <i {...omit(props, ['type'])} className={classString} />; // props 中除了type的渲染
}
