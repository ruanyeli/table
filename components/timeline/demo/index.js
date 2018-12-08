/**
 * Created by kongliang on 19/06/2017.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Icon from '../../icon';

const MOUNT_NODE = document.getElementById('app');
const sss = [{
  key: 'k1',
  name: 'name1'
}, {
  key: 'k2',
  name: 'name2'
}, {
  key: 'k3',
  name: 'name3'
}, {
  key: 'k4',
  name: 'name4'
}]
let render = () => {
  let Timeline = require('../index').default;

  function Demo() {
    return (
      <div>
        <Timeline pending={<a href="#">See more</a>}>
          <Timeline.Item color="red">Create a services site 2015-09-01</Timeline.Item>
          {
            sss.map(v => {
              return <Timeline.Item color="red" key={v.key}>{v.key}</Timeline.Item>
            })
          }
          <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
          <Timeline.Item dot={<Icon type="sort" style={{ fontSize: '16px' }} />} color="red">Technical testing 2015-09-01</Timeline.Item>
          <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
        </Timeline>
      </div>

    );
  }

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
