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
    size: 'default',
  }

  static propTypes = {
    columns: PropTypes.arrayOf(PropTypes.object),
    dataSource: PropTypes.arrayOf(PropTypes.object),
    rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    onHeaderRow: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    pagination: PropTypes.bool,
    size: PropTypes.string,
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
    this.setState({
      current: page,
    });
  }

  render() {
    const { columns, dataSource, rowKey, onRow, onHeaderRow, pagination,
      size, rowSelection } = this.props;
    const prefixCls = s.tablePrefix;
    // const prefixClsSize = { prefixCls } - 'pagination';
    const headerRowHandle = is.Function(onHeaderRow) ? onHeaderRow(columns) : {};
    const { current } = this.state;
    const { pageSize } = this.state;
    const tableCls = cn(prefixCls);
    const showColumns = is.Object(rowSelection) ? [{
      title: <input type="checkbox" />,
      dataIndex: <input type="checkbox" />,
    }].concat(columns) : columns;

    const checkboxShow = is.Object(rowSelection) ? <td><input type="checkbox" /></td> : null;

    const dataShow = pagination ? (dataSource.slice((current - 1) * pageSize, current * pageSize))
      : dataSource;

    const tableHead = showColumns.map((col, index) => {
      return (
        <th key={col.key}
          style={{ width: col.width ? col.width : 'auto', textAlign: col.align ? col.align : 'left' }}
        >
          {col.onHeaderCell ? col.onHeaderCell(col.dataIndex, 0, index) : col.dataIndex}
        </th>
      );
    });

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
        <tr key={row[rowKey]}>
          {checkboxShow}
          {tableRow}
        </tr>
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
          hideOnSinglePage={pagination.hideOnSinglePage}
        />
      ) : '';

    return (
      <div className={`${prefixCls}-wrapper`}>
        <table className={`${tableCls}-${size}`}>
          <thead className={`${prefixCls}-thead-${size}`}>
            <tr {...headerRowHandle}>
              {tableHead}
            </tr>
          </thead>
          <tbody className={`${prefixCls}-tbody-${size}`}>
            {tableBody}
          </tbody>
        </table>
        {/* total等于行数 pageSize每一页展示多少条目 */}
        {showPagination}
      </div>
    );
  }
}
