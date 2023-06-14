import { Store, value } from "../interfaces/store"

type Typeout = ReturnType<typeof setTimeout>

type keyValue = { [key: string]: any }
type keyTTL = { [key: string]: Typeout }

/*
    In Memory Singleton for the Key-value pair storage
*/
class InMemoryStore implements Store {
    private static instance: InMemoryStore
    private valueStore: keyValue
    private ttlStore: keyTTL

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

    setToStore(key: string, value: value, ttl: number | null = null): void {
        this.valueStore[key] = value

        clearTimeout(this.ttlStore[key])
        delete this.ttlStore[key]

        if (ttl) {
            const timeout = setTimeout(() => delete this.valueStore[key], ttl*1000)
            this.ttlStore[key] = timeout
        }
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
