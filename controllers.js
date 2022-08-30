class StackController {
    constructor() {
        this.stack_pile = []
    }

    add_to_stack(req, res) {
        const item = req.body.item
        this.stack_pile.push(item)
        return res.json(200, {
            "message": `item [${item}] has been added to the stack pile`,
            "stack": this.stack_pile
        })
    }

    get_from_stack(req, res) {
        const item = this.stack_pile.pop()
        return res.json(200, {
            "message": `item [${item}] has been removed from the stack pile`,
            "stack": this.stack_pile
        })
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
            "message": message,
            "store": this.store_dict
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
            "store": this.store_dict
        })
    }
}

const stackController = new StackController()
const storeController = new StoreController()

module.exports = {
    stackController,
    storeController
}
