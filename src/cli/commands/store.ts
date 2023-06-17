import { parseArgs, ParseArgsConfig } from 'node:util'

import store from '../../core/store/storeProvider'

const storeAdd = (args) => {
    const config: ParseArgsConfig = {
        args,
        allowPositionals: true,
        options: {
            key: { type: 'string', short: 'k' },
            value: { type: 'string', short: 'v' },
            ttl: {type: 'string' },
        }
    }
    const { values = {}, positionals = [] } = parseArgs(config)

    let key, value, ttl = null
    if (positionals.length > 0) {
        [key, value, ttl] = positionals
    }

    if (Object.keys(values).length > 0) {
        ({key=key, value=value, ttl=ttl} = values)
    }

    if (!key || !value) {
        console.log('bad input! provide a valid key-value pair')
        return
    }

    if (ttl && isNaN(ttl)) {
        console.log('bad input! TTL must be a number in seconds')
        return
    }

    store.setToStore(key, value, Number(ttl))
}

const storeGet = (args) => {
    const config: ParseArgsConfig = {
        args,
        allowPositionals: true,
        options: {
            key: { type: 'string', short: 'k' },
        }
    }
    const { values, positionals } = parseArgs(config)

    const key = positionals[0] || (values.key)
    if (!key) {
        console.log('provide a valid key!')
    }

    const value = store.getFromStore(String(key))
    if(value){
        console.log(value)
    } else {
        console.log('bad key! not found')
    }
}

const storeDel = (args) => {
    const config: ParseArgsConfig = {
        args,
        allowPositionals: true,
        options: {
            key: { type: 'string', short: 'k' },
        }
    }
    const { values, positionals } = parseArgs(config)

    const key = positionals[0] || (values.key)
    if (!key) {
        console.log('provide a valid key!')
    }

    if (key) {
        store.unsetFromStore(String(key))
    } else {
        console.log('provide a valid key!')
    }
}

export {
    storeAdd,
    storeGet,
    storeDel,
}
