import { Store } from '../../data/interfaces/store'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class StoreController {
    private storage: Store

    constructor(storage: Store) {
        this.storage = storage
    }

    private isNumeric(num: any): boolean {
        return !isNaN(num)
    }

    addToStore(req: HttpRequest, res: HttpResponse): HttpResponse {
        const key = req.body.key
        const value = req.body.value
        const ttl = req.body.ttl

        if (key == null) {
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

    getFromStore(req: HttpRequest, res: HttpResponse): HttpResponse {
        const key = req.params.key
        const value = this.storage.getFromStore(key)
        if (value !== undefined){
            return res.status(200).json({ "value": `${value}` })
        } else {
            return res.status(404).json({})
        }
    }

    deleteFromStore(req: HttpRequest, res: HttpResponse): HttpResponse {
        const key = req.params.key
        const value = this.storage.getFromStore(key)
        if (value !== undefined){
            this.storage.unsetFromStore(key)
            return res.status(200).json({
                "message": `key-value pair {${key}: ${value}} has been unset from the store`,
            })
        } else {
            return res.status(404).json({})
        }
    }
}
