---
order: 1
title:
  zh-CN: sortHandle配置
  en-US: basic usage
desc:
  zh-CN: 某个dom才拖拽
  en-US: basic pagination
---

## zh-CN

## en-US

There are `primary` button, `default` button, and `dashed` button in td-ui.

```jsx
import { Sort } from 'td-ui';
const SortItem = Sort.SortItem;

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [{
        title: 'xxxxx1'
      }, {
        title: 'xxxxx2'
      }, {
        title: 'xxxxx3'
      }, {
        title: 'xxxxx4'
      }, {
        title: 'xxxxx5'
      }]
    }
  }

  render() {
    const { value } = this.state;
    return (
      <Sort
        onChange={(value) => {
          console.log(value);
          this.setState({
            value
          });
        }}
        value={value}
        sortHandle='title'
      >
        {
          value.map((item, index) => <SortItem className="vertical" sortData={item} key={index}>
            <div>
              <h2 className="title">{item.title}</h2>
              <div className="con">
                这里是内容这里是内容
              </div>
            </div>
          </SortItem>)
        }
      </Sort>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```

````css
.vertical {
  margin-bottom: 10px;
  width: 200px;
}
.vertical > div {
  border: 1px solid #eee;
  padding: 10px;
}
.vertical h2{
  border-bottom: 1px solid #eee;
}
.vertical .con{
  padding: 10px;
}
````
