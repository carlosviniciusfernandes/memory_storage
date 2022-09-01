class InMemoryStorage {
    constructor() {
        this.stackPile = []
        this.valueStore = {}
        this.ttlStore = {}
    }

    checkTTL(key, ttlStore, valueStore) {
        ttlStore[key] = ttlStore[key] - 1
        if (ttlStore[key] <= 0) {
            delete valueStore[key]
            delete ttlStore[key]
        }
    }

    setTTL(key, ttl){
        this.ttlStore[key] = ttl
        setInterval(this.checkTTL, 1000, key, this.ttlStore, this.valueStore);
    }

    pushToStack(item) {
        this.stackPile.push(item)
    }

    popFromStack() {
        return this.stackPile.pop()
    }

    getStackSize() {
        return this.stackPile.length
    }

    clearStack() {
        this.stackPile = []
    }

    setToStore(key, value, ttl = null) {
        this.valueStore[key] = value
        this.setTTL(key, ttl)
    }

    getFromStore(key) {
        return this.valueStore[key]
    }

    unsetFromStore(key) {
        delete this.valueStore[key]
        delete this.ttlStore[key]
    }

    clearStore() {
        this.valueStore = {}
        this.ttlStore = {}
    }
}

const inMemoryStorage = new InMemoryStorage()

module.exports = inMemoryStorage
