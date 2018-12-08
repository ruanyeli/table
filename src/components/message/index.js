/**
 * Created by wxy on 2017/6/7.
 */

import React from 'react';
import Notice from './notice';
import s from './style/index';
import cn from 'classnames';

let messageInstance;
let prefixCls = s.messagePrefix;
let renderContainer;
let initPromise;

async function getInstance() {
  return new Promise((resolve) => {
    if (messageInstance) {
      resolve(messageInstance);
    } else {
      if (!initPromise) {
        initPromise = Notice.newInstance({
          prefixCls
        }, renderContainer).then(instance => {
          messageInstance = instance;
          return instance;
        })
        resolve(initPromise)
      } else {
        resolve(initPromise)
      }
    }
  })
}

async function notice(type, content, time) {
  const instance = await getInstance();
  instance.notice({
    duration: time,
    visible: true,
    content: (
      <div className={ cn(`${prefixCls}-custom-content`, `${prefixCls}-custom-content-${type}`) }>
        <span>{content}</span>
      </div>
    )
  })
}

export default {
  config(container) {
    renderContainer = container;
  },
  info(content, time) {
    return notice('info', content, time);
  },
  warning(content, time) {
    return notice('warning', content, time);
  },
  error(content, time) {
    return notice('error', content, time);
  },
  success(content, time) {
    return notice('success', content, time);
  }
}
