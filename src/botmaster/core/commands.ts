import {DIRECTION, WorldState} from './types'
import { CommandResolverMapping, PARSER_ERROR } from './parser'

// Define types are using for proceeding commands

export enum RUNTIME_ERROR {
  WRONG_ARGUMENT_VALUE
}

// provide available types for parser to check arguments from commands
// TODO: extract types from commands implementation functions
export type allowedArgumentTypes = number | DIRECTION

// TODO KL: what is going on here? Why not just Number(value) 
// types casting functions from extracted argument value as string token to typed value
export function resolveInt(token: string): number {
  if(token.length === 0 ) return undefined
    
  const tryNumber: number = Number(token)

  if (tryNumber===0) return 0

  if (!!tryNumber && tryNumber >= 0 && tryNumber % 1 === 0) {
    return tryNumber
  }
  return undefined
}

// Commands resolvers mapping
// TODO KL: where do you use description?
export const resolvers: CommandResolverMapping = {
  PLACE: {
    description: 'Place the robot on board',
    resolve: placeResolver
  },

  MOVE: {
    description: 'Move the robot on board',
    resolve: moveResolver
  },
  RIGHT: {
    description: 'Make the robot looking RIGHT',
    resolve: rightResolver
  },
  LEFT: {
    description: 'Make the robot looking RIGHT',
    resolve: leftResolver
  },
  REPORT: {
    description: 'REPORT current position on board',
    resolve: reportResolver
  }
}

// Resolvers
function placeResolver(
  world: WorldState,
  argX: string,
  argY: string,
  argDirection: string
) {
  // TODO KL: this class breaks single responsibility principle
  // it parses params, validates them and then executes the command
  const x = resolveInt(argX)
  const y = resolveInt(argY)
  const direction = DIRECTION[argDirection]

  // TODO KL: this is super complicated, I would have some methods here with readable names
  if (!((!!x || x === 0)  && (!!y || y === 0) && direction)) {
    return {
      ...world,
      error: {
        type: RUNTIME_ERROR.WRONG_ARGUMENT_VALUE,
        message: 'Place error. Wrong argument value(-s).'
      }
    }
  }

  // TODO KL: Why board would not have a method
  if (
    !(x >= 0 && x <= world.board.width && y >= 0 && y <= world.board.height)
  ) {
    return {
      ...world,
      error: {
        type: RUNTIME_ERROR.WRONG_ARGUMENT_VALUE,
        message: 'Placing coordinaties out of board.'
      }
    }
  }

  return {
    ...world,
    bot: {
      x: x,
      y: y,
      facingDirection: direction,
      placed: true
    }
  }
}

// TODO KL: it is not really a resolver, it is an executor
function moveResolver(world: WorldState): WorldState {
  let bot = world.bot

  // TODO KL: how come this one does not report an error?
  if (!bot.placed) return { ...world }

  // TODO KL: this could be solved smarter
  if (bot.x < world.board.width - 1 && bot.facingDirection === DIRECTION.EAST)
    bot.x += 1

  if (bot.x > 0 && bot.facingDirection === DIRECTION.WEST) bot.x -= 1

  if (bot.y < world.board.height - 1 && bot.facingDirection === DIRECTION.NORTH)
    bot.y += 1

  if (bot.y > 0 && bot.facingDirection === DIRECTION.SOUTH) bot.y -= 1

  return {
    ...world,
    bot: bot
  }
}

function rightResolver(world: WorldState): WorldState {
  let bot = world.bot
  if (!bot.placed) return { ...world }

  // TODO KL: could be done smarter
  switch (bot.facingDirection) {
    case DIRECTION.NORTH:
      bot.facingDirection = DIRECTION.EAST
      break
    case DIRECTION.SOUTH:
      bot.facingDirection = DIRECTION.WEST
      break
    case DIRECTION.EAST:
      bot.facingDirection = DIRECTION.SOUTH
      break
    case DIRECTION.WEST:
      bot.facingDirection = DIRECTION.NORTH
      break
  }

  return {
    ...world,
    bot: bot
  }
}

function leftResolver(world: WorldState): WorldState {
  let bot = world.bot
  if (!bot.placed) return { ...world }

  switch (bot.facingDirection) {
    case DIRECTION.NORTH:
      bot.facingDirection = DIRECTION.WEST
      break
    case DIRECTION.SOUTH:
      bot.facingDirection = DIRECTION.EAST
      break
    case DIRECTION.EAST:
      bot.facingDirection = DIRECTION.NORTH
      break
    case DIRECTION.WEST:
      bot.facingDirection = DIRECTION.SOUTH
      break
  }

  return {
    ...world,
    bot: bot
  }
}

function reportResolver(world:WorldState):WorldState{
  if (!world.bot.placed){
    return { ...world }
  }

  return {
    ...world,
    output: `${world.bot.x},${world.bot.y},${world.bot.facingDirection}`
  }
 
}