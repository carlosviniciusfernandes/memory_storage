import readline from 'readline'
import { COMMANDS } from './commands'

const parseInput = (input:string) => {
    const [command, ...args] = input.trim().split(' ')
    return { command, args }
}

const main = () => {
    console.log('-=- MEMORY STORE -=- ')
    console.log(`\navailable commands: ${Object.keys(COMMANDS)}\n`)

    const shell = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    shell.prompt();

    shell.on('line', (input)=> {
        const { command, args } = parseInput(input)
        if (!Object.keys(COMMANDS).includes(command)) {
            console.log('invalid command')
            shell.prompt()
            return
        }
        try {
            COMMANDS[command](args)
        } catch (e) {
            console.log('bad input!!!')
        }
        shell.prompt()
    })

    shell.on('SIGINT', () => {
        shell.question('Exit (y or n)? ', (input) => {
            if (input.match(/^y(es)?$/i)) {
                shell.close()
                COMMANDS.exit()
            }
        });
    })
}

main()
