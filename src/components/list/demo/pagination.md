---
order: 2
title:
  zh-CN: 使用分页功能
  en-US: pagination
---

## zh-CN

可通过 `pagination` 属性实现分页展示功能。

```jsx
import { List } from 'td-ui';

const data = [];
for (let i = 0; i < 23; i++) {
  data.push({
    href: 'http://tdesign.tongdun.me',
    title: `tdesign part ${i}`,
    avatar: 'https://www.tongdun.cn/assets/430c2c7a39d607b1bbe9ef49918fa291.png',
    description: 'tdesign , a design language for background applications, is refined by tdesign UED Team.',
    content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

ReactDOM.render(
    <List
      itemLayout="horizontal"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 3,
      }}
      dataSource={data}
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
  ,
  mountNode);
```