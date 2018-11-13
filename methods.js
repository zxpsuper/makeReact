/**
 * @desc 数据类型检测
 * @param obj 待检测的数据
 * @return {String} 类型字符串
 */
function type(obj) {
  var toString = Object.prototype.toString;
  var toType = {};
  var typeArr = [
    "Undefined",
    "Null",
    "Boolean",
    "Number",
    "String",
    "Object",
    "Array",
    "Function",
    "Date",
    "RegExp",
    "Error",
    "Arguments"
  ];
  typeArr.map(function(item, index) {
    toType["[object " + item + "]"] = item.toLowerCase();
  });

  return typeof obj !== "object" ? typeof obj : toType[toString.call(obj)];
}

function isNumber(obj) {
  return typeof(obj) === 'number';
}
function isString(obj) {
  return typeof(obj) === 'string';
}

function isFunction(obj){
  return typeof(obj) === 'function';
}
export default {
  isNumber,
  isString,
  isFunction,
  type
}