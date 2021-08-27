import { expect, assert } from 'chai'
import { DIRECTION, RUNTIME_ERROR, WorldState } from '../src/core/commands'

import { resolvers } from '../src/core/commands'

const initialWorld: WorldState = {
  board: {
    height: 5,
    width: 5
  },

  bot: {
    x: 0,
    y: 0,
    facingDirection: DIRECTION.NORTH,
    placed: false
  },

  error: null
}

describe('Test PLACE resolver', () => {
  it('Should PLACE robot ', () => {
    const newWorld = resolvers.PLACE.resolve(initialWorld, 1, 1, DIRECTION.EAST)
    expect(newWorld).to.deep.include({
      bot: { x: 1, y: 1, facingDirection: DIRECTION.EAST, placed: true }
    })
  })

  it('Should not PLACE robot out of border', () => {
    expect(
      resolvers.PLACE.resolve(initialWorld, 10, 1, DIRECTION.EAST).error
    ).to.deep.include({ type: RUNTIME_ERROR.WRONG_ARGUMENT_VALUE })

    expect(
      resolvers.PLACE.resolve(initialWorld, 1, 10, DIRECTION.EAST).error
    ).to.deep.include({ type: RUNTIME_ERROR.WRONG_ARGUMENT_VALUE })

    expect(
      resolvers.PLACE.resolve(initialWorld, -1, 3, DIRECTION.EAST).error
    ).to.deep.include({ type: RUNTIME_ERROR.WRONG_ARGUMENT_VALUE })

    expect(
      resolvers.PLACE.resolve(initialWorld, 1, 1, 'STOP').error
    ).to.deep.include({ type: RUNTIME_ERROR.WRONG_ARGUMENT_VALUE })
  })
})

describe('MOVE resolver', () => {
  it('should not move if not placed', () => {
    expect(resolvers.MOVE.resolve(initialWorld)).to.deep.equal(initialWorld)
  })

  it('should move NORTH till the end of board', () => {
    let movedWorld = {
      ...initialWorld,
      bot: { x: 2, y: 2, facingDirection: DIRECTION.NORTH, placed: true }
    }
    expect(resolvers.MOVE.resolve(movedWorld).bot).to.deep.include({ y: 3 })

    for (var i = 0; i < 10; i++) {
      movedWorld = resolvers.MOVE.resolve(movedWorld)
    }

    expect(movedWorld.bot.y).to.equal(4)
  })

  it('should move SOUTH till the end of board', () => {
    let movedWorld = {
      ...initialWorld,
      bot: { x: 2, y: 2, facingDirection: DIRECTION.SOUTH, placed: true }
    }
    expect(resolvers.MOVE.resolve(movedWorld).bot).to.deep.include({ y: 1 })

    for (var i = 0; i < 10; i++) {
      movedWorld = resolvers.MOVE.resolve(movedWorld)
    }

    expect(movedWorld.bot.y).to.equal(0)
  })

  it('should move EAST till the end of board', () => {
    let movedWorld = {
      ...initialWorld,
      bot: { x: 2, y: 2, facingDirection: DIRECTION.EAST, placed: true }
    }
    expect(resolvers.MOVE.resolve(movedWorld).bot).to.deep.include({ x: 3 })

    for (var i = 0; i < 10; i++) {
      movedWorld = resolvers.MOVE.resolve(movedWorld)
    }

    expect(movedWorld.bot.x).to.equal(4)
  })

  it('should move WEST till the end of board', () => {
    let movedWorld = {
      ...initialWorld,
      bot: { x: 2, y: 2, facingDirection: DIRECTION.WEST, placed: true }
    }
    expect(resolvers.MOVE.resolve(movedWorld).bot).to.deep.include({ x: 1 })

    for (var i = 0; i < 10; i++) {
      movedWorld = resolvers.MOVE.resolve(movedWorld)
    }

    expect(movedWorld.bot.x).to.equal(0)
  })
})

describe('RIGHT Resolver', () => {
/* ^^^^^^^^
      N 
    W   E
      S
  ~~~~~~~~~ */ 

  it("If not PLACED skip the command", ()=>{
    expect(resolvers.RIGHT.resolve(initialWorld)).to.deep.equal(initialWorld)
  })
  
  it('Looking NORTH turning RIGHT to EAST', () => {
    const turningWorld: WorldState = {
      ...initialWorld,
      bot: {
        ...initialWorld.bot,
        placed: true,
        facingDirection: DIRECTION.NORTH
      }
    }
    expect(resolvers.RIGHT.resolve(turningWorld).bot.facingDirection).to.equal(
      DIRECTION.EAST
    )
  })

  it('Looking SOUTH turning RIGHT to WEST', () => {
    const turningWorld: WorldState = {
      ...initialWorld,
      bot: {
        ...initialWorld.bot,
        placed: true,
        facingDirection: DIRECTION.SOUTH
      }
    }
    expect(resolvers.RIGHT.resolve(turningWorld).bot.facingDirection).to.equal(
      DIRECTION.WEST
    )
  })

  it('Looking EAST turning RIGHT to SOUTH', () => {
    const turningWorld: WorldState = {
      ...initialWorld,
      bot: {
        ...initialWorld.bot,
        placed: true,
        facingDirection: DIRECTION.EAST
      }
    }
    expect(resolvers.RIGHT.resolve(turningWorld).bot.facingDirection).to.equal(
      DIRECTION.SOUTH
    )
  })
  it('Looking WEST turning RIGHT to NORTH', () => {
    const turningWorld: WorldState = {
      ...initialWorld,
      bot: {
        ...initialWorld.bot,
        placed: true,
        facingDirection: DIRECTION.WEST
      }
    }
    expect(resolvers.RIGHT.resolve(turningWorld).bot.facingDirection).to.equal(
      DIRECTION.NORTH
    )
  })
})
