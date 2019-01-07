import React, { Component } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import s from './style';

export default class Table extends Component {
  static defaultProps = {
    columns: [],
    dataSource: [],
    rowKey: '',
    onHeaderRow: {},
  }

  static propTypes = {
    columns: PropTypes.arrayOf(PropTypes.object),
    dataSource: PropTypes.arrayOf(PropTypes.object),
    rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    // onRow: PropTypes.func,
    onHeaderRow: PropTypes.func,
  };


  render() {
    const { columns, dataSource, rowKey, onRow, onHeaderRow } = this.props;
    const prefixCls = s.tablePrefix;
    const tableHead = columns.map((col, index) => {
      return (
        <th key={col.key} style={{ width: col.width ? col.width : 'auto', textAlign: col.align ? col.align : 'left' }}>
          {col.onHeaderCell ? col.onHeaderCell(col.dataIndex, 0, index) : col.dataIndex}
        </th>
      );
    });

    const tableBody = dataSource.map((row, index) => {
      const tableRow = columns.map((col) => {
        return (
          <td key={col.key} style={{ textAlign: col.align ? col.align : 'left' }}>
            {col.render ? col.render(row[col.dataIndex], row, index) : row[col.dataIndex]
            }
          </td>
        );
      });

      return (
        <tr key={row[rowKey]}>{tableRow}</tr>
      );
    });

    const tableCls = cn(prefixCls);
    // const tableOnHeaderRow = onHeaderRow ? onHeaderRow(tableHead) : {}; {...tableOnHeaderRow}
    console.log(onHeaderRow);
    return (
      <div>
        <table className={tableCls}>
          <thead className={`${prefixCls}-thead`} onHeaderRow>
            <tr>
              {tableHead}
            </tr>
          </thead>
          <tbody className={`${prefixCls}-tbody`}>
            {tableBody}
          </tbody>
        </table>
      </div>
    );
  }
}
