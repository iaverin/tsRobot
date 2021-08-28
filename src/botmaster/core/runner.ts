import { WorldState } from './types'
import { parseLine, PARSER_ERROR } from './parser'
import { resolvers, RUNTIME_ERROR } from './commands'

export interface Output {
  (message: string): void
}

export type RunnerError =
 {
    type: PARSER_ERROR | RUNTIME_ERROR,
    message: string 
 }

export type Code = Array<string>

export function loadCodeFromString(s: string): Code | null {
  const code: Code = []

  s.split('\n').forEach((v) => {
    const codeLine = v.trim().toUpperCase()
    if (codeLine !== '') code.push(codeLine)
  })

  return code
}  

export function runCommand( world: WorldState, command: string):WorldState {

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

  const newWorld = parsedLine.resolve(cleanWolrd, ...parsedLine.args)

  if (newWorld.error) {
    return newWorld
  }
 
  return newWorld
}

export function runScript(world:WorldState, script:string, outputCallback?: Output):WorldState{
  
  let newWorld = { ...world, error: null, output: null }
  
  const commands: Array<string> = loadCodeFromString(script) 
  
  if (commands.length <= 0) {
    return newWorld
  }

  commands.forEach((command) => {

    newWorld = runCommand(newWorld, command)

    if (newWorld.error){
      return {
        ...newWorld
      }
    }

    if (newWorld.output && outputCallback) {
      outputCallback(newWorld.output)
    }
    
  });

  return {
    ...newWorld
  }
}