class Store {
  constructor() {
    this.cache = {}
  }
  set(key, value) {
    if (!key) return
    this.cache[key] = value
  }
  get(key) {
    return key ? this.cache[key] : this.cache
  }
  delete(key) {
    if (!key) return
    delete this.cache[key]
  }
}
const instance = new Store()
module.exports = instance