const toString = Object.prototype.toString

export function isPlainObject(obj: any): obj is Record<string, any> {
  return toString.call(obj) === '[object Object]'
}
