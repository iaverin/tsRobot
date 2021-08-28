
import { expect, assert } from 'chai'
import * as runner from '../src/botmaster/core/runner'
import {DIRECTION,  WorldState} from '../src/botmaster/core/types'

describe('Runner', () => {
  it('Should load code from string, trim and convert to uppercase ', () => {
    const code = ` PLACE X,Y,F
            MOVE \t
            \n
            LEFT
            right
            REPORT

            `
    const codeBuffer: runner.Code = runner.loadCodeFromString(code)
    expect(codeBuffer).to.deep.equal([
      'PLACE X,Y,F',
      'MOVE',
      'LEFT',
      'RIGHT',
      'REPORT'
    ])
  })

  it('Should return empty code buffer if there is no code', () => {
    const code = ' \n\t \n\n\n\n\n '
    const codeBuffer: runner.Code = runner.loadCodeFromString(code)
    expect(codeBuffer).to.deep.equal([])
  })

})
