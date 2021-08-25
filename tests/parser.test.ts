import { expect, assert } from 'chai'
import * as parser from '../src/parser'

describe('Parser tests', () => {

        it("Should load code from string, trim and convert to uppercase ", () => {
            
            const code = ` PLACE X,Y,F
            MOVE \t
            \n
            LEFT
            right
            REPORT

            `
            const codeBuffer: parser.Code = parser.loadCodeFromString(code)
            expect(codeBuffer).to.deep.equal(["PLACE X,Y,F", "MOVE", "LEFT", "RIGHT", "REPORT"])

        })

        it("Should return empty code buffer if there is no code", () => {
            const code =" \n\t\ \n\n\n\n\n "
            const codeBuffer: parser.Code = parser.loadCodeFromString(code)
            expect(codeBuffer).to.deep.equal([])

        })
    
    })

