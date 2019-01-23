import * as is from '../../components/util/is';

const str = 'aa';
const stringArr = ['', 'normal string', `es6 string${str}`];
// 整数，小数，NaN，正无穷大，科学计数法，16进致， 除以0；
// typeof new Number() === 'object';
const numberArr = [111, 3.14, NaN, Infinity, 123e-5, 0xFF, (-1 / 0)];
const booleanArr = [true, false, new Boolean()];
const arrayArr = [[], new Array(), Object.keys({})];
const functionArr = [() => {}, function () {}, setTimeout];
const objectArr = [{}, { key: 1 }, Object.create({})];
const nullValue = null;
const undefinedValue = undefined;

describe('is.String type check', () => {
  it('should return true when argument is a string, false when argument is other type data', () => {
    const stringTypeRes = stringArr.map(item => is.String(item));
    const numberTypeRes = numberArr.map(item => is.String(item));
    const boolTypeRes = booleanArr.map(item => is.String(item));
    const arrayTypeRes = arrayArr.map(item => is.String(item));
    const functionTypeRes = functionArr.map(item => is.String(item));
    const objectTypeRes = objectArr.map(item => is.String(item));
    const otherTypeRes = [nullValue, undefinedValue].map(item => is.String(item));
    expect(stringTypeRes.every(res => res === true)).toStrictEqual(true);
    expect(numberTypeRes.every(res => res === false)).toStrictEqual(true);
    expect(boolTypeRes.every(res => res === false)).toStrictEqual(true);
    expect(arrayTypeRes.every(res => res === false)).toStrictEqual(true);
    expect(functionTypeRes.every(res => res === false)).toStrictEqual(true);
    expect(objectTypeRes.every(res => res === false)).toStrictEqual(true);
    expect(otherTypeRes.every(res => res === false)).toStrictEqual(true);
  });
});

describe('is.Array type check', () => {
  it('should return true when argument is a array, false when argument is other type data', () => {
    const stringTypeRes = stringArr.map(item => is.Array(item));
    const numberTypeRes = numberArr.map(item => is.Array(item));
    const boolTypeRes = booleanArr.map(item => is.Array(item));
    const arrayTypeRes = arrayArr.map(item => is.Array(item));
    const functionTypeRes = functionArr.map(item => is.Array(item));
    const objectTypeRes = objectArr.map(item => is.Array(item));
    const otherTypeRes = [nullValue, undefinedValue].map(item => is.Array(item));
    expect(stringTypeRes.every(res => res === false)).toStrictEqual(true);
    expect(numberTypeRes.every(res => res === false)).toStrictEqual(true);
    expect(boolTypeRes.every(res => res === false)).toStrictEqual(true);
    expect(arrayTypeRes.every(res => res === true)).toStrictEqual(true);
    expect(functionTypeRes.every(res => res === false)).toStrictEqual(true);
    expect(objectTypeRes.every(res => res === false)).toStrictEqual(true);
    expect(otherTypeRes.every(res => res === false)).toStrictEqual(true);
  });
});

describe('is.Object type check', () => {
  it('should return true when argument is a object, false when argument is other type data', () => {
    const stringTypeRes = stringArr.map(item => is.Object(item));
    const numberTypeRes = numberArr.map(item => is.Object(item));
    const boolTypeRes = booleanArr.map(item => is.Object(item));
    const arrayTypeRes = arrayArr.map(item => is.Object(item));
    const functionTypeRes = functionArr.map(item => is.Object(item));
    const objectTypeRes = objectArr.map(item => is.Object(item));
    const otherTypeRes = [nullValue, undefinedValue].map(item => is.Object(item));
    expect(stringTypeRes.every(res => res === false)).toStrictEqual(true);
    expect(numberTypeRes.every(res => res === false)).toStrictEqual(true);
    expect(boolTypeRes.every(res => res === false)).toStrictEqual(true);
    expect(arrayTypeRes.every(res => res === false)).toStrictEqual(true);
    expect(functionTypeRes.every(res => res === false)).toStrictEqual(true);
    expect(objectTypeRes.every(res => res === true)).toStrictEqual(true);
    expect(otherTypeRes.every(res => res === false)).toStrictEqual(true);
  });
});

describe('is.Boolean type check', () => {
  it('should return true when argument is a boolean, false when argument is other type data', () => {
    const stringTypeRes = stringArr.map(item => is.Boolean(item));
    const numberTypeRes = numberArr.map(item => is.Boolean(item));
    const boolTypeRes = booleanArr.map(item => is.Boolean(item));
    const arrayTypeRes = arrayArr.map(item => is.Boolean(item));
    const functionTypeRes = functionArr.map(item => is.Boolean(item));
    const objectTypeRes = objectArr.map(item => is.Boolean(item));
    const otherTypeRes = [nullValue, undefinedValue].map(item => is.Boolean(item));
    expect(stringTypeRes.every(res => res === false)).toStrictEqual(true);
    expect(numberTypeRes.every(res => res === false)).toStrictEqual(true);
    expect(boolTypeRes.every(res => res === true)).toStrictEqual(true);
    expect(arrayTypeRes.every(res => res === false)).toStrictEqual(true);
    expect(functionTypeRes.every(res => res === false)).toStrictEqual(true);
    expect(objectTypeRes.every(res => res === false)).toStrictEqual(true);
    expect(otherTypeRes.every(res => res === false)).toStrictEqual(true);
  });
});

describe('is.Function type check', () => {
  it('should return true when argument is a function, false when argument is other type data', () => {
    const stringTypeRes = stringArr.map(item => is.Function(item));
    const numberTypeRes = numberArr.map(item => is.Function(item));
    const boolTypeRes = booleanArr.map(item => is.Function(item));
    const arrayTypeRes = arrayArr.map(item => is.Function(item));
    const functionTypeRes = functionArr.map(item => is.Function(item));
    const objectTypeRes = objectArr.map(item => is.Function(item));
    const otherTypeRes = [nullValue, undefinedValue].map(item => is.Function(item));
    expect(stringTypeRes.every(res => res === false)).toStrictEqual(true);
    expect(numberTypeRes.every(res => res === false)).toStrictEqual(true);
    expect(boolTypeRes.every(res => res === false)).toStrictEqual(true);
    expect(arrayTypeRes.every(res => res === false)).toStrictEqual(true);
    expect(functionTypeRes.every(res => res === true)).toStrictEqual(true);
    expect(objectTypeRes.every(res => res === false)).toStrictEqual(true);
    expect(otherTypeRes.every(res => res === false)).toStrictEqual(true);
  });
});

describe('is.Number type check', () => {
  it('should return true when argument is a number, false when argument is other type data', () => {
    const stringTypeRes = stringArr.map(item => is.Number(item));
    const numberTypeRes = numberArr.map(item => is.Number(item));
    const boolTypeRes = booleanArr.map(item => is.Number(item));
    const arrayTypeRes = arrayArr.map(item => is.Number(item));
    const functionTypeRes = functionArr.map(item => is.Number(item));
    const objectTypeRes = objectArr.map(item => is.Number(item));
    const otherTypeRes = [nullValue, undefinedValue].map(item => is.Number(item));
    expect(stringTypeRes.every(res => res === false)).toStrictEqual(true);
    expect(numberTypeRes.every(res => res === true)).toStrictEqual(true);
    expect(boolTypeRes.every(res => res === false)).toStrictEqual(true);
    expect(arrayTypeRes.every(res => res === false)).toStrictEqual(true);
    expect(functionTypeRes.every(res => res === false)).toStrictEqual(true);
    expect(objectTypeRes.every(res => res === false)).toStrictEqual(true);
    expect(otherTypeRes.every(res => res === false)).toStrictEqual(true);
  });
});

describe('is.nil type check', () => {
  it('should return true when argument is null or undefined, false when argument is other type data', () => {
    const stringTypeRes = stringArr.map(item => is.nil(item));
    const numberTypeRes = numberArr.map(item => is.nil(item));
    const boolTypeRes = booleanArr.map(item => is.nil(item));
    const arrayTypeRes = arrayArr.map(item => is.nil(item));
    const functionTypeRes = functionArr.map(item => is.nil(item));
    const objectTypeRes = objectArr.map(item => is.nil(item));
    const otherTypeRes = [nullValue, undefinedValue].map(item => is.nil(item));
    expect(stringTypeRes.every(res => res === false)).toStrictEqual(true);
    expect(numberTypeRes.every(res => res === false)).toStrictEqual(true);
    expect(boolTypeRes.every(res => res === false)).toStrictEqual(true);
    expect(arrayTypeRes.every(res => res === false)).toStrictEqual(true);
    expect(functionTypeRes.every(res => res === false)).toStrictEqual(true);
    expect(objectTypeRes.every(res => res === false)).toStrictEqual(true);
    expect(otherTypeRes.every(res => res === true)).toStrictEqual(true);
  });
});
