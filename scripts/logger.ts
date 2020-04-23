import chalk from 'chalk'
import moment from 'moment'

const queue: string[] = []
const getDate = () => moment().format('YYYY-MM-DD HH:mm:ss')
const getChalkFn = (type: string) =>
  type === 'success'
    ? chalk.green
    : type === 'error'
    ? chalk.red
    : type === 'info'
    ? chalk.yellow
    : chalk.white

const printLine = (line: string | undefined) => process.stdout.write(`${line}\n`)
const getMessage = (type: string, output: string) => `[${getChalkFn(type)(getDate())}]: ${output}`
export const log = (type: string, output: string) => printLine(getMessage(type, output))
export const enqueue = (type: string, output: string) => queue.push(getMessage(type, output))
export const flush = () => {
  while (queue.length > 0) {
    printLine(queue.shift())
  }
}
