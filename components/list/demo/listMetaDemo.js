import React from 'react';
import List from '../index';
import Button from '../../button';
import Icon from '../../icon';

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'http://tdesign.tongdun.me',
    title: `tdesign part ${i}`,
    avatar: 'https://www.tongdun.cn/assets/430c2c7a39d607b1bbe9ef49918fa291.png',
    description: 'tdesign , a design language for background applications, is refined by tdesign UED Team.',
    content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

export default class Basic extends React.Component {

  render() {
    return (
      <List
        itemLayout="horizontal"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={listData}
        split={false}
        footer={<div><b>tdesign </b> footer part</div>}
        renderItem={item => (
          <List.Item
            key={item.title}
          >
            <List.Item.Meta
              avatar={<img src={item.avatar} />}
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
          </List.Item>
        )}
      />
    )
  }
}