## Table 组件需求说明

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | Table 列定义,可自定义渲染结果 | Array | [] |
| dataSource | 数据源 | Array | [] |
| rowKey | 每行数据的key | String\|(row) => String | 'id' |
| onHeaderRow | 头部每行可添加事件 | Function(row, index) | - |
| onRow | 每行数据可添加事件 | Function(row, index) | - |
| pagination | 分页展示 | Array | false |
| size | 表格大小	| default , middle ,small	| default|



## Columns 需求

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| width | 宽度 | number | - |
| align | 对齐 | 'left' \| 'right' \| 'center' | 'left' |
| onCell | 数据单元格点击事件 | Function(text, row, index) | '-' |
| onHeaderCell | 头部单元格点击事件 | Function(text, row, index) | '-' |

##Pagination 需求
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| current | 当前页数 | number | - |
| defaultCurrent	| 默认的当前页数 |	number	| 1 |
| defaultPageSize	| 默认的每页条数	| number	| 10 |
| hideOnSinglePage	| 只有一页时是否隐藏分页器 |	boolean	| false |
| pageSize | 每页展示数据量 | number | 10 |
| hideOnSinglePage | 当前页 | number | true |
| showQuickJumper | 是否可以快速跳转至某页 | boolean|	false |
| showSizeChanger	|是否可以改变pageSize	| boolean	| false |
| showTotal	| 用于显示数据总量和当前数据顺序 | Function(total, range)	| - |
| simple	|当添加该属性时，显示为简单分页	| boolean	| - |
| size	| 当为「small」时，是小尺寸分页	| string	| "" |
| total	| 数据总数	| number	| 0 | 
| onChange	| 页码改变的回调，参数是改变后的页码及每页条数	| Function(page, pageSize)	| noop |
| onShowSizeChange	| pageSize 变化的回调	| Function(current, size)	| noop |

     