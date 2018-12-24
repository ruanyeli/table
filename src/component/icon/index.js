import s from './style/index';
import React from 'react';
import cn from 'classnames';
import omit from 'lodash/omit';

export default function Icon(props) {
  const { type, className = '' } = props;
  const classString = cn({
    [s.iconPrefix]: true,
    [`${s.iconPrefix}-${type}`]: !!type,
  }, className);
  // console.log('classString', classString, props);
  return <i {...omit(props, ['type'])} className={classString} />; // props 中除了type的渲染
}
