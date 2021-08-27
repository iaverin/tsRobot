import { expect, assert } from 'chai'
import * as botMaster from '../src/botMaster'

describe('Tests', () => {
  it('Init world', () => {
    const world = botMaster.initWorld(5, 5)
    expect(world.width).to.be.equal(5)
    expect(world.height).to.be.equal(5)
  })

  it('Init world with errors', () => {
    var world = function () {
      return botMaster.initWorld(5.5, 5)
    }
    expect(world).to.throw(Error, /width/)

    var world = function () {
      return botMaster.initWorld(5, 5.5)
    }
    expect(world).to.throw(Error, /height/)

    var world = function () {
      return botMaster.initWorld(0, 5)
    }
    expect(world).to.throw(Error, /width/)

    var world = function () {
      return botMaster.initWorld(5, 0)
    }
    expect(world).to.throw(Error, /height/)
  })
})
