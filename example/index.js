// 组件的开发用例在此处统一导出 命名导出
// export { default as TableExample } from './table';

import React from 'react';
// import LoadingExample from './loading';
import TableExample from './table';

export default class index extends React.Component {
  render() {
    return (
      <div>
        <TableExample />
      </div>
    );
  }
}
