class StackController {
    constructor() {
        this.stackPile = []
    }

    isItemValid(item) {
        return !(item == null)
    }

    addToStack(req, res) {
        const item = req.body.item
        if (this.isItemValid(item)) {
            this.stackPile.push(item)
            return res.status(200).json({
                "message": `item has been added to the stack pile`,
                "stackSize": this.stackPile.length,
                "item": item
            })
        } else {
            return res.status(400).json({
                "message": `A valid value for 'item' must be provided`,
            })
        }
    }

    getFromStack(req, res) {
        if (this.stackPile.length > 0) {
            const item = this.stackPile.pop()
            return res.status(200).json({
                "message": `item has been removed from the stack pile`,
                "stackSize": this.stackPile.length,
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

    setTTL(key, ttl) {
        this.ttlStore[key] = ttl
        setInterval(this.checkTTL, 1000, key, this.ttlStore, this.valueStore);
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

        if (ttl !== undefined) {
            if (ttl && this.isNumeric(ttl)) {
                this.setTTL(key, ttl)
            } else {
                return res.status(400).json({"message": `Validation error. TTL must be a numerical value`})
            }
        }

        this.valueStore[key] = value
        let message = `key-value pair {${key}: ${value}} has been set into the store`
        if (ttl) message += ` with a time to live of ${ttl} seconds`

        return res.status(200).json({"message": message})
    }

    getFromStore(req, res){
        const key = req.params.key
        const value = this.valueStore[key]
        if (value !== undefined){
            return res.status(200).json({ "value": `${value}` })
        } else {
            return res.status(404).json()
        }
    }

    deleteFromStore(req, res){
        const key = req.params.key
        const value = req.body.value
        if (this.valueStore[key] !== undefined){
            delete this.valueStore[key]
            delete this.ttlStore[key]
            return res.json(200, {
                "message": `key-value pair {${key}: ${value}} has been unset from the store`,
            })
        } else {
            return res.status(404).json()
        }
    }
}

const stackController = new StackController()
const storeController = new StoreController()

module.exports = {
    stackController,
    storeController
}
