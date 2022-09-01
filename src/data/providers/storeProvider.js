class InMemoryStore {
    constructor() {
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

const inMemoryStore = new InMemoryStore()

module.exports = inMemoryStore
