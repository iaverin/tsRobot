import { Func } from 'mocha'
import { allowedArgumentTypes, tokenToTypedValue } from './commands'

export type Code = Array<string>

export function loadCodeFromString(s: string): Code | null {
  const code: Code = []

  s.split('\n').forEach((v) => {
    const codeLine = v.trim().toUpperCase()
    if (codeLine !== '') code.push(codeLine)
  })

  return code
}

export type Token = {
  function: string
  args: []
}

export enum BotErrorType {
  COMMAND_NOT_FOUND,
  UNKWONW_ARGUMENT_TYPE,
  WRONG_ARGUMENT_NUMBER,
  RUNTIME_ERROR
}

export type BotParseError = {
  line: number
  type: BotErrorType
  message: string
}

export type ParsedLine = {
  error?: BotParseError
  command: string
  args: Array<allowedArgumentTypes>
  // execute(...args: any): any,
}

export function parseLine(
  line: string,
  functionsMap: FunctionMapping
): ParsedLine {
  // const [token, ...args] = line.split(" ")
  const codeLine = line.trim()
  const commandTokenEndPosition =
    codeLine.indexOf(' ') >= 0 ? codeLine.indexOf(' ') : codeLine.length
  const token = codeLine.substring(0, commandTokenEndPosition)
  const args =
    codeLine.length !== token.length
      ? codeLine.substring(commandTokenEndPosition).trim().split(',')
      : []

  const parsedLine: ParsedLine = {
    command: token,
    // execute: functionsMap[token].execute,
    args: []
  }

  args.forEach((arg, i) => {
    const trimmedArg = arg.trim()
    const tokenValue = tokenToTypedValue(trimmedArg)
    if (tokenValue) {
      parsedLine.args.push(tokenValue)
    } else {
      return {
        ...parsedLine,
        error: {
          type: BotErrorType.UNKWONW_ARGUMENT_TYPE,
          message: `Argument ${trimmedArg} has unknown type`
        }
      } as ParsedLine
    }
  })

  return parsedLine
}

export type FunctionMapping = {
  [token: string]: {
    description?: string
    positionalArgsTypes?: Array<any> | null
    execute(...args: Array<any>): void
  }
}

export const functionsMap: FunctionMapping = {
  HELLO_WORLD: {
    description: 'test function',
    execute: (args: any) => {
      args.result = 'Hello World!'
    }
  }
}
