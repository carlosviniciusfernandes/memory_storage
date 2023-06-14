export type item = any

export interface Stack {
    pushToStack(item:any ): void

    popFromStack(): any

    getStackSize(): number

    clearStack():void
}