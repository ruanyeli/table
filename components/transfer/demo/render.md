---
order: 0
title:
  zh-CN: 自定义渲染函数
  en-US: Type
desc:
  zh-CN: 根据传入render函数渲染每一项的展示，render的参数为option中每项对应的对象。
  en-US: Type
---

## zh-CN

## en-US

There are `primary` button, `default` button, and `dashed` button in td-ui.

````jsx
import { Transfer } from 'td-ui';

const mockData = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
    disabled: i % 3 < 1
  });
}
mockData[2].children = [{
  key: '2-0',
  title: `content2-0`
}, {
  key: '2-1',
  title: `content2-1`
}, {
  key: '2-2',
  title: `content2-2`,
  children: [{
    key: '2-2-0',
    title: `content2-2-0`
  }, {
    key: '2-2-1',
    title: `content2-2-1`
  }]
}]
mockData[4].children = [{
  key: '4-0',
  title: `content4-0`
}, {
  key: '4-1',
  title: `content4-1`
}]

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: mockData,
      value: []
    }
  }

  render() {
    const { dataSource } = this.state;
    return <div>
      <div style={{width: 450}}>
        <Transfer
          dataSource={dataSource}
          titles={['Source', 'Target']}
          value={this.state.value}
          onChange={value => {
            this.setState({
              value
            });
            console.log(value);
          }}
          render={item => {
              return <div style={{display: 'inline-block'}}>{item.title}<span style={{marginLeft: 10}}>({item.key})</span></div>
          }}
        />
      </div>
    </div>
  }
}

ReactDOM.render(
  <Demo />
, mountNode);
````
