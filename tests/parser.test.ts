import { expect, assert } from 'chai'
import { Direction } from '../src/botMaster'
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

        it("Should call function from function map", () =>{
            let a = {result:""}
            parser.functionsMap["HELLO_WORLD"].execute(a)
            expect(a.result).equal("Hello World!")
        })

        it("Should extend functions map", () =>{
            
            let a = {result:""}

            parser.functionsMap["HELLO_WORLD"].execute(a)
            expect(a.result).equal("Hello World!")
        })

        it("Should convert string token to allowed type", () => {
            expect(parser.tokenToTypedValue("1")).equal(1)
            expect(parser.tokenToTypedValue("NORTH")).deep.equal(Direction.NORTH)
            expect(parser.tokenToTypedValue("Yo")).equal(undefined)
            expect(parser.tokenToTypedValue("0.1")).equal(undefined)
            expect(parser.tokenToTypedValue("-1")).equal(undefined)
            expect(parser.tokenToTypedValue("")).equal(undefined)
        })  

        it("Should extract command executors and argument value", () => {
           
            const functionMap:parser.FunctionMapping = {
                "ADD":
                    {
                        description: "ADD <x>. Adding 1 to <x>",
                        execute: (a:number)=>{ return a+1}
                    }
            }

            const parsedLine: parser.ParsedLine = parser.parseLine("ADD 1",functionMap)

            expect(parsedLine).to.have.property("args")
            expect(parsedLine).to.have.property("args")
            expect((parsedLine as parser.ParsedLine).args[0]).to.equal(1)
            expect(parsedLine.execute(...parsedLine.args)).equal(2)
            
        })

        it ("Parder should report error for  not founded command ", () => {
            const functionMap:parser.FunctionMapping = {
                "ADD":
                    {
                        description: "ADD <x>. Adding 1 to <x>",
                        execute: (a:number)=>{ return a+1}
                    }
            }

            const parsedLine: parser.ParsedLine = parser.parseLine("ADDDD 1",functionMap)

            expect(parsedLine).to.have.property("error")
            expect(parsedLine.error.type).to.deep.equal(parser.BotErrorType.COMMAND_NOT_FOUND)

        })

        it("Parser should report error for wrong amount of arguments", () => {
            expect(1).eq(0)
        })

        it("Parser should report error for wrong types of arguments", () => {
            expect(1).eq(0)
        })

        it("Parsed should parse functionMap with several commands", ()=>{
            
        })
    
    })

