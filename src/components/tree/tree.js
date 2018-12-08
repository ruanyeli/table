/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import assign from 'object-assign';
import s from './style';
import { loopAllChildren, getOffset, getCheck, updateCheckedState, getChildLength } from './util';
const prefixCls = s.treePrefix;

function noop() {
}

class Tree extends Component {
  static defaultProps = {
    multiple: false,
    checkable: false,
    defaultExpandAll: false,
    autoExpandParent: true,
    defaultExpandedKeys: [],
    defaultCheckedKeys: [],
    defaultSelectedKeys: [],
    checkStrictly: false,
    showLine: false,
    showIcon: false,
    onExpand: noop,
    onCheck: noop,
    onSelect: noop,
    onDragStart: noop,
    onDragEnter: noop,
    onDragOver: noop,
    onDragLeave: noop,
    onDrop: noop,
    onDragEnd: noop,
    prefixCls
  }
  static propTypes = {
    multipe: PropTypes.bool,
    checkable: PropTypes.bool,
    checkStrictly: PropTypes.bool,
    autoExpandParent: PropTypes.bool,
    expandAll: PropTypes.bool,
    showLine: PropTypes.bool,
    showIcon: PropTypes.bool,
    expandedKeys: PropTypes.array,
    checkedKeys: PropTypes.array,
    selectedKeys: PropTypes.array,
    defaultCheckedKeys: PropTypes.array,
    defaultExpandedKeys: PropTypes.array,
    defaultSelectedKeys: PropTypes.array,
    onExpand: PropTypes.func,
    onCheck: PropTypes.func,
    onSelect: PropTypes.func,
    loadData: PropTypes.func,
    filterTreeNode: PropTypes.func
  }
  constructor(props) {
    super(props);
    const checkedKeys = this.getDefaultCheckedKeys(props);
    this.state = {
      expandedKeys: this.getDefaultExpandedKeys(props),
      selectedKeys: this.getDefaultSelectedKeys(props),
      dragNodesKeys: '',
      dragOverNodeKey: '',
      checkedKeys: checkedKeys.checkedKeys,
      halfCheckedKeys: checkedKeys.halfCheckedKeys

    }
  }
  componentWillReceiveProps(nextProps) {
    const { props } = this;
    const expandedKeys = this.getDefaultExpandedKeys(nextProps, true);
    const selectedKeys = this.getDefaultSelectedKeys(nextProps, true);
    const newState = {};
    if (expandedKeys) {
      newState.expandedKeys = expandedKeys;
    }
    const checkedKeys = nextProps.checkedKeys !== props.checkedKeys || props.loadData ? this.getDefaultCheckedKeys(nextProps, true) : undefined;
    if (checkedKeys) {
      newState.checkedKeys = checkedKeys.checkedKeys;
      newState.halfCheckedKeys = checkedKeys.halfCheckedKeys;
    }
    if (selectedKeys) {
      newState.selectedKeys = selectedKeys;
    }
    this.setState(newState);
  }
  getDefaultExpandedKeys(props, willReceiveProps) {
    let expandedKeys = willReceiveProps ? undefined : this.getFilterExpandedKeys(props, 'defaultExpandedKeys', props.defaultExpandedKeys.length ? false : props.defaultExpandAll);
    if ('expandedKeys' in props) {
      expandedKeys = (props.autoExpandParent ? this.getFilterExpandedKeys(props, 'expandedKeys', false) : props.expandedKeys) || [];
    }
    return expandedKeys;
  }
  getFilterExpandedKeys(props, expandKeyProp, expandAll) {
    const keys = props[expandKeyProp];
    if (!expandAll && !props.autoExpandParent) {
      return keys || [];
    }
    const expandedPostionArr = [];
    if (props.autoExpandParent) {
      loopAllChildren(props.children, (child, index, key, pos, len) => {
        if (keys.indexOf(key) !== -1) {
          expandedPostionArr.push(pos);
        }
      })
    }
    const filterExpandedKeys = [];
    loopAllChildren(props.children, (child, index, key, pos, len) => {
      if (expandAll) {
        filterExpandedKeys.push(key);
      } else if (props.autoExpandParent) {
        // 找到对应的父节点，展开
        const regExp = new RegExp('^' + pos);
        expandedPostionArr.forEach(p => {
          if (regExp.test(p) && filterExpandedKeys.indexOf(key) === -1) {
            filterExpandedKeys.push(key);
          }
        })
      }
    })
    return filterExpandedKeys;
  }
  getDefaultCheckedKeys(props, willReceiveProps) {
    if (!props.checkable) {
      return { checkedKeys: [], halfCheckedKeys: [] };
    }
    let checkedKeys = props.checkedKeys || (willReceiveProps && !props.loadData ? undefined : props.defaultCheckedKeys);
    checkedKeys = { checkedKeys, halfCheckedKeys: [] };
    if (!props.checkStrictly) {
      const checked = checkedKeys.checkedKeys || [];
      const treeNodesStates = this.generateTreeNodesStates(props.children, checked);
      return getCheck(treeNodesStates);
    }
    return checkedKeys;
  }
  getDefaultSelectedKeys(props, willReceiveProps) {
    const getKeys = keys => {
      if (props.multiple) {
        return [...keys];
      }
      if (keys.length) {
        return [keys[0]];
      }
      return keys;
    }
    let selectedKeys = willReceiveProps ? undefined : getKeys(props.defaultSelectedKeys);
    if ('selectedKeys' in props) {
      selectedKeys = getKeys(props.selectedKeys);
    }
    return selectedKeys;
  }
  onExpand(treeNode) {
    const { state, props } = this;
    let expanded = !treeNode.props.expanded;
    const key = treeNode.props.eventKey;
    const expandedKeys = [...state.expandedKeys];
    const index = expandedKeys.indexOf(key);
    if (expanded && index === -1) {
      expandedKeys.push(key);
    } else if (!expanded && index !== -1) {
      expandedKeys.splice(index, 1);
    }
    if (!('expandedKeys' in this.props)) {
      this.setState({expandedKeys});
    }
    props.onExpand(expandedKeys, {node: treeNode, expanded});
    if (expanded && props.loadData) {
      return props.loadData(treeNode).then(() => {
        if (!('expandedKeys' in this.props)) {
          this.setState({expandedKeys});
        }
      })
    }
  }
  generateTreeNodesStates(children, checkedKeys) {
    const treeNodesStates = {};
    const checkedNodes = [];
    loopAllChildren(children, (child, index, key, pos, len) => {
      treeNodesStates[pos] = {
        node: child,
        key,
        pos,
        len,
        checked: false,
        halfChecked: false,
        disabled: child.props.disabled,
        disableCheckbox: child.props.disableCheckbox
      }
      if (checkedKeys.indexOf(key) !== -1) {
        treeNodesStates[pos].checked = true;
        checkedNodes.push({pos, len})
      }
    });
    checkedNodes.forEach(item => {
      updateCheckedState(treeNodesStates, item.len, item.pos, true);
    })
    return treeNodesStates;
  }
  onContextMenu(e, treeNode) {
    if (this.props.onRightClick) {
      e.preventDefault();
      this.props.onRightClick({event: e, node: treeNode});
    }
  }
  onCheck = treeNode => {
    const { state, props } = this;
    let checked = !treeNode.props.checked;
    let halfChecked = treeNode.props.halfChecked;
    if (halfChecked) {
      checked = true;
    }
    const newSt = {
      event: 'check',
      node: treeNode,
      checked
    }
    if (props.checkStrictly) {
      const eventKey = treeNode.props.eventKey;
      const checkedKeys = [...state.checkedKeys];
      const index = checkedKeys.indexOf(eventKey);
      if (checked && index === -1) {
        checkedKeys.push(eventKey);
      }
      if (!checked && index > -1) {
        checkedKeys.splice(index, 1);
      }
      newSt.checkNodes = [];
      loopAllChildren(props.children, child => {
        if (checkedKeys.indexOf(child.key) !== -1) {
          newSt.checkNodes.push(item);
        }
      })
      if (!('checkedKeys' in props)) {
        this.setState({
          checkedKeys
        })
      }
      props.onCheck(checkedKeys, newSt);
    } else {
      const treeNodesStates = this.generateTreeNodesStates(props.children, state.checkedKeys);
      treeNodesStates[treeNode.props.pos].checked = checked;
      treeNodesStates[treeNode.props.pos].halfChecked = false;
      updateCheckedState(treeNodesStates, getChildLength(treeNode), treeNode.props.pos, checked);
      const checkKeys = getCheck(treeNodesStates);
      newSt.checkNodes = checkKeys.checkNodes;
      newSt.halfCheckedKeys = checkKeys.halfCheckedKeys;
      if (!('checkedKeys' in props)) {
        this.setState({
          checkedKeys: checkKeys.checkedKeys,
          halfCheckedKeys: checkKeys.halfCheckedKeys
        })
      }
      props.onCheck(checkKeys.checkedKeys, newSt);
    }
  }
  onSelect(treeNode) {
    const props = this.props;
    const selectedKeys = [...this.state.selectedKeys];
    const eventKey = treeNode.props.eventKey;
    const index = selectedKeys.indexOf(eventKey);
    let selected; // 判断这次是选中还是不选中
    if (index !== -1) {
      selected = false;
      selectedKeys.splice(index, 1);
    } else {
      selected = true;
      if (!props.multiple) {
        selectedKeys.length = 0;
      }
      selectedKeys.push(eventKey);
    }
    const newSt = {
      event: 'select',
      node: treeNode,
      selectedKeys: selectedKeys,
      selected
    }
    newSt.selectedNodes = [];
    if (selectedKeys.length > 0) {
      loopAllChildren(this.props.children, (child, index, key, pos, len) => {
        if (selectedKeys.indexOf(key) !== -1) {
          newSt.selectedNodes.push(child);
        }
      })
    }
    if (!('selectedKeys' in props)) {
      this.setState({selectedKeys});
    }
    this.props.onSelect(selectedKeys, newSt);
  }
  onDragStart(e, treeNode) {
    this.dragNode = treeNode;
    this.dragNodesKeys = this.getDragNodes(treeNode);
    const st = {
      dragNodesKeys: this.dragNodesKeys
    }
  }
  onDragEnterGap(e, treeNode) {
    const ele = treeNode.selectHandle;
    const offsetTop = getOffset(ele).top;
    const offsetHeight = ele.offsetHeight;
    const pageY = e.pageY;
    const gapHeight = 2;
    if (pageY > offsetTop + offsetHeight - gapHeight) { // bottom
      this.dropPosition = 1;
      return 1;
    }
    if (pageY < offsetTop + gapHeight) { // top
      this.dropPosition = -1;
      return -1;
    }
    this.dropPosition = 0;
    return 0;
  }
  onDragEnter(e, treeNode) {
    const enterGap = this.onDragEnterGap(e, treeNode);
    if (this.dragNode.props.eventKey === treeNode.props.eventKey && enterGap === 0) {
      this.setState({
        dragOverNodeKey: ''
      });
      return;
    }
    const st = {
      dragOverNodeKey: treeNode.props.eventKey
    };
    const expandedKeys = this.getExpandedKeys(treeNode, true);
    if (expandedKeys) {
      st.expandedKeys = expandedKeys;
    }
    this.setState(st);
    this.props.onDragEnter({
      event: e,
      node: treeNode,
      expandedKeys: (expandedKeys && [...expandedKeys]) || [...this.state.expandedKeys]
    })
  }
  onDragOver(e, treeNode) {
    this.props.onDragOver({event: e, node: treeNode});
  }
  onDragLeave(e, treeNode) {
    this.props.onDragLeave({event: e, node: treeNode});
  }
  onDrop(e, treeNode) {
    const key = treeNode.props.eventKey;
    this.setState({
      dragOverNodeKey: '',
      dropNodeKey: key
    })
    if (this.dragNodesKeys.indexOf(key) !== -1) {
      if (console.warn) {
        console.warn('can not drop to dragNode(include it\'s children node)')
      };
      return false;
    }
    const posArr = treeNode.props.pos.split('-');
    const res = {
      event: e,
      node: treeNode,
      dragNode: this.dragNode,
      dragNodesKeys: [...this.dragNodesKeys],
      dropPosition: this.dropPosition + Number(posArr[posArr.length - 1])
    }
    if (this.dropPosition !== 0) {
      res.dropToGap = true;
    }
    this.props.onDrop(res);
  }
  onDragEnd(e, treeNode) {
    this.setState({
      dragOverNodeKey: ''
    });
    this.props.onDragEnd({event: e, node: treeNode});
  }
  getDragNodes(treeNode) {
    const dragNodesKeys = [];
    const tPos = treeNode.props.pos;
    const regExp = new RegExp('^' + tPos);
    loopAllChildren(this.props.children, (child, index, key, pos, len) => {
      if (regExp.test(pos)) {
        dragNodesKeys.push(key);
      }
    })
    return dragNodesKeys;
  }
  getExpandedKeys(treeNode, expand) {
    const key = treeNode.props.eventKey;
    const expandedKeys = [...this.state.expandedKeys];
    const index = expandedKeys.indexOf(key);
    let exKeys;
    if (index > -1 && !expand) {
      exKeys = [...expandedKeys];
      exKeys.splice(expandedKeys, 1);
      return exKeys;
    }
    if (expand && index === -1) {
      return expandedKeys.concat([key]);
    }
  }
  filterTreeNode(treeNode) {
    const filterTreeNode = this.props.filterTreeNode;
    if (typeof filterTreeNode !== 'function' || treeNode.props.disabled) {
      return false;
    }
    return filterTreeNode.call(this, treeNode);
  }

  saveTreeRef = tree => this.tree = tree;
  
  renderTreeNode(child, index, level = 0) {
    const pos = `${level}-${index}`;
    const key = child.key || pos;
    const state = this.state;
    const props = this.props;
    const { checkedKeys, expandedKeys, selectedKeys, halfCheckedKeys } = state;
    const cloneProps = {
      root: this,
      prefixCls,
      ref: r => this[`treeNode-${key}`] = r,
      eventKey: key,
      pos,
      expanded: expandedKeys.indexOf(key) !== -1,
      selected: selectedKeys.indexOf(key) !== -1,
      showLine: props.showLine,
      showIcon: props.showIcon,
      loadData: props.loadData,
      draggable: props.draggable,
      filterTreeNode: this.filterTreeNode.bind(this),
      dragOver: state.dragOverNodeKey === key && this.dropPosition === 0,
      dragOverGapTop: state.dragOverNodeKey === key && this.dropPosition === -1,
      dragOverGapBottom: state.dragOverNodeKey === key && this.dropPosition === 1
    };
    if (props.checkable) {
      cloneProps.checkable = props.checkable;
      cloneProps.checked = checkedKeys.indexOf(key) !== -1;
      cloneProps.halfChecked = halfCheckedKeys.indexOf(key) !== -1;
    }
    return React.cloneElement(child, cloneProps);
  }
  render() {
    const props = this.props;
    const prefixCls = props.prefixCls;
    const domProps = {
      className: cn(prefixCls, props.className, {
        [`${prefixCls}-line`]: props.showLine
      }),
      role: 'tree-node'
    };
    return (
      <ul {...domProps} ref={this.saveTreeRef}>
        {
          React.Children.map(props.children, this.renderTreeNode, this)
        }
      </ul>
    )
  }
}

export default Tree;
