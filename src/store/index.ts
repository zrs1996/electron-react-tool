import { keyType, ObjectType, DataType } from '../common/type'
interface GlobalStoreType {
  [key: keyType]: any
}

import { copy } from "../common/utils"
import { getLocalCacheJson, setLocalCacheJson } from "../store/cache"

class Store {
  public globalStore: GlobalStoreType
  constructor() {
    this.globalStore = {
      frontAppMap: getLocalCacheJson('frontAppMap')
    }
  }
  public getGlobalStore = (key: keyType): any => {
    if (!key) return this.globalStore
    return copy(this.globalStore[key])
  }

  public setGlobalStore = (name: keyType, value: any, type: DataType | void, useCache: boolean | void): void => {
    if (!name) return
    if (!type) type = 'object'
    this.globalStore[name] = copy(value);
    if (useCache) {
      const cacheName = typeof name === 'string' ? name : name.toString()
      setLocalCacheJson(cacheName, this.globalStore[name], type)
    }
  }

  private setGlobalStoreInit = (name: keyType, type: DataType) => {
    switch (type) {
      case 'object':
        this.globalStore[name] = {}
        break;
      case 'array':
        this.globalStore[name] = []
        break;
      case 'map':
        this.globalStore[name] = new Map()
        break;
      case 'weakMap':
        this.globalStore[name] = new WeakMap()
        break;
      case 'set':
        this.globalStore[name] = new Set()
        break;
      default:
        this.globalStore[name] = {}
        break;
    }
  }

  private updateGlobalStore = (name: keyType, type: DataType, key: keyType, value: any) => {
    switch (type) {
      case 'object':
        this.globalStore[name][key] = value
        break;
      case 'array':
        this.globalStore[name][key] = value
        break;
      case 'map':
        this.globalStore[name].set(key, value)
        break;
      case 'weakMap':
        this.globalStore[name].set(key, value)
        break;
      case 'set':
        this.globalStore[name].add(value)
        break;
      default:
        this.globalStore[name][key] = value
        break;
    }
  }

  public setGlobalStoreWithPath = (name: keyType, path: ObjectType, type: DataType | void, useCache: boolean | void): void => {
    if (!name) return
    if (!type) type = 'object'
    for (const key in path) {
      if (!this.globalStore[name]) {
        this.setGlobalStoreInit(name, type)
      }
      this.updateGlobalStore(name, type, key, copy(path[key]))
    }
    if (useCache) {
      const cacheName = typeof name === 'string' ? name : name.toString()
      setLocalCacheJson(cacheName, this.globalStore[name], type)
    }
  }
}

const instance = new Store()
const { getGlobalStore, setGlobalStore, setGlobalStoreWithPath } = instance;

export {
  getGlobalStore, setGlobalStore, setGlobalStoreWithPath
}