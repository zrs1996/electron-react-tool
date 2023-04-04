import { ObjectType } from '../common/type'
class Notify {
  private pool: ObjectType
  constructor(){
    this.pool = {}
  }

  public subscribeNotify = (name: string, callback: (...args:any) => void) => {
    this.pool[name] = callback
  }

  public publishNotify = (name: string, ...args:any) => {
    this.pool[name](...args)
  }
}

const instance = new Notify()

const { subscribeNotify, publishNotify } = instance
export {
  subscribeNotify, publishNotify
}