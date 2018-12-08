import React from 'react';
import ReactDOM from 'react-dom';
import Watermark from '../index';
const MOUNT_NODE = document.getElementById('app');

class Demo extends React.Component {
  render() {
    return (
      <div>
          <Watermark width={150} height={100} text="水印文案">
            <p>和好的好的</p>
            <p>和好的好的</p>
            <p>和好的好的</p>
            <p>和好的好的</p>
            <p>和好的好的</p>
            <p>和好的好的</p>
            <p>和好的好的</p>
            <p>和好的好的</p>
            <p>和好的好的</p>
            <p>和好的好的</p>
            <p>和好的好的</p>
            <p>和好的好的</p>
            <p>和好的好的</p>
          </Watermark>
          <Watermark width={150} height={100} img="http://img61.ddimg.cn/upload_img/00451/wenjian1/NIKE.jpg">
            <p>和好的好的</p>
            <p>和好的好的</p>
            <p>和好的好的</p>
            <p>和好的好的</p>
            <p>和好的好的</p>
            <p>和好的好的</p>
            <p>和好的好的</p>
            <p>和好的好的</p>
            <p>和好的好的</p>
            <p>和好的好的</p>
            <p>和好的好的</p>
            <p>和好的好的</p>
            <p>和好的好的</p>
          </Watermark>
      </div>
    )
  }
}

let render = () => {
  ReactDOM.render(<Demo />, MOUNT_NODE);
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
    });
  });
}
