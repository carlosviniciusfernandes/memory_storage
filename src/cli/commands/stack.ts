import { parseArgs, ParseArgsConfig } from 'node:util'

import stack from '../../core/stack/stackProvider'

const stackAdd = (args) => {
    const config: ParseArgsConfig = {
        args,
        allowPositionals: true,
        options: {
            item: { type: 'string', short: 'i' },
        }
    };
    const { values, positionals } = parseArgs(config)
    const item = values.item || positionals[0]
    if (item) {
        stack.pushToStack(item)
    } else {
        console.log('provide a valid input!')
    }
}

const stackPop = () => {
    const item = stack.popFromStack()
    if (item) {
        console.log(`${item}`)
    } else {
        console.log('stack is empty!!!')
    }
}

const stackCount = () => {
    console.log(`${stack.getStackSize()}`)
}
const stackClear = () => {
    stack.clearStack()
}

export {
    stackAdd,
    stackPop,
    stackCount,
    stackClear,
}
