class StackController {
    constructor(storage) {
        this.storage = storage
    }

    isItemValid(item) {
        return !(item == null)
    }

    addToStack(req, res) {
        const item = req.body.item
        if (this.isItemValid(item)) {
            this.storage.pushToStack(item)
            return res.status(200).json({
                "message": `item has been added to the stack pile`,
                "stackSize": this.storage.getStackSize(),
                "item": item
            })
        } else {
            return res.status(400).json({
                "message": `A valid value for 'item' must be provided`,
            })
        }
    }

    getFromStack(req, res) {
        if (this.storage.getStackSize() > 0) {
            const item = this.storage.popFromStack()
            return res.status(200).json({
                "message": `item has been removed from the stack pile`,
                "stackSize": this.storage.getStackSize(),
                "item": item
            })
        } else {
            return res.status(400).json({
                "message": `Empty stack, could not retrieve an item from it`,
            })
        }
    }

}

module.exports = StackController
