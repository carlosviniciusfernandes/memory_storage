import { stackAdd, stackPop, stackCount, stackClear } from './stack'
import { storeAdd, storeGet, storeDel } from './store'

const help = () => console.log('WIP')
const clear = () => console.clear()
const exit = () => process.exit()

export const COMMANDS = {
    help,
    stackAdd,
    stackPop,
    stackCount,
    stackClear,
    storeAdd,
    storeGet,
    storeDel,
    clear,
    exit,
}
