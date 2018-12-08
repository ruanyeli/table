---
category: High
type:
title: CommonTable
subtitle: 通用组合表格
---

集搜索与查询参数一体的表格，通过传入config对象配置查询条件和表格。


## API

CommonTable

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
config | 配置对象 | object	| -
onSearch	| 查询函数 | (url) => new Promise() | -
afterSearch | 查询完回调 |	(res) => Object | -

重置某一项 示例代码：
---
this.configObj.setStateValueFn("endTime",moment());
在组件外查询表格 参数传入true表示首次点击查询 传入false或者不传表示翻页或者切换页数（按照上一次的搜索条件查询）
---
this.configObj.searchListFn(true);
loading可支持传入，详情参见index.js
---


