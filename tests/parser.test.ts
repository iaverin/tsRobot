import { expect, assert } from 'chai'
import * as parser from '../src/botmaster/core/parser'
import { DIRECTION, WorldState } from '../src/botmaster/core/types'

describe('Parser', () => {
  it('Should extract command executors and argument values', () => {
    const functionMap: parser.CommandResolverMapping = {
      TEST: {
        description: 'Return initial world',
        resolve: (world: WorldState, a: number): WorldState => {
          return world
        }
      }
    }

    const parsedLine: parser.ParsedLine = parser.parseLine(
      'TEST 1',
      functionMap
    )

    expect(parsedLine.command).to.equal('TEST')
    expect(parsedLine).to.have.property('args')
    expect(parsedLine).to.not.have.property('error')
    expect((parsedLine as parser.ParsedLine).args[0]).to.equal('1')
    expect(parsedLine.resolve).to.equal(functionMap.TEST.resolve)

    expect(parser.parseLine(' TEST 1', functionMap).command).to.equal('TEST')
    expect(parser.parseLine(' TEST ', functionMap).command).to.equal('TEST')
    expect(parser.parseLine(' TEST ', functionMap).args).to.deep.equal([])
  })

  it('Parser should report error for  not founded command ', () => {
    const functionMap: parser.CommandResolverMapping = {
      ADD: {
        description: 'ADD <x>. Adding 1 to <x>',
        resolve: (world: WorldState, a: number) => {
          return world
        }
      }
    }

    const parsedLine: parser.ParsedLine = parser.parseLine(
      'ADDDD 1',
      functionMap
    )

    expect(parsedLine).to.have.property('error')
    expect(parsedLine.error.type).to.deep.equal(
      parser.PARSER_ERROR.COMMAND_NOT_FOUND
    )
  })

  it('Parser should report error for wrong amount of arguments', () => {
    const functionMap: parser.CommandResolverMapping = {
      TEST: {
        resolve: (world) => {
          return world
        }
      },
      DECR: {
        description: 'DECR X,Y. Decrememt X by Y',
        resolve: (world, a: number, b: number) => {
          return world
        }
      }
    }

    const parsedLine = parser.parseLine('DECR 2 , 1 ', functionMap)
    expect(parsedLine).to.not.have.property('error')
    expect(parser.parseLine('TEST 1', functionMap).error).to.deep.include({
      type: parser.PARSER_ERROR.WRONG_ARGUMENT_NUMBER
    })
    expect(parser.parseLine('DECR 1,2,3', functionMap).error).to.deep.include({
      type: parser.PARSER_ERROR.WRONG_ARGUMENT_NUMBER
    })
    
    expect(parser.parseLine('DECR ,,3', functionMap).error).to.deep.include({
      type: parser.PARSER_ERROR.WRONG_ARGUMENT_NUMBER
    })

    expect(parser.parseLine('DECR', functionMap).error).to.deep.include({
      type: parser.PARSER_ERROR.WRONG_ARGUMENT_NUMBER
    })

  })

  it('Parser should report error for wrong types of arguments')
})
