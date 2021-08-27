import { CommandResolverMapping } from './parser'

// Define types are using for proceeding commands

export enum Direction {
  NORTH = 'NORTH',
  SOUTH = 'SOUTH',
  EAST = 'EAST',
  WEST = 'WEST'
}

type BotState = {
  x: number
  y: number
  placed: boolean
  facingDirection: Direction
}

export type WorldState = {
  board: {
    width: number
    height: number
  }

  bot: BotState
}

// provide available types for parser to check arguments from commands
// TODO: extract types from commands implementation functions
export type allowedArgumentTypes = number | Direction

// types casting function from extracted argument value as string token to
export function tokenToTypedValue(token: string): allowedArgumentTypes {
  const tryNumber: number = Number(token)

  if (!!tryNumber && tryNumber > 0 && tryNumber % 1 === 0) {
    return tryNumber
  }

  const tryDirection = Direction[token]
  if (tryDirection) return tryDirection

  return undefined
}


// Commands implementation functions mapping

export const commandsInmplementation: CommandResolverMapping = {
  PLACE: {
    description: 'Place the robot on board',
    resolve: (
      world: WorldState,
      x: number,
      y: number,
      direction: Direction
    ) => {
      if (
        x >= 0 &&
        x <= world.board.width &&
        y >= 0 &&
        y <= world.board.height
      ) {
        return {
          ...world,
          bot: {
            x: x,
            y: y,
            facingDirection: direction,
            placed: true
          }
        }
      } else {
        return {
          ...world,
          error: {
            message: 'Placing coordinaties out of scope'
          }
        }
      }
    }
  }
}
