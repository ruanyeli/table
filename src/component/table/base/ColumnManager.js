/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-07-03 10:00:40
 * @Last modified by:   yzf
 * @Last modified time: 2017-07-03 10:00:42
 *
 * a fork of rc-table
 */

import React from 'react';

export default class ColumnManager {
  _cached = {};

  constructor(columns, elements) {
    this.columns = columns || this.normalize(elements);
  }

  isAnyColumnsFixed() {//判断是否有列是固定的
    return this._cache('isAnyColumnsFixed', () => {
      return this.columns.some(column => !!column.fixed);
    });
  }

  isAnyColumnsLeftFixed() {//判断是否有列靠左固定 column.fixed === 'left' || column.fixed === true 返回true
    return this._cache('isAnyColumnsLeftFixed', () => {
      return this.columns.some(
        column => column.fixed === 'left' || column.fixed === true //column.fixed默认为靠左固定
      );
    });
  }

  isAnyColumnsRightFixed() {//判断是否有列靠右固定  column.fixed === 'right'返回true
    return this._cache('isAnyColumnsRightFixed', () => {
      return this.columns.some(
        column => column.fixed === 'right' 
      );
    });
  }

  leftColumns() { //column.fixed === 'left' || column.fixed === true 返回 column=true
    return this._cache('leftColumns', () => {
      return this.groupedColumns().filter(
        column => column.fixed === 'left' || column.fixed === true
      );
    });
  }

  rightColumns() {
    return this._cache('rightColumns', () => {
      return this.groupedColumns().filter(
        column => column.fixed === 'right'
      );
    });
  }

  leafColumns() { //叶子列 
    return this._cache('leafColumns', () =>
      this._leafColumns(this.columns)
    );
  }

  leftLeafColumns() { //固定在左边的叶子列
    return this._cache('leftLeafColumns', () =>
      this._leafColumns(this.leftColumns())
    );
  }

  rightLeafColumns() {//固定在右边的叶子列
    return this._cache('rightLeafColumns', () =>
      this._leafColumns(this.rightColumns())
    );
  }

  // add appropriate rowspan and colspan to column
  groupedColumns() {
    return this._cache('groupedColumns', () => {
      const _groupColumns = (columns, currentRow = 0, parentColumn = {}, rows = []) => {
        // track how many rows we got
        rows[currentRow] = rows[currentRow] || [];
        const grouped = [];
        const setRowSpan = column => {
          const rowSpan = rows.length - currentRow;
          if (column &&
            !column.children && // parent columns are supposed to be one row
            rowSpan > 1 &&
            (!column.rowSpan || column.rowSpan < rowSpan)
          ) {
            column.rowSpan = rowSpan;
          }
        };
        columns.forEach((column, index) => {
          const newColumn = { ...column };
          rows[currentRow].push(newColumn);
          parentColumn.colSpan = parentColumn.colSpan || 0;
          if (newColumn.children && newColumn.children.length > 0) {
            newColumn.children = _groupColumns(newColumn.children, currentRow + 1, newColumn, rows);
            parentColumn.colSpan = parentColumn.colSpan + newColumn.colSpan;
          } else {
            parentColumn.colSpan++;
          }
          // update rowspan to all same row columns
          for (let i = 0; i < rows[currentRow].length - 1; ++i) {
            setRowSpan(rows[currentRow][i]);
          }
          // last column, update rowspan immediately
          if (index + 1 === columns.length) {
            setRowSpan(newColumn);
          }
          grouped.push(newColumn);
        });
        return grouped;
      };
      return _groupColumns(this.columns);
    });
  }

  normalize(elements) { //元素标准化
    const columns = [];
    React.Children.forEach(elements, element => {
      if (!React.isValidElement(element)) {//不是react元素，直接返回
        return;
      }
      const column = { ...element.props };
      if (element.key){
        column.key = element.key;
      }
      if (element.type.isTableColumnGroup) {//element含有多列
        column.children = this.normalize(column.children);
      }
      columns.push(column);
    });
    return columns;
  }

  reset(columns, elements) {
    this.columns = columns || this.normalize(elements);
    this._cached = {};
  }

  _cache(name, fn) {
    if (name in this._cached) {
      return this._cached[name];
    }
    this._cached[name] = fn();
    return this._cached[name];
  }

  _leafColumns(columns) {
    const leafColumns = [];
    columns.forEach(column => {
      if (!column.children) {//如果没有子节点
        leafColumns.push(column);//将columnpush到leafColumns
      } else {//如果有的话，递归
        leafColumns.push(...this._leafColumns(column.children));
      }
    });
    return leafColumns;
  }
}
