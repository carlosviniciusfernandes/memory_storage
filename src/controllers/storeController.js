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
        const value = this.storage.getFromStore(key)
        if (value !== undefined){
            this.storage.unsetFromStore(key)
            return res.status(200).json({
                "message": `key-value pair {${key}: ${value}} has been unset from the store`,
            })
        } else {
            return res.status(404).json()
        }
    }
}

module.exports = StoreController
