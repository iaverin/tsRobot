import { DIRECTION, WorldState } from './types'
import { parseLine, PARSER_ERROR } from './parser'
import { resolveInt, resolvers, RUNTIME_ERROR } from './commands'

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

  // TODO KL: learn map/reduce operations, this is real FP thinking
  // you can replace the whole function with this and it reads clearer
  // return s.split('\n').map(v => v.trim()).filter(v => v.length > 0).map(v => v as Code)
  return code
}  

export function initWorld(width:number, height:number): WorldState{

  // TODO KL: this smells bad, google gives `Number.isInteger`
  if (!(resolveInt(String(width)) && resolveInt(String(height)))){
    throw(Error("World's width and height should be integers"))
  }

  return {
    board:{
      height:height,
      width:width
    },

    bot:{
      x:0,
      y:0,
      facingDirection:DIRECTION.NORTH,
      placed:false
    },
    error: null,
    output: null
  } as WorldState

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

  // TODO KL: bad smell here - why does parsedLine need to receive its own attributes?
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

  for(let command of commands) 
   {

    newWorld = runCommand(newWorld, command)

    if (newWorld.error){
      return {

        ...newWorld
      }
    }

    if (newWorld.output && outputCallback) {
      outputCallback(newWorld.output)
    }
    
  }

  return {
    ...newWorld
  }
}