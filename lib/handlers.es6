class Handlers {
  constructor () {
    const defaults = {
      collection: [ ],
      id: 0
    }
    Object.assign(this, defaults)
  }
  generateId () {
    return this.id++
  }
  contain (id) {
    return Boolean(this.collection[id])
  }
  add (handler) {
    const id = this.generateId()
    this.collection[id] = handler
    return id
  }
  get (id) {
    return this.collection[id]
  }
  remove (id) {
    delete this.collection[id]
  }
}

export default Handlers