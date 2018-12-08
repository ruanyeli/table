/**
 * Created by songbin.yu on 2018/9/21.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import List from '../index';
import Button from '../../button';
import ListMeteDemo from './listMetaDemo';
import ListGridDemo from './listGridDemo';

const MOUNT_NODE = document.getElementById('app');

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];
const renderListItem = () => {
  return (
    <div>
      <List
        header={<div>Header</div>}
        footer={<div>Footer</div>}
        // bordered
        dataSource={data}
        renderItem={item => (<List.Item actions={[<a>edit</a>, <a>more</a>]}>{item}</List.Item>)}
      />
    </div>
    // <List
    //   header={<div>Header</div>}
    //   footer={<div>Footer</div>}
    //   loading={false}
    //   dataSource={data}
    //   bordered={true}
    //   loadMore={<div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}><Button>loadMore</Button></div>}
    //   renderItem={item => <List.Item>{item}</List.Item>}
    //   // renderItem={item => <div>{item}</div>}
    //   pagination={{
    //     onChange: (page) => {
    //       console.log(page);
    //     },
    //     pageSize: 3,
    //     position: "top"
    //   }}
    // />
  );
}
let render = () => {
  ReactDOM.render(
    <div style={{ margin: 30 }}>
      <List
        header={<div>Header</div>}
        footer={<div>Footer</div>}
        loading={false}
        dataSource={data}
        bordered={true}
        loadMore={<div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}><Button>loadMore</Button></div>}
        renderItem={item => <div>{item}</div>}
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
          position: "top"
        }}
      />
      <div style={{ margin: "20px 0px" }}>
        {renderListItem()}
      </div>
      <div style={{ margin: "20px 0px" }}>
        <ListMeteDemo />
      </div>
      <div style={{ margin: "20px 0px" }}>
        <ListGridDemo />
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
