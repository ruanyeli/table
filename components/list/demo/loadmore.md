---
order: 1
title:
  zh-CN: 加载更多
  en-US: Load more
---

## zh-CN

可通过 `loadMore` 属性实现加载更多功能。

## en-US

Load more list with `loadMore` property.

````jsx
import { List, Button } from 'td-ui';


const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;
const res = [
  {
    title: '标题标题标题',
    description: "这是描述内容，这是描述内容，这是描述内容 ，这是描述内容",
  },
  {
    title: '标题标题标题',
    description: "这是描述内容，这是描述内容，这是描述内容 ，这是描述内容",
  },
  {
    title: '标题标题标题',
    description: "这是描述内容，这是描述内容，这是描述内容 ，这是描述内容",
  },
]
class LoadMoreList extends React.Component {
  state = {
    initLoading: false,
    loading: false,
    data: res.map((item, index) => {
           return {
             ...item,
             title: `${item.title}${index + 1}`,
           }
         }),
    list: res.map((item, index) => {
           return {
             ...item,
             title: `${item.title}${index + 1}`,
           }
         }),
  }

  // componentDidMount() {
  //   this.getData((res) => {
  //     this.setState({
  //       initLoading: false,
  //       data: res,
  //       list: res,
  //     });
  //   });
  // }

  // getData = (callback) => {
  //   reqwest({
  //     url: fakeDataUrl,
  //     type: 'json',
  //     method: 'get',
  //     contentType: 'application/json',
  //     success: (res) => {
  //       callback(res);
  //     },
  //   });
  // }
  getData = (cb) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const { data } = this.state;
        const listData = data.concat(
         res.map((item, index) => {
           return {
             ...item,
             title: `${item.title}${index + 1 + data.length}`,
           }
         })
        )
        resolve(cb(listData));
      }, 1500);
    });
  }
  onLoadMore = () => {
    this.setState({
      loading: true,
    });
    this.getData((data) => {
      this.setState({
        data,
        list: data,
        loading: false,
      });
    });
  }

  render() {
    const { initLoading, loading, list } = this.state;
    const loadMore = !initLoading && !loading ? (
      <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
        <Button onClick={this.onLoadMore}>loading more</Button>
      </div>
    ) : null;

    return (
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list}
        renderItem={item => (
          <List.Item actions={[<a>edit</a>, <a>more</a>]}>
              <List.Item.Meta
                avatar={null}
                title={<a href="">{item.title}</a>}
                description={item.description}
              />
              <div>content</div>
          </List.Item>
        )}
      />
    );
  }
}

ReactDOM.render(<LoadMoreList />, mountNode);
````

````css
.demo-loadmore-list {
  min-height: 350px;
}
````
