---
order: 3
title:
  zh-CN: 栅格列表
  en-US: Grid
---

## zh-CN

可以通过设置 `List` 的 `grid` 属性来实现栅格列表，`column` 可设置期望显示的列数。

## en-US

Creating a grid list by setting the `grid` property of List

````jsx
import { List, Row } from 'td-ui';

const data = [
  {
    title: 'Title 1',
    content: 'Grid Content 1'
  }, 
  {
    title: 'Title 2',
    content: 'Grid Content 2'
  },
  {
    title: 'Title 3',
    content: 'Grid Content 3'
  },
  {
    title: 'Title 4',
    content: 'Grid Content 4'
  },
  {
    title: 'Title 5',
    content: 'Grid Content 5'
  },
  {
    title: 'Title 6',
    content: 'Grid Content 6'
  },
];

ReactDOM.render(
  <div style={{ marginBottom: 16 }}>
    <List
      grid={{ gutter: 16, column: 4 }}
      dataSource={data}
      renderItem={item => (
        <List.Item>
          <Row className='card'>
            <Row className='card-title'>{item.title}</Row>
            <Row className='card-content'>{item.content}</Row>
          </Row>
        </List.Item>
      )}
    />
  </div>,
  mountNode);
````

````css
  .card {
    border: 1px solid #eee
  }
  .card-title {
    border-bottom: 1px solid #e8e8e8;
    padding: 0 24px;
    border-radius: 2px 2px 0 0;
    zoom: 1;
    margin-bottom: -1px;
    min-height: 48px;
    line-height: 48px;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
  }
  .card-content {
    padding: 24px;
  }
````