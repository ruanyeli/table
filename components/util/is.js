function type(obj) {
  return Object.prototype.toString.call(obj);
}

exports.String = obj => type(obj) === '[object String]';
exports.Array = obj => type(obj) === '[object Array]';
exports.Object = obj => type(obj) === '[object Object]';
exports.Boolean = obj => type(obj) === '[object Boolean]';
exports.Function = obj => type(obj) === '[object Function]';
exports.Number = obj => typeof obj === 'number';
exports.nil = obj => obj === null || obj === undefined;
