import { Stack, item } from "../interfaces/stack"

/*
    In Memory Singleton for the LIFO stack
*/
class InMemoryStack implements Stack {
    private static instance: InMemoryStack
    private stackPile: any[]

    private constructor() {
        this.stackPile = []
    }

    static getInstane(): InMemoryStack {
        if (!this.instance){
            this.instance = new InMemoryStack()
        }
        return this.instance
    }

    pushToStack(item: item): void {
        this.stackPile.push(item)
    }

    popFromStack():item {
        return this.stackPile.pop()
    }

    getStackSize(): number {
        return this.stackPile.length
    }

    clearStack(): void {
        this.stackPile = []
    }
}

const stack: Stack = InMemoryStack.getInstane()

export default stack
