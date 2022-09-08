import { Store, value } from "../interfaces/store"

type keyValue = { [key: string]: any }
type keyNumber = { [key: string]: number }

/*
    In Memory Singleton for the Key-value pair storage
*/
class InMemoryStore implements Store {
    private static instance: InMemoryStore
    private valueStore: keyValue
    private ttlStore: keyNumber

    private constructor() {
        this.valueStore = {}
        this.ttlStore = {}
    }

    static getInstance(): InMemoryStore {
        if(!this.instance){
            this.instance = new InMemoryStore()
        }
        return this.instance
    }

    private checkTTL(key: string, ttlStore: keyNumber, valueStore: keyValue): void {
        ttlStore[key] = ttlStore[key] - 1
        if (ttlStore[key] <= 0) {
            delete valueStore[key]
            delete ttlStore[key]
        }
    }

    private setTTL(key: string, ttl: number): void {
        this.ttlStore[key] = ttl
        setInterval(this.checkTTL, 1000, key, this.ttlStore, this.valueStore);
    }

    setToStore(key: string, value: value, ttl: number | null = null): void {
        this.valueStore[key] = value
        if (ttl) this.setTTL(key, ttl)
    }

    getFromStore(key: string): value {
        return this.valueStore[key]
    }

    unsetFromStore(key: string): void {
        delete this.valueStore[key]
        delete this.ttlStore[key]
    }

    clearStore(): void {
        this.valueStore = {}
        this.ttlStore = {}
    }
}

const store: Store = InMemoryStore.getInstance()

export default store
