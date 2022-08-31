class StackController {
    constructor() {
        this.stack_pile = []
    }

    _is_item_valid(item) {
        return !(item == null)
    }

    add_to_stack(req, res) {
        const item = req.body.item
        if (this._is_item_valid(item)) {
            this.stack_pile.push(item)
            return res.json(200, {
                "message": `item has been added to the stack pile`,
                "stackSize": this.stack_pile.length,
                "item": item
            })
        } else {
            return res.json(400, {
                "message": `A valid value for 'item' must be provided`,
            })
        }
    }

    get_from_stack(req, res) {
        if (this.stack_pile.length > 0) {
            const item = this.stack_pile.pop()
            return res.json(200, {
                "message": `item has been removed from the stack pile`,
                "stackSize": this.stack_pile.length,
                "item": item
            })
        } else {
            return res.json(400, {
                "message": `Empty stack, could not retrieve an item from it`,
            })
        }
    }

}

class StoreController {
    constructor() {
        this.store_dict = {}
    }

    _set_time_to_live(key, time) {
        setTimeout(() => {
            delete this.store_dict[key]
        }, time*1000)
    }

    add_to_store(req, res){
        const key = req.body.key
        const value = req.body.value
        const ttl = req.body.ttl

        this.store_dict[key] = value
        let message = `key-value pair {${key}: ${value}} has been set into the store`

        if (ttl != null) {
            this._set_time_to_live(key, ttl)
            message += ` with a time to live of ${ttl} seconds`
        }

        return res.json(200, {
            "message": message
        })
    }

    get_from_store(req, res){
        const key = req.params.key
        const value = this.store_dict[key]
        return res.json(200, { "value": `${value}` })
    }

    delete_from_store(req, res){
        const key = req.params.key
        const value = req.body.value
        delete this.store_dict[key]
        return res.json(200, {
            "message": `key-value pair {${key}: ${value}} has been unset from the store`,
        })
    }
}

const stackController = new StackController()
const storeController = new StoreController()

module.exports = {
    stackController,
    storeController
}
