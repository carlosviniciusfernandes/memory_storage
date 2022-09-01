const inMemoryStorage = require('./providers.js')

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

class StoreController {
    constructor(storage) {
        this.storage = storage
    }


    isNumeric(num) {
        return !isNaN(num)
    }

    addToStore(req, res){
        const key = req.body.key
        const value = req.body.value
        const ttl = req.body.ttl

        if (key == null || !typeof key == 'string') {
            return res.status(400).json({"message": `Validation error. Make sure 'key' it is a valid string`})
        }

        if (value === undefined) {
            return res.status(400).json({"message": `Validation error. Make sure that 'value' is not undefined`})
        }

        if (ttl !== undefined && !this.isNumeric(ttl) || ttl === null) {
            return res.status(400).json({"message": `Validation error. TTL must be a numerical value`})
        }

        this.storage.setToStore(key, value, ttl)
        let message = `key-value pair {${key}: ${value}} has been set into the store`
        if (ttl) message += ` with a time to live of ${ttl} seconds`

        return res.status(200).json({"message": message})
    }

    getFromStore(req, res){
        const key = req.params.key
        const value = this.storage.getFromStore(key)
        if (value !== undefined){
            return res.status(200).json({ "value": `${value}` })
        } else {
            return res.status(404).json()
        }
    }

    deleteFromStore(req, res){
        const key = req.params.key
        const value = req.body.value
        if (this.storage.getFromStore(key) !== undefined){
            this.storage.unsetFromStore(key)
            return res.json(200, {
                "message": `key-value pair {${key}: ${value}} has been unset from the store`,
            })
        } else {
            return res.status(404).json()
        }
    }
}

const stackController = new StackController(inMemoryStorage)
const storeController = new StoreController(inMemoryStorage)

module.exports = {
    stackController,
    storeController
}
