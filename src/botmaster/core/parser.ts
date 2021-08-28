import { WorldState } from './types'

export type Token = {
  function: string
  args: []
}

export enum PARSER_ERROR {
  COMMAND_NOT_FOUND,
  UNKWONW_ARGUMENT_TYPE,
  WRONG_ARGUMENT_NUMBER,
  RUNTIME_ERROR
}

export type ParserError = {
  type: PARSER_ERROR
  message: string
}

interface CommandResolver {
  (world: WorldState, ...args: any): WorldState
}

export type ParsedLine = {
  error?: ParserError
  command: string
  args: Array<any>
  resolve: CommandResolver
}

export function parseLine(
  line: string,
  resolvers: CommandResolverMapping
): ParsedLine {
  const codeLine = line.trim()
  const commandTokenEndPosition =
    codeLine.indexOf(' ') >= 0 ? codeLine.indexOf(' ') : codeLine.length
  const token = codeLine.substring(0, commandTokenEndPosition)
  const args =
    codeLine.length !== token.length
      ? codeLine.substring(commandTokenEndPosition).trim().split(',')
      : []

  let parsedLine: ParsedLine = { command: token, resolve: undefined, args: [] }

  if (!(token in resolvers)) {
    return {
      ...parsedLine,
      error: {
        type: PARSER_ERROR.COMMAND_NOT_FOUND,
        message: `Command ${token} not found`
      }
    } as ParsedLine
  }

  parsedLine = {
    command: token,
    resolve: resolvers[token].resolve,
    args: []
  }

  if (parsedLine.resolve.length !== args.length + 1)
    return {
      ...parsedLine,
      error: {
        message: `Wrong arguments number: ${args.length}. Should be ${parsedLine.resolve.length-1}`,
        type: PARSER_ERROR.WRONG_ARGUMENT_NUMBER
      }
    } as ParsedLine

  args.forEach((arg, i) => {
    const trimmedArg = arg.trim()
    // const tokenValue = tokenToTypedValue(trimmedArg)

    if (trimmedArg) {
      parsedLine.args.push(trimmedArg)
    } else {
      return {
        ...parsedLine,
        error: {
          type: PARSER_ERROR.UNKWONW_ARGUMENT_TYPE,
          message: `Argument ${trimmedArg} has unknown type`
        }
      } as ParsedLine
    }
  })

  return parsedLine
}

export type CommandResolverMapping = {
  [command: string]: {
    description?: string
    resolve: CommandResolver
  }
}
