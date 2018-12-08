import React, { Component } from 'react';
import sortable from './base/sortableComposition';

class SortItem extends Component {

  render() {
    const { sortData, direction, children, items, ...nestProps  } = this.props;
    return (
      <div {...nestProps}>
        <div className="item">{children}</div>
      </div>
    );
  }
}

export default sortable(SortItem)