---
order: 0
title:
  zh-CN: 基本用法
  en-US: Type
desc:
  zh-CN: 最基本的用法，展示了 dataSource、titles 以及回调函数 onChange 的用法。
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
        />
      </div>
    </div>
  }
}

ReactDOM.render(
  <Demo />
, mountNode);
````
