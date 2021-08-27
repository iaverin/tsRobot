import { expect, assert } from 'chai'
import { DIRECTION, RUNTIME_ERROR, WorldState } from '../src/core/commands'

import { resolvers } from '../src/core/commands'

describe('Test resolvers', () => {
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

  it('Should PLACE robot ', () => {
    const newWorld = resolvers.PLACE.resolve(initialWorld, 1, 1, DIRECTION.EAST)
    expect(newWorld).to.deep.include({
      bot: { x: 1, y: 1, facingDirection: DIRECTION.EAST, placed: true }
    })
  })

  it('Should not PLACE robot out of border', () => {
   
    expect(
      resolvers.PLACE.resolve(initialWorld, 10, 1, DIRECTION.EAST).error
    ).to.deep.include({type: RUNTIME_ERROR.WRONG_ARGUMENT_VALUE})

    expect(
      resolvers.PLACE.resolve(initialWorld, 1, 10, DIRECTION.EAST).error
    ).to.deep.include({ type: RUNTIME_ERROR.WRONG_ARGUMENT_VALUE })

    expect(
      resolvers.PLACE.resolve(initialWorld, -1, 3, DIRECTION.EAST).error
    ).to.deep.include({ type: RUNTIME_ERROR.WRONG_ARGUMENT_VALUE })

    expect(
      resolvers.PLACE.resolve(initialWorld, 1, 1, "STOP").error
    ).to.deep.include({ type: RUNTIME_ERROR.WRONG_ARGUMENT_VALUE })

  })
})
