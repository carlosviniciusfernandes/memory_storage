export type value = any

export interface Store {
    setToStore(key:string, value:any, ttl?: null | number): void

    getFromStore(key: string): any

    unsetFromStore(key: string): void

    clearStore():void
}