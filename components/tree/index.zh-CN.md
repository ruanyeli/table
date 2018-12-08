---
category: Components
type: Data Display
title: Tree
subtitle: 树形控件
---

文件夹、组织架构、生物分类、国家地区等等，世间万物的大多数结构都是树形结构。使用树控件可以完整展现其中的层级关系，并具有展开收起选择等交互功能。

## API

### Tree props
参数 | 说明 | 类型 | 默认值
-----|-----|-----|-----|
multiple | 支持点选多个节点（节点本身） | boolean | false
checkable | 节点前添加 Checkbox 复选框 | boolean | false
defaultExpandAll | 默认展开所有树节点 | boolean | false
defaultExpandedKeys | 默认展开指定的树节点 | string[] | []
expandedKeys |（受控）展开指定的树节点 | string[] | []
autoExpandParent | 是否自动展开父节点 | boolean | true
defaultCheckedKeys | 默认选中复选框的树节点 | string[] | []
checkedKeys | 受控）选中复选框的树节点 | boolean | false
defaultSelectedKeys | 默认选中的树节点 | string[] | []
onExpand | 展开/收起节点时触发 | function(expandedKeys, {expanded: bool, node}) | ''
onCheck | 点击复选框触发 | function(checkedKeys, e:{checked: bool, checkedNodes, node, event}) | -
onSelect | 点击树节点触发 | function(selectedKeys, e:{selected: bool, selectedNodes, node, event}) | -
loadData | 异步加载数据 | function(node) | -
draggable | 设置节点可拖拽（IE>8） | boolean | false
onDragStart | 开始拖拽时调用 | function({event, node}) | -
onDragEnter | dragenter 触发时调用 | function({event, node, expandedKeys}) | -
onDragOver | dragover 触发时调用 | function({event, node}) | -
onDragLeave | dragleave 触发时调用 | function({event, node}) | -
onDragEnd | dragend 触发时调用 | function({event, node}) | -
onDrop | drop 触发时调用 | function({event, node, dragNode, dragNodesKeys}) | -
showLine | 是否展示连接线 | boolean | false

### TreeNode props
参数 | 说明 | 类型 | 默认值
-----|-----|-----|-----|
title | 标题 | string|ReactNode | '---'
disabled | 禁掉响应 | boolean | false
disableCheckbox | 禁掉 checkbox | boolean | false
key | 被树的 (default)ExpandedKeys / (default)CheckedKeys / (default)SelectedKeys 属性所用 | string | 内部计算出的节点位置
isLeaf | 设置为叶子节点 | boolean | false
