/**
 * @Author: xiaofei.wang <wxf>
 * @Date:   2017-06-02 16:32:58
 * @Last modified by:   wxf
 * @Last modified time: 2017-06-02 16:32:58
 */

import Dialog from './dialogWarp';
import Confirm from './confirm';

Dialog.confirm = function(props) {
  const config = Object.assign({
    cancelBtn: true,
    icon: 'exclamation-circle',
    type: 'confirm'
  }, props)
  return Confirm(config)
}

Dialog.success = function(props) {
  const config = Object.assign({
    cancelBtn: false,
    icon: 'check-circle-o',
    type: 'success'
  }, props)
  return Confirm(config)
}

Dialog.error = function(props) {
  const config = Object.assign({
    cancelBtn: false,
    icon: 'close-circle-o',
    type: 'error'
  }, props)
  return Confirm(config)
}

Dialog.warning = function(props) {
  const config = Object.assign({
    cancelBtn: false,
    icon: 'exclamation-circle-o',
    type: 'warning'
  }, props)
  return Confirm(config)
}

export default Dialog;
