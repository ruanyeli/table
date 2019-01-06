## Table 组件需求说明

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | Table 列定义,可自定义渲染结果 | Array | [] |
| dataSource | 数据源 | Array | [] |
| rowKey | 每行数据的key | String\|(row) => String | 'id' |
| onHeaderRow | 头部每行可添加事件 | Function(row, index) | - |
| onRow | 每行数据可添加事件 | Function(row, index) | - |


## Columns 需求

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| width | 宽度 | number | - |
| align | 对齐 | 'left' \| 'right' \| 'center' | 'left' |
| onCell | 数据单元格点击事件 | Function(text, row, index) | '-' |
| onHeaderCell | 头部单元格点击事件 | Function(text, row, index) | '-' |

