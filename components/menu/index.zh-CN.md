---
category: Components
type: Navigation
title: Menu
subtitle: 导航菜单
order: 3
---

为页面和功能提供导航的菜单列表。

导航菜单是一个网站的灵魂，用户依赖导航在各个页面中进行跳转。一般分为顶部导航和侧边导航，顶部导航提供全局性的类目和功能，侧边导航提供多级结构来收纳和排列网站架构。

## API
Menu 的属性说明如下：

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
mode | 菜单类型，现在支持垂直、水平、和内嵌模式三种 | string:`inline` `vertical` `horizontal`  | inline
multiple | 是否允许多选 | boolean | false
defaultSelectedKeys | 初始选中的菜单项 key 数组 | string[] |  |
selectedKeys | 当前展开的 SubMenu 菜单项 key 数组 | string[] |  |
onSelect | 被选中时调 | Function(selectedKeys: string[]) | 无 |
defaultOpenKeys | 初始展开的 SubMenu 菜单项 key 数组 | string[] |  |
openKeys | 当前展开的 SubMenu 菜单项 key 数组 | string[] |  |
onOpenChange | SubMenu 展开/关闭的回调 | Function(openKeys: string[]) | 无 |
style | Menu 样式 | Object | 无 |

Menu.Item 的属性说明如下：

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
children | 步骤的详情描述，可选 | string\|ReactNode | -  
key | item 的唯一标志 | string |
disabled | 是否禁用 | boolean |

Menu.SubMenu 的属性说明如下：

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
title | 子菜单项值 | string\|ReactNode | -
children | 步骤的详情描述，可选 | Array<MenuItem\|SubMenu\|ItemGroup> | -  
key | item 的唯一标志 | string |

Menu.ItemGroup 的属性说明如下：

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
title | 分组标题 | string\|ReactNode | -
children | 分组的菜单项 | MenuItem[] | -  
