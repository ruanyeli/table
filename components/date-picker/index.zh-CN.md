---
category: Components
type: Data Entry
title: DatePicker
subtitle: 日期选择框
---

输入或选择日期的控件。

当用户需要输入一个日期，可以点击标准输入框，弹出日期面板进行选择。

## API

### DatePicker

| 参数          | 说明            | 类型     | 默认值        |
|--------------|----------------|----------|--------------|
| value        | 日期           | [moment](http://momentjs.com/)   | 无           |
| defaultPickerValue | 默认日期       | [moment](http://momentjs.com/)   | 无           |
| onChange     | 时间发生变化的回调 | function(date: moment, dateString: string) | 无           |
| format       | 展示的日期格式，配置参考 [moment.js](http://momentjs.com/) | string   | "YYYY-MM-DD HH:mm:ss" |
| allowClear   | 是否显示清除按钮 | boolean     | true         |
| disabled     | 禁用           | boolean     | false        |
| disabledDate | 不可选择的日期 | function | 无           |
| placeholder  | 输入框提示文字 | string\|RangePicker[] | - |
| renderExtraFooter  | 在面板中添加额外的页脚	 | (value) => React.ReactNode | - |

### RangePicker

| 参数         | 说明           | 类型     | 默认值       |
|--------------|----------------|----------|--------------|
| value        | 日期          | [moment](http://momentjs.com/)[] | 无           |
| defaultValue | 默认日期       | [moment](http://momentjs.com/)[]   | 无           |
| format       | 展示的日期格式  | string    | "YYYY-MM-DD HH:mm:ss" |
| open         | 是否打开       | boolean     | false        |
| onOpenChange | 弹出日历和关闭日历的回调 | function(status)     | 无        |
| onChange     | 时间发生变化的回调，发生在用户选择时间时 | function(dates: [moment, moment], dateStrings: [string, string]) | 无           |
| disabledTime | 不可选择的时间 | function(dates: [moment, moment], partial: `'start'|'end'`) | 无 |
| showTime     | 增加时间选择功能  | Object\|boolean | [TimePicker Options](/components/time-picker/#API) |
| startPlaceholde | 输入框提示文字 | string\|RangePicker[] | - |
| endPlaceholder  | 输入框提示文字 | string\|RangePicker[] | - |
| allowClear   | 是否显示清除按钮 | boolean     | true         |
| disabled     | 禁用           | boolean     | false        |
| style        | 自定义输入框样式     | object     | {}   |
| renderExtraFooter  | 在面板中添加额外的页脚	 | (value) => React.ReactNode | - |

