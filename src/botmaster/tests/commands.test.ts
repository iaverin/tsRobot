import { expect, assert } from 'chai'
import { RUNTIME_ERROR } from '../core/commands'

import { DIRECTION, WorldState } from '../core/types'
import { resolveInt, resolvers } from '../core/commands'

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

  error: null,
  output: null
}

describe('resolveInt', ()=>{
  
  it("Should resolve 0", ()=>{
    expect(resolveInt("0")).to.equal(0)
  })

  it('Should resolve 5', () => {
    expect(resolveInt('5')).to.equal(5)
  })

  it('Should not resolve float', () => {
    expect(resolveInt('5.5')).to.equal(undefined)
  })

  it('Should not resolve empty string', () => {
    expect(resolveInt('')).to.equal(undefined)
  })
})

describe('PLACE resolver', () => {
  
  it('Should PLACE robot at 0,0 ', () => {
    const newWorld = resolvers.PLACE.resolve(initialWorld, 0, 0, DIRECTION.EAST)
    expect(newWorld).to.deep.include({
      bot: { x: 0, y: 0, facingDirection: DIRECTION.EAST, placed: true }
    })
  })
  
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
  it('Should not move if not placed', () => {
    expect(resolvers.MOVE.resolve(initialWorld)).to.deep.equal(initialWorld)
  })

  it('Should move NORTH till the end of board', () => {
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

  it('Should move SOUTH till the end of board', () => {
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

  it('Should move EAST till the end of board', () => {
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

  it('Should move WEST till the end of board', () => {
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

  it('If not PLACED skip the command', () => {
    expect(resolvers.RIGHT.resolve(initialWorld)).to.deep.equal(initialWorld)
  })

  it('Looking NORTH turning RIGHT to face EAST', () => {
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

  it('Looking SOUTH turning RIGHT to face WEST', () => {
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

  it('Looking EAST turning RIGHT to face SOUTH', () => {
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

  it('Looking WEST turning RIGHT to face NORTH', () => {
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

describe('LEFT Resolver', () => {
  /* ^^^^^^^^
      N 
    W   E
      S
  ~~~~~~~~~ */

  it('If not PLACED skip the command', () => {
    expect(resolvers.LEFT.resolve(initialWorld)).to.deep.equal(initialWorld)
  })

  it('Looking NORTH turn LEFT to face WEST', () => {
    const turningWorld: WorldState = {
      ...initialWorld,
      bot: {
        ...initialWorld.bot,
        placed: true,
        facingDirection: DIRECTION.NORTH
      }
    }
    expect(resolvers.LEFT.resolve(turningWorld).bot.facingDirection).to.equal(
      DIRECTION.WEST
    )
  })

  it('Looking SOUTH turn LEFT to face EAST', () => {
    const turningWorld: WorldState = {
      ...initialWorld,
      bot: {
        ...initialWorld.bot,
        placed: true,
        facingDirection: DIRECTION.SOUTH
      }
    }
    expect(resolvers.LEFT.resolve(turningWorld).bot.facingDirection).to.equal(
      DIRECTION.EAST
    )
  })

  it('Looking EAST turn LEFT to face NORTH', () => {
    const turningWorld: WorldState = {
      ...initialWorld,
      bot: {
        ...initialWorld.bot,
        placed: true,
        facingDirection: DIRECTION.EAST
      }
    }
    expect(resolvers.LEFT.resolve(turningWorld).bot.facingDirection).to.equal(
      DIRECTION.NORTH
    )
  })

  it('Looking WEST turn LEFT to face SOUTH', () => {
    const turningWorld: WorldState = {
      ...initialWorld,
      bot: {
        ...initialWorld.bot,
        placed: true,
        facingDirection: DIRECTION.WEST
      }
    }
    expect(resolvers.LEFT.resolve(turningWorld).bot.facingDirection).to.equal(
      DIRECTION.SOUTH
    )
  })
})

describe('REPORT test', () => {
  
  it('Should not report if placed', () => {
    const reportWorld: WorldState = {
      ...initialWorld,
      bot: {
        ...initialWorld.bot,
        x: 1,
        y: 2,
        placed: false
      }
    }
    expect(resolvers.REPORT.resolve(reportWorld).output).to.equal(null)
  })


  it('Should report if placed', () => {
    const reportWorld: WorldState = {
      ...initialWorld,
      bot: {
        ...initialWorld.bot,
        x:1,
        y:2,
        placed: true
      }
    }
    expect(resolvers.REPORT.resolve(reportWorld).output).to.equal('1,2,NORTH')
  })


})
