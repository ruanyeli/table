import _isArray from 'lodash/isArray';
import _isEqual from 'lodash/isEqual';
import _isPlainObject from 'lodash/isPlainObject';

export default function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  const bHasOwnProperty = hasOwnProperty.bind(objB);
  for (let i = 0; i < keysA.length; i++) {
    const keyA = keysA[i];

    if (objA[keyA] === objB[keyA]) {
      continue;
    }

    // special diff with Array or Object
    if (_isArray(objA[keyA])) {
      if (!_isArray(objB[keyA]) || objA[keyA].length !== objB[keyA].length) {
        return false;
      } else if (!_isEqual(objA[keyA], objB[keyA])) {
        return false;
      }
    } else if (_isPlainObject(objA[keyA])) {
      if (!_isPlainObject(objB[keyA]) || !_isEqual(objA[keyA], objB[keyA])) {
        return false;
      }
    } else if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
}
