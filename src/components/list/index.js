import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import Pagination from '../pagination';
import Loading from '../loading';
import { Row } from '../grid';
import s from './style';
import Item from './Item';

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paginationCurrent: 1,
    };
  }
  static defaultProps = {
    dataSource: [],
    prefixCls: 'td-list',
    bordered: false,
    split: true,
    loading: false,
    pagination: false,
  };
  static Item = Item;


  defaultPaginationProps = {
    current: 1,
    pageSize: 10,
    onChange: (page, pageSize) => {
      const { pagination } = this.props;
      this.setState({
        paginationCurrent: page,
      });
      if (pagination && pagination.onChange) {
        pagination.onChange(page, pageSize);
      }
    },
    total: 0,
  };
  keys = [];
  renderItem = (item, index) => {
    const { dataSource, renderItem, rowKey } = this.props;
    let key;

    if (typeof rowKey === 'function') {
      key = rowKey(dataSource[index]);
    } else if (typeof rowKey === 'string') {
      key = dataSource[rowKey];
    } else {
      key = dataSource.key;
    }

    if (!key) {
      key = `list-item-${index}`;
    }

    this.keys[index] = key;

    return renderItem(item, index);
  }

  renderEmpty = (contextLocale) => {
    const locale = { ...contextLocale, ...this.props.locale };
    return (
      <div className={`${this.props.prefixCls}-empty-text`}>
        {locale.emptyText}
      </div>
    );
  }
  isSomethingAfterLastItem() {
    const { loadMore, pagination, footer } = this.props;
    return !!(loadMore || pagination || footer);
  }

  render() {
    const { paginationCurrent } = this.state;
    const {
      bordered,
      split,
      className,
      children,
      itemLayout,
      loadMore,
      pagination,
      prefixCls,
      grid,
      dataSource,
      size,
      rowKey,
      renderItem,
      header,
      footer,
      loading,
      locale,
      ...rest
    } = this.props;

    let loadingProp = loading;
    if (typeof loadingProp === 'boolean') {
      loadingProp = {
        loading: loadingProp,
      };
    }
    const isLoading = loadingProp && loadingProp.loading;

    // large => lg
    // small => sm
    let sizeCls = '';
    switch (size) {
      case 'large':
        sizeCls = 'lg';
        break;
      case 'small':
        sizeCls = 'sm';
      default:
        break;
    }

    const classString = classNames(prefixCls, className, {
      [`${prefixCls}-vertical`]: itemLayout === 'vertical',
      [`${prefixCls}-${sizeCls}`]: sizeCls,
      [`${prefixCls}-split`]: split,
      [`${prefixCls}-bordered`]: bordered,
      [`${prefixCls}-loading`]: isLoading,
      [`${prefixCls}-grid`]: grid,
      [`${prefixCls}-something-after-last-item`]: this.isSomethingAfterLastItem(),
    });
    // console.log('classString', classString, this.props);
    
    const paginationProps = {
      ...this.defaultPaginationProps,
      total: dataSource.length,
      current: paginationCurrent,
      ...pagination || {},
    };

    const largestPage = Math.ceil(
      paginationProps.total / paginationProps.pageSize,
    );
    if (paginationProps.current > largestPage) {
      paginationProps.current = largestPage;
    }
    const paginationContent = pagination ? (
      <div style={{ overflow: "hidden" }}>
        <Pagination
          className={`${prefixCls}-pagination`}
          {...paginationProps}
          onChange={this.defaultPaginationProps.onChange}
        />
      </div>
    ) : null;

    let splitDataSource = [...dataSource];
    if (pagination) {
      if (
        dataSource.length >
        (paginationProps.current - 1) * paginationProps.pageSize
      ) {
        splitDataSource = [...dataSource].splice(
          (paginationProps.current - 1) * paginationProps.pageSize,
          paginationProps.pageSize,
        );
      }
    }

    let childrenContent;
    childrenContent = isLoading && <div style={{ minHeight: 53 }} />;
    if (splitDataSource.length > 0) {
      const items = splitDataSource.map((item, index) =>
        this.renderItem(item, index),
      );
      const childrenList = React.Children.map(items, (child, index) =>
        React.cloneElement(child, {
          key: this.keys[index],
        }),
      );

      childrenContent = grid ? (
        <Row gutter={grid.gutter}>{childrenList}</Row>
      ) : (
        childrenList
      );
    // console.log("childrenContent", childrenContent, childrenList, items);

    } else if (!children && !isLoading) {
      childrenContent = (
        <div>
         {this.renderEmpty()}
        </div>
      );
    }

    const paginationPosition = paginationProps.position || 'bottom';
    
    
    return (
      <div className={classString} {...rest}>
        {(paginationPosition === 'top' || paginationPosition === 'both') && paginationContent}
        {header && <div className={`${prefixCls}-header`}>{header}</div>}
        <Loading {...loadingProp}>
          <div>
            {childrenContent}
            {children}
          </div>
        </Loading>
        {footer && <div className={`${prefixCls}-footer`}>{footer}</div>}
        {loadMore || (paginationPosition === 'bottom' || paginationPosition === 'both') && paginationContent}
      </div>
    );
  }

  static childContextTypes = {
    grid: PropTypes.any,
  };
  
  getChildContext() {
    return {
      grid: this.props.grid,
    };
  }
}
