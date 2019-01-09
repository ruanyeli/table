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
    pageSize: 10, //每页默认展示10条数据
    defaultCurrent: 1, //当前页数默认为第一页
  }

  static propTypes = {
    columns: PropTypes.arrayOf(PropTypes.object),
    dataSource: PropTypes.arrayOf(PropTypes.object),
    rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    // onRow: PropTypes.func,
    onHeaderRow: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    pagination: PropTypes.bool,
    pageSize: PropTypes.number,
    defaultCurrent: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      pageSize: 10,
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
    // console.log('onHeaderRow', headerRowHandle);

    const tableHead = columns.map((col, index) => {
      return (
        <th key={col.key}
          style={{ width: col.width ? col.width : 'auto', textAlign: col.align ? col.align : 'left' }}
        >
          {col.onHeaderCell ? col.onHeaderCell(col.dataIndex, 0, index) : col.dataIndex}
        </th>
      );
    });

    const dataShow = pagination ? (dataSource.slice((this.state.current - 1) * 10,
      this.state.current * 10)) : dataSource;
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


    const tableCls = cn(prefixCls);
    const showPagination = pagination
      ? (
        <Pagination className={`${prefixCls}-pagination`}
          total={dataSource.length}
          // showTotal={total => `Total ${total} items`}
          pageSize={this.state.pageSize}
          defaultCurrent={1}
          current={this.state.current}
          onChange={this.onChange}
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
