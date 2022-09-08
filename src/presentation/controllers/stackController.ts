import { Stack, item } from '../../data/interfaces/stack'
import { HttpRequest, HttpResponse } from '../protocols/http'


export class StackController {
    private storage: Stack

    constructor(storage: Stack) {
        this.storage = storage
    }

    private isItemValid(item: item): boolean {
        return !(item == null)
    }

    addToStack(req: HttpRequest, res: HttpResponse): HttpResponse {
        const item: item = req.body.item
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

    getFromStack(req: HttpRequest | void, res: HttpResponse): HttpResponse {
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
