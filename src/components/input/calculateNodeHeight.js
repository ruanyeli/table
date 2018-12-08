const HIDDEN_TEXTAREA_STYLE = `
  min-height:0 !important;
  max-height:none !important;
  height:0 !important;
  visibility:hidden !important;
  overflow:hidden !important;
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important;
`;
const SIZING_STYLE = [
  'letter-spacing',
  'line-height',
  'padding-top',
  'padding-bottom',
  'font-family',
  'font-weight',
  'font-size',
  'text-rendering',
  'text-transform',
  'width',
  'text-indent',
  'padding-left',
  'padding-right',
  'border-width',
  'box-sizing',
  'word-break'
];
let hiddenTextarea;

function calculateNodeStyling(node) {
  const style = window.getComputedStyle(node);
  const boxSizing = (
    style.getPropertyValue('box-sizing') || style.getPropertyValue('-webkit-box-sizing') || style.getPropertyValue('-moz-box-sizing')
  );
  const paddingSize = (
    parseFloat(style.getPropertyValue('padding-bottom')) + parseFloat(style.getPropertyValue('padding-top'))
  );
  const borderSize = (
    parseFloat(style.getPropertyValue('border-bottom-width')) +
    parseFloat(style.getPropertyValue('border-top-width'))
  );
  const sizingStyle = SIZING_STYLE
    .map(name => `${name}:${style.getPropertyValue(name)}`)
    .join(';');

  const nodeInfo = {
    sizingStyle,
    paddingSize,
    borderSize,
    boxSizing
  };
  return nodeInfo;
}

export default function calculateNodeHeight(node, minRows, maxRows) {
  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement('textarea');
    document.body.appendChild(hiddenTextarea);
  }

  let { paddingSize, sizingStyle, borderSize, boxSizing } = calculateNodeStyling(node);
  let minHeight, maxHeight;
  let overflowY = '';
  hiddenTextarea.value = node.value || node.placeholder || '';
  hiddenTextarea.setAttribute('style', `${sizingStyle};${HIDDEN_TEXTAREA_STYLE}`);

  let height = hiddenTextarea.scrollHeight;
  if (boxSizing === 'border-box') {
    height += borderSize;
  } else if (boxSizing === 'content-box') {
    height -= paddingSize;
  }

  if (minRows !== null || maxRows !== null) {
    hiddenTextarea.value = '';
    let singleRowHeight = hiddenTextarea.scrollHeight;
    if (minRows !== null) {
      minHeight = singleRowHeight * minRows;
      if (boxSizing === 'border-box') {
        minHeight += (borderSize + paddingSize);
      }
      height = Math.max(minHeight, height);
    }
    if (maxRows !== null) {
      maxHeight = singleRowHeight * maxRows;
      if (boxSizing === 'border-box') {
        maxHeight += (borderSize + paddingSize);
      }
      overflowY = maxHeight > height ? 'hidden' : '';
      height = Math.min(height, maxHeight);
    }
  }
  if (!minRows && !maxRows) {
    overflowY = 'hidden';
  }
  return { height, minHeight, maxHeight, overflowY };
}
