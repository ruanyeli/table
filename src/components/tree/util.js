import React from 'react';
// 判断两个数组的值是否相等
export function arrEqual(arr, brr) {
  return Array.isArray(arr) && Array.isArray(brr) && arr.join('') === brr.join('');
}

// 判断每个节点是否有子节点，返回其子节点的个数
export function getChildLength(child) {
  let len = 0;
  const children = child.props.children;
  if (Array.isArray(children)) {
    len = children.length;
  } else if (children) {
    len = 1;
  }
  return len;
}

// 循环所有的子节点
export function loopAllChildren(childrens, cb) {
  const loop = (children, level) => {
    React.Children.forEach(children, (child, index) => {
      const pos = `${level}-${index}`;
      let len = getChildLength(child);
      if (child.props.children && child.type && child.type.isTreeNode) {
        loop(child.props.children, pos);
      }
      cb(child, index, child.key || pos, pos, len);
    });
  };
  loop(childrens, 0);
}

export function getCheck(treeNodesStates) {
  const halfCheckedKeys = [];
  const checkedKeys = [];
  const checkedNodes = [];
  Object.keys(treeNodesStates).forEach(item => {
    const itemObj = treeNodesStates[item];
    if (itemObj.checked) {
      checkedKeys.push(itemObj.key);
      checkedNodes.push(itemObj.node);
    } else if (itemObj.halfChecked) {
      halfCheckedKeys.push(itemObj.key);
    }
  });
  return {
    halfCheckedKeys,
    checkedKeys,
    checkedNodes
  };
}

function getAllParentCheckState(obj, pos) {
  const loop = zIndex => {
    const level = zIndex.split('-');
    if (level.length <= 2) return;
    level.splice(level.length - 1, 1);
    const parentPos = level.join('-'); // 父节点pos
    const parent = obj[parentPos]; // 父节点
    let parentLen = parent.len; // 父节点直属子节点个数
    let count = 0;
    // 选中或半选中
    for (let i = 0; i < parent.len; i++) {
      const childPos = `${parentPos}-${i}`;
      const child = obj[childPos];
      if (child.disableCheckbox) {
        parentLen--;
        continue;
      }
      if (child.checked) {
        count++;
      } else if (child.halfChecked) {
        count += 0.5;
      }
    }
    if (count >= parentLen) {
      parent.checked = true;
      parent.halfChecked = false;
    } else if (count > 0) {
      parent.checked = false;
      parent.halfChecked = true;
    } else {
      parent.checked = false;
      parent.halfChecked = false;
    }
    loop(parentPos);
  };
  loop(pos);
}
function getAllChildrenCheckState(obj, index, pos, checkIt) {
  const loop = (zIndex, len) => {
    if (len <= 0) return;
    for (let i = 0; i < len; i++) {
      const childPos = zIndex + '-' + i; // 子节点pos
      const child = obj[childPos]; // 子节点
      if (child.disableCheckbox) {
        child.checked = false;
        child.halfChecked = false;
      } else {
        child.checked = checkIt;
        child.halfChecked = false;
      }
      loop(childPos, child.len);
    }
  };
  loop(pos, index);
}
export function updateCheckedState(obj, index, pos, checkIt) {
  getAllChildrenCheckState(obj, index, pos, checkIt);
  getAllParentCheckState(obj, pos);
}
export function getOffset(ele) {
  let rect, doc, win, docElem;
  // getClientRects获取元素占据页面的所有矩形区域
  // getBoundingClientRect是DOM元素到浏览器可视范围的距离（不包含文档卷起的部分）
  if (!ele.getClientRects().length) {
    return { top: 0, left: 0 };
  }
  rect = ele.getBoundingClientRect();
  if (rect.width || rect.height) {
    doc = ele.ownerDocument;
    win = doc.defaultView;
    docElem = doc.documentElement;
    return {
      top: rect.top + win.pageYOffset - docElem.clientTop,
      left: rect.left + win.pageXOffset - docElem.clientLeft
    };
  }
  return rect;
}

export function browser(navigator) {
  let tem;
  const ua = navigator.userAgent;
  let M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return `IE ${tem[1] || ''}`;
  }
  if (M[1] === 'Chrome') {
    tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
    if (tem) return tem.slice(1).join(' ').replace('OPR', 'Opera');
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
  tem = ua.match(/version\/(\d+)/i);
  if (tem) {
    M.splice(1, 1, tem[1]);
  }
  return M.join(' ');
}
