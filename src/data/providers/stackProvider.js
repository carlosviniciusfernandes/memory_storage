class InMemoryStack {
    constructor() {
        this.stackPile = []
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
}

const inMemoryStack = new InMemoryStack()

module.exports = inMemoryStack
