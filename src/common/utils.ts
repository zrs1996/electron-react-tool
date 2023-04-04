const copy = (source: any) => {
  const type = typeof source
  switch (type) {
    case 'string':
      return source
    case 'number':
      return source
    case 'function':
      return source;
    default:
      break;
  }
  
  if (Array.isArray(source)) {
    return JSON.parse(JSON.stringify(source));
  }

  const trueType = Object.prototype.toString.call(source);
  switch (trueType) {
    case '[object Map]':
      return new Map(source)
    case '[object WeakMap]':
      return new WeakMap(source)
    case '[object Set]':
      return new Set(source)
    case '[object Object]':
      return JSON.parse(JSON.stringify(source));
    default:
      break;
  }
}

export {
  copy
}