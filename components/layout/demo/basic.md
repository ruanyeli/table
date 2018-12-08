---
order: 0
title:
  zh-CN: 基本结构
  en-US: Basic Structure
---

## zh-CN

典型的页面布局。

## en-US

Classic page layouts.

````jsx
import { Layout } from 'td-ui';
const { Header, Footer, Sider, Content } = Layout;

ReactDOM.render(
  <div>
    <Layout>
      <Header>Header</Header>
      <Content>Content</Content>
      <Footer>Footer</Footer>
    </Layout>

    <Layout>
      <Header>Header</Header>
      <Layout>
        <Sider>Sider</Sider>
        <Content>Content</Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>

    <Layout>
      <Header>Header</Header>
      <Layout>
        <Content>Content</Content>
        <Sider>Sider</Sider>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>

    <Layout>
      <Sider collapsible trigger="click me">Sider</Sider>
      <Layout>
        <Header>Header</Header>
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  </div>
, mountNode);
````

<style>
.content-demo-inner {
  text-align: center;
}
.content-demo-inner .td-layout-header,
.content-demo-inner .td-layout-footer {
  background: #7dbcea;
  color: #fff;
}
.content-demo-inner .td-layout-footer {
  line-height: 1.5;
}
.content-demo-inner .td-layout-sider {
  background: #3ba0e9;
  color: #fff;
  line-height: 120px;
}
.content-demo-inner .td-layout-content {
  background: rgba(16, 142, 233, 1);
  color: #fff;
  min-height: 120px;
  line-height: 120px;
}
.content-demo-inner > div > .td-layout {
  margin-bottom: 48px;
}
.content-demo-inner div > .td-layout:last-child {
  margin: 0;
}
.content-demo-inner .code {
  text-align: left;
}
</style>