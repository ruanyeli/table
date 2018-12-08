import React, { Component } from 'react';
import Notification from './notification';
import s from './style/index';
import Icon from '../icon';

// let prefixCls = s.notificationPrefix;
// let notification = null;
// Notification.newInstance({
//   prefixCls,
// }, (n) => notification = n);
const notificationInstance = {};
let defaultDuration = 4.5;
let defaultTop = 24;
let defaultBottom = 24;
let defaultPlacement = 'topRight';

const typeToIcon = {
  success: 'check-circle-o',
  info: 'info-circle-o',
  error: 'close-circle-o',
  warning: 'exclamation-circle-o',
};
// 配置默认项
function setNotificationConfig(options = {}) {
  const { duration, placement, bottom, top } = options;
  if (duration !== undefined) {
    defaultDuration = duration;
  }
  if (placement !== undefined) {
    defaultPlacement = placement;
  }
  if (bottom !== undefined) {
    defaultBottom = bottom;
  }
  if (top !== undefined) {
    defaultTop = top;
  }
  // if (getContainer !== undefined) {
  //   defaultGetContainer = getContainer;
  // }
}

function getPlacementStyle(placement) {
  let style;
  switch (placement) {
    case 'topLeft':
      style = {
        left: 0,
        top: defaultTop,
        bottom: 'auto',
      };
      break;
    case 'topRight':
      style = {
        right: 0,
        top: defaultTop,
        bottom: 'auto',
      };
      break;
    case 'bottomLeft':
      style = {
        left: 0,
        top: 'auto',
        bottom: defaultBottom,
      };
      break;
    default:
      style = {
        right: 0,
        top: 'auto',
        bottom: defaultBottom,
      };
      break;
  }
  return style;
}


// 获取notification  实例
function getNotificationInstance(prefixCls, placement, callback) {
  const cacheKey = `${prefixCls}-${placement}`;
  if (notificationInstance[cacheKey]) {
    return callback(notificationInstance[cacheKey]);
  }
  Notification.newInstance({
    prefixCls,
    className: cacheKey,
    style: getPlacementStyle(placement),
    // getContainer: defaultGetContainer,
    closeIcon: <Icon className={`${prefixCls}-close-icon`} type='cross' />,
  }, (notification) => {
    notificationInstance[cacheKey] = notification;
    callback(notification);
  });
}

// 显示 notice
function notice (args = {}) {
  const outerPrefixCls = args.prefixCls || s.notificationPrefix;
  const prefixCls = args.prefixCls || s.notificationPrefix;

  const duration = args.duration === undefined ? defaultDuration : args.duration;
  let iconNode = null;
  if (args.icon) {
    iconNode = (
      <span className={`${prefixCls}-icon`}>
        {args.icon}
      </span>
    );
  } else if (args.type) {
    const iconType = typeToIcon[args.type];
    iconNode = (
      <span className={`${prefixCls}-icon`}>
        <Icon
          className={`${prefixCls}-icon-${args.type}`}
          type={iconType}
        />
      </span>
      
    );
  }

  const autoMarginTag = (!args.description && iconNode)
  ? <span className={`${prefixCls}-message-single-line-auto-margin`} />
  : null;

  getNotificationInstance(outerPrefixCls, args.placement || defaultPlacement, (notification) => {
    notification.notice({
      content: (
        <div className={iconNode ? `${prefixCls}-with-icon` : ''}>
          {iconNode}
          <div className={`${prefixCls}-message`}>
            {autoMarginTag}
            {args.message}
          </div>
          <div className={`${prefixCls}-description`}>{args.description}</div>
          {args.btn ? <span className={`${prefixCls}-btn`}>{args.btn}</span> : null}
        </div>
      ),
      // onClose() {
      //   console.log('simple close');
      // },
      duration,
      closable: true,
      closeIcon: <Icon type='cross' />,
      onClose: args.onClose,
      key: args.key,
      style: args.style || {},
      className: args.className,
    })
  });
}
const api = {
  open: notice,
  config: setNotificationConfig,
  close: (key) => {
    Object.keys(notificationInstance)
      .forEach(cacheKey => notificationInstance[cacheKey].removeNotice(key));
  },
  destroy: () => {
    Object.keys(notificationInstance).forEach(cacheKey => {
      notificationInstance[cacheKey].destroy();
      delete notificationInstance[cacheKey];
    });
  },
};

['success', 'info', 'warning', 'error'].forEach((type) => {
  api[type] = (args) => api.open({
    ...args,
    type,
  });
});

api.warn = api.warning;

export default api;