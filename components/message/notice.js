/**
 * Created by wxy on 2017/6/7.
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import NoticeContent from './noticeContent';
import Animate from 'rc-animate';
import _findIndex from 'lodash/findIndex';

let keyIndex = 0;

class Notice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notices: []
    }
  }

  static defaultProps = {
    prefixCls: 'td-notice',
    duration: 2
  }

  static propTypes = {
    prefixCls: PropTypes.string
  }

  addNotice = (notice) => {
    const key = notice.key = notice.key || `${this.props.prefixCls}_notice_${keyIndex++}`;
    this.setState(previousState => {
      const notices = previousState.notices;
      if (!notices.filter(v => v.key === key).length) {
        return {
          notices: notices.concat(notice)
        }
      }
    })
    const duration = notice.duration ? notice.duration : this.props.duration;
    const timer = `timer_${keyIndex++}`;
    this[timer] = setTimeout(() => {
      this.hiddenNotice(key);
      clearTimeout(this[timer]);
      this[timer] = null;
    }, duration * 1000);
  }

  hiddenNotice = key => {
    let { notices } = this.state;
    const index = _findIndex(notices, v => v.key === key && v.visible);
    notices[index].visible = false;
    notices[index].remove = true;
    this.setState({notices});
  }

  removeNotice = key => {
    const notices = this.state.notices.filter(notice => notice.key !== key)
    this.setState({notices})
  }
  onEnd = (key, exists) => {
    let { notices } = this.state;
    const index = _findIndex(notices, v => v.key === key);
    if (notices[index].remove && !notices[index].visible) {
      this.removeNotice(key);
    }
  }

  render() {
    const { prefixCls } = this.props;
    const animateProps = {};
    if (this.state.notices.length <= 1) {
      animateProps.component = '';
    }
    return (
      <div className={ prefixCls }>
        {
          this.state.notices.map((notice, i) => {
            return (
              <Animate
                key={notice.key}
                showProp="visible"
                component=""
                transitionName="zoom-up"
                transitionAppear
                onEnd={this.onEnd}
              >
                <NoticeContent {...notice} prefixCls={prefixCls} />
              </Animate>
            );
          })
        }
      </div>
    )
  }
}

Notice.newInstance = function newNoticeInstance(properties, container) {
  return new Promise((resolve, reject) => {
    let div = document.createElement('div');
    if (container) {
      container.appendChild(div);
    } else {
      document.body.appendChild(div);
    }
    ReactDOM.render(<Notice {...properties} ref={notification => {
      resolve({
        notice(noticeProps) {
          notification.addNotice(noticeProps);
        }
      })
    }}/>, div);
  })
};

export default Notice;
