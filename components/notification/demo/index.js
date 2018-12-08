/**
 * Created by songbin.yu on 2018/9/21.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import notification from '../index';
import Button from '../../button';
import { log } from 'core-js';

const MOUNT_NODE = document.getElementById('app');

const setNotificationConfig = () => {
  notification.config({
    top: 200,
    duration: 1,
  })
}
const closeNotification = (key) => {
  notification.close(key);
  console.log("document.querySelectorAll('.td-notification-notice-closable')", document.querySelectorAll('.td-notification-notice-closable'));
  setTimeout(() => {
    console.log("setTimeout)", document.querySelectorAll('.td-notification-notice-closable'));
  }, 1000);
}
const showNormal = () => {
  const key = `${Date.now()}`;
  console.log('simple key', key);
  // notification.open({
  //   key,
  //   message: <span>simple show</span>,
  //   description:  <span>simple show content</span>,
  //   duration: null,
  //   btn: <Button onClick={() => closeNotification(key)}>close</Button>,
  //   onClose() {
      
  //   },
  // });
  notification.open({
    message: "test",
    // placement: "topRight",
    duration: null,
    key: "topRight",
  });
  console.log("document.querySelector('.td-notification-topRight')", document.querySelector('.td-notification-topRight'))
}
const showOtherPlace = () => {
  notification.open({
    message: <span>other place show</span>,
    description:  <span>simple show content</span>,
    // placement: "topLeft",
    // placement: "bottomLeft",
    placement: "bottomRight",
    duration: null,
    onClose() {
      console.log('simple close');
    },
  })
}
const closeIn15s = () => {
  const key = `${Date.now()}`;
  notification.open({
    message: <span>will close in 15s</span>,
    description:  <span>will close in 15s auto</span>,
    duration: null,
    key: key,
    onClose() {
      console.log('simple close');
    },
  });
  setTimeout(() => {
    notification.close(key);
    // console.log("will close");
  }, 10000);
}
const showStatusNotice = (type = "success") => {
  notification[type]({
    message: <span>{type}</span>,
    description:  <span>simple show {type}</span>,
    duration: null,
    onClose() {
      console.log('simple close');
    },
  })
  console.log(document.querySelectorAll(`.td-notification-icon-${type}`));
}

let render = () => {
  ReactDOM.render(
    <div style={{ margin: 100 }}>
      <Button onClick={setNotificationConfig} >set notification config</Button>
      <Button onClick={showNormal} >notification show</Button>
      <Button onClick={showOtherPlace}>other place show</Button>
      <Button onClick={closeIn15s}>will close in 15s</Button>
      <div style={{ marginTop: 20 }}>
        <Button onClick={() => showStatusNotice("success")}>success</Button>
        <Button onClick={() => showStatusNotice("info")}>info</Button>
        <Button onClick={() => showStatusNotice("warning")}>warning</Button>
        <Button onClick={() => showStatusNotice("error")}>error</Button>
      </div>
    </div>
    , MOUNT_NODE);
};


try {
  render();
} catch (e) {
  console.log(e);
}

if (module.hot) {
  module.hot.accept(['../index'], () => {
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(MOUNT_NODE);
      render();
    })
  })
}
