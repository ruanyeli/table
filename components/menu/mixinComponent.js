import React from 'react';

export default class MixinComponent extends React.Component {
  renderItem = () => {
    const { prefixCls, level, openKeys, selectedKeys, domKeys, onSelect, onOpenChange, mode, multiple, children, onClick } = this.props;
    const eventKey = this.props.eventKey || '';
    const items = React.Children.map(children, (child, index) => {
      if (!child) {
        return ''
      }
      let newChildProps = {
        prefixCls,
        openKeys,
        selectedKeys,
        domKeys,
        onSelect,
        onOpenChange,
        level: level ? (level + this.num) : 1,
        eventKey: child.key || `${eventKey}-${index}`,
        mode,
        multiple,
        disabled: child.props.disabled || false,
        onClick
      }
      return React.cloneElement(child, newChildProps);
    })
    return items;
  }
}
