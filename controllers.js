class StackController {
    constructor() {
        this.stack_pile = []
    }

    add_to_stack(req, res) {
        const item = req.body.item
        this.stack_pile.push(item)
        return res.json(200, {
            "message": `item [${item}] has added to the stack pile`,
            "stack": this.stack_pile
        })
    }

    get_from_stack(req, res) {
        const item = this.stack_pile.pop()
        return res.json(200, {
            "message": `item [${item}] has removed from the stack pile`,
            "stack": this.stack_pile
        })
    }

}

const stackController = new StackController()

export {stackController}
