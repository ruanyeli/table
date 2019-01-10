import React, { Component } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import s from './style';
import is from '../util/is';
import Pagination from '../pagination';

function noop() { }

export default class Table extends Component {

  static defaultProps = {
    columns: [],
    dataSource: [],
    rowKey: '',
    onHeaderRow: noop,
    pagination: false,
  }

  static propTypes = {
    columns: PropTypes.arrayOf(PropTypes.object),
    dataSource: PropTypes.arrayOf(PropTypes.object),
    rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    onHeaderRow: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    pagination: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    const { current, defaultCurrent, defaultPageSize, pageSize } = props.pagination;
    let stateCurrent = 1;
    let statePageSize = 10;
    if (defaultCurrent) {
      stateCurrent = defaultCurrent;
    }
    if (current) {
      stateCurrent = current;
    }

    if (defaultPageSize) {
      statePageSize = defaultPageSize;
    }
    if (pageSize) {
      statePageSize = pageSize;
    }

    this.state = {
      current: stateCurrent,
      pageSize: statePageSize,
    };
  }

  onChange = (page) => {
    console.log(page);
    this.setState({
      current: page,
    });
  }

  render() {
    const { columns, dataSource, rowKey, onRow, onHeaderRow, pagination } = this.props;
    const prefixCls = s.tablePrefix;
    const headerRowHandle = is.Function(onHeaderRow) ? onHeaderRow(columns) : {};
    const { current } = this.state;
    const { pageSize } = this.state;
    const tableCls = cn(prefixCls);

    const tableHead = columns.map((col, index) => {
      return (
        <th key={col.key}
          style={{ width: col.width ? col.width : 'auto', textAlign: col.align ? col.align : 'left' }}
        >
          {col.onHeaderCell ? col.onHeaderCell(col.dataIndex, 0, index) : col.dataIndex}
        </th>
      );
    });

    const dataShow = pagination ? (dataSource.slice((current - 1) * pageSize, current * pageSize))
      : dataSource;
    const tableBody = dataShow.map((row, index) => {
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

    const showPagination = pagination
      ? (
        <Pagination className={`${prefixCls}-pagination`}
          total={dataSource.length}
          // showTotal={total => `Total ${total} items`}
          pageSize={pageSize}
          defaultCurrent={1}
          current={current}
          onChange={this.onChange}
          pageSizeOptions={pagination.pageSizeOptions}
          showSizeChanger={pagination.showSizeChanger}
          showQuickJumper={pagination.showQuickJumper}
          simple={pagination.simple}
          showTotal={pagination.showTotal}
          size={pagination.size}
          onShowSizeChange={pagination.onShowSizeChange}
        />
      ) : '';

    return (
      <div className={`${prefixCls}-wrapper`}>
        <table className={tableCls}>
          <thead className={`${prefixCls}-thead`}>
            <tr {...headerRowHandle}>
              {tableHead}
            </tr>
          </thead>
          <tbody className={`${prefixCls}-tbody`}>
            {tableBody}
          </tbody>
        </table>
        {/* total等于行数 pageSize每一页展示多少条目 */}
        {showPagination}
      </div>
    );
  }
}
