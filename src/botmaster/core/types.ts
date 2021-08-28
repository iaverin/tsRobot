import { RUNTIME_ERROR } from "./commands"
import { PARSER_ERROR } from "./parser"

export enum DIRECTION {
  NORTH = 'NORTH',
  SOUTH = 'SOUTH',
  EAST = 'EAST',
  WEST = 'WEST'
}

type BotState = {
  x: number
  y: number
  placed: boolean
  facingDirection: DIRECTION
}

export type WorldState = {
  board: {
    width: number
    height: number
  }

  bot: BotState

  output: string | null

  error: {
    type: RUNTIME_ERROR | PARSER_ERROR
    message: string
  } | null
}

