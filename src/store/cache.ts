import { DataType } from '../common/type'

class LocalCache {
  public getLocalCacheString = (key: string) => {
    return localStorage.getItem(key)
  }

  public getLocalCacheJson = (key: string, path: [] | void) => {
    const jsonOrigin = localStorage.getItem(key)
    if (!jsonOrigin) return jsonOrigin
    const resJson = JSON.parse(jsonOrigin) || {}
    const type = resJson.type
    if (!type) return resJson;
    const value = resJson.value
    switch (type) {
      case 'map':
        return new Map(value)
      case 'weakMap':
        return new WeakMap(value)
      case 'set':
        return new Set(value)
      default:
        return value;
    }
  }

  private complexDataToArray = (value: any, type: DataType) => {
    switch (type) {
      case 'map':
        return Array.from(value)
      case 'weakMap':
        return Array.from(value)
      case 'set':
        return Array.from(value)
      default:
        return value;
    }
  }

  public setLocalCacheString = (key: string, value: string) => {
    if (!key) return
    localStorage.setItem(key, value)
  }

  public setLocalCacheJson = (key: string, value: any, type: DataType) => {
    if (!key) return
    localStorage.setItem(key, JSON.stringify({
      type,
      value: this.complexDataToArray(value, type)
    }))
  }
}

const instance = new LocalCache()
const { getLocalCacheString, getLocalCacheJson, setLocalCacheString, setLocalCacheJson } = instance
export {
  getLocalCacheString, getLocalCacheJson, setLocalCacheString, setLocalCacheJson
}