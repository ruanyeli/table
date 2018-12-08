/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';
/* eslint-disable no-unused-vars */
import Button from '../button';
import Icon from '../icon';
import s from './style';
import DialogWarp from './dialogWarp';
import LocaleReceiver from '../locale-provider/LocaleReceiver'

const ConfirmDialog = (props) => {
  const { onCancel, onOk, afterClose, visible, cancelBtn, title, content, okText, cancelText, icon, getContainer, confirmLoading } = props;
  const prefixCls = props.prefixCls || s.confirmPrefix;
  const width = props.width || 416;
  const style = props.style || {};
  // 默认为 false，保持旧版默认行为
  const maskClosable = props.maskClosable === undefined ? false : props.maskClosable;

  const classString = cn(
    prefixCls,
    `${prefixCls}-${props.type}`,
    props.className,
  );

  return (
    <DialogWarp
      visible={visible}
      header=""
      footer=""
      maskClosable={maskClosable}
      closable={false}
      className={classString}
      width={width}
      style={style}
      getContainer={getContainer}
      afterClose={afterClose}
      // isTransformOrigin={false}
    >
      <LocaleReceiver componentName="Dialog">
        {
          local => <div className={`${prefixCls}-inner`}>
            <div className={`${prefixCls}-body`}>
              <Icon type={icon} />
              <span className={`${prefixCls}-title`}>{title}</span>
              <div className={`${prefixCls}-content`}>{content}</div>
            </div>
            <div className={`${prefixCls}-btns`}>
              {cancelBtn ? <Button onClick={onCancel} style={{marginRight: 10}}>{ cancelText || local.cancelText }</Button> : '' }
              <Button onClick={onOk} type="primary" loading={confirmLoading}>{ okText || local.okText }</Button>
            </div>
          </div>
        }
      </LocaleReceiver>
    </DialogWarp>
  );
};

export default function confirm(config) {
  let div = document.createElement('div');
  document.body.appendChild(div);

  const maskClosable = config.maskClosable === undefined ? false : config.maskClosable;

  function close(...args) {
    render({ ...config, close, visible: false, getContainer: getContainer, afterClose: destroy.bind(this, ...args), onOk: onOk, onCancel: onCancel});
  }

  function destroy(...args) {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
    const triggerCancel = args && args.length &&
      args.some(param => param && param.triggerCancel);
    if (config.onCancel && triggerCancel) {
      config.onCancel(...args);
    }
  }

  function onCancel() {
    close({ triggerCancel: true });
  }

  function onOk() {
    close({ triggerCancel: false });
    if (config.onOk) {
      config.onOk()
    }
  }

  function getContainer() {
    return div
  }

  function render(props) {
    ReactDOM.render(<ConfirmDialog {...props} />, div);
  }

  render({ ...config, visible: true, close, getContainer: getContainer, onOk: onOk, onCancel: onCancel });

  return {
    destroy: close
  }
}
