---
order: 1
title:
  zh-CN: react-router
  en-US: basic usage
desc:
  zh-CN: 和 `react-router@2` `react-router@3` 进行结合使用。
  en-US: basic usage description
---

## zh-CN

配合react-router

## en-US

The most basic usage

```jsx
import { Breadcrumb } from 'td-ui';
import { Router, Route, Link, hashHistory } from 'react-router';
const BreadcrumbItem = Breadcrumb.Item;
const Apps = () => (
  <ul className="app-list">
    <li>
      <Link to="/apps/1">Application1</Link>：<Link to="/apps/1/detail">Detail</Link>
    </li>
    <li>
      <Link to="/apps/2">Application2</Link>：<Link to="/apps/2/detail/yc">Detail</Link>
    </li>
  </ul>
);
class Home extends React.Component {
  render() {
    const { routes, params, children } = this.props;
    console.log(this.props);
    return (
      <div className="demo">
        <div className="demo-nav">
          <Link to="/">Home</Link>
          <Link to="/apps">Application List</Link>
        </div>
        {children || '路由DEMO'}
        <Breadcrumb routes={routes} params={params} />
      </div>
    );
  }
}

ReactDOM.render(
    <Router history={hashHistory}>
      <Route name="home" breadcrumbName="Home" path="/" component={Home}>
        <Route name="apps" breadcrumbName="Application List" path="apps" component={Apps}>
          <Route name="app" breadcrumbName="Application:id" path=":id">
            <Route name="detail" breadcrumbName="Detail :name" path="detail(/:name)" />
          </Route>
        </Route>
      </Route>
    </Router>
, MOUNT_NODE);
```
```css
.demo {
  margin: 16px;
}
.demo .demo-nav{
    height: 30px;
    line-height: 30px;
    margin-bottom: 16px;
    background: #f8f8f8;
}
.demo .demo-nav a {
  line-height: 30px;
  padding: 0 8px;
  text-decoration: none;
  color: #49a9ee;
}
.app-list {
  margin-top: 16px;
}
.app-list a {
  line-height: 30px;
  padding: 0 8px;
  text-decoration: none;
  color: #49a9ee;
}
```