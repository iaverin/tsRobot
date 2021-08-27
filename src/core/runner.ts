import { parseLine, PARSER_ERROR } from './parser'
import { WorldState, resolvers, RUNTIME_ERROR } from './commands'

export interface Output {
  (message: string): void
}

export type RunnerError =
 {
    type: PARSER_ERROR | RUNTIME_ERROR,
    message: string 
 }

export function runCommand(
  world: WorldState,
  command: string,
  outputCallback: Output
): WorldState {

  const cleanWolrd = { ...world, error: null, output: null }
  
  const parsedLine = parseLine(command, resolvers)

  if (parsedLine.error) {
    return {
      ...cleanWolrd,
      error: {
        type: parsedLine.error.type,
        message: parsedLine.error.message
      }
    } as WorldState
  }

  const updatedWorld = parsedLine.resolve(cleanWolrd, ...parsedLine.args)

  if (updatedWorld.error) {
    return updatedWorld
  }

  if (updatedWorld.output) {
    outputCallback(updatedWorld.output)
  }

  return updatedWorld
}
