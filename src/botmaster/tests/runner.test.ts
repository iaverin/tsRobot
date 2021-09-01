import { expect, assert } from 'chai'
import * as runner from '../core/runner'
import { DIRECTION, WorldState } from '../core/types'

describe('Runner', () => {
  describe('Code loader', () => {
    // TODO: what is Code Loader? Should be "#loadCodeFromString" or something
    it('Should load code from string, trim and convert to uppercase ', () => {
      const code = `

                      PLACE X,Y,F
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

  describe("Single command runner", ()=>{

    const world =  runner.initWorld(5,5) 

      it("Should run singe command", ()=>{
        expect(runner.runCommand(world, "PLACE 2,3, EAST")).to.deep.include({bot:{x:2,y:3, placed:true, facingDirection: DIRECTION.EAST}})
      })

      it('Should return error', () => {
        expect(runner.runCommand(world, "PLACE 2,,EAST").error).to.exist
        expect(runner.runCommand(world, 'PLC 2,2,EAST').error).to.exist
      })

      it('Should provide output', ()=>{
          const withBot = {
              ...world,
              bot:{
                  ...world.bot,
                  placed:true
              }
          }
          expect(runner.runCommand(withBot, "REPORT").output).to.exist
      })
  })

  describe("Script Runner", ()=>{
      const world = runner.initWorld(5,5) // TODO: inconsistent spacing

      it("Should run script with output", ()=>{

        const script=`
        PLACE 1,1, NORTH
        MOVE
        REPORT
        `
        expect(runner.runScript(world, script)).to.deep.include({output: '1,2,NORTH'})
      })

      it("Should report error and stop execution", ()=>{
        const script = `
            PLACE 1,1, NORTH
            UNKNOWNCOMMAND
            MOVE
            REPORT
        `
        expect(runner.runScript(world, script).error).to.exist
        expect(runner.runScript(world, script).output).to.not.exist
        expect(runner.runScript(world, script).bot).to.deep.include({x:1,y:1})

      })

      it("Should ignore commands when unplaced and run when place", ()=>{
          const script = `
          MOVE
          LEFT
          MOVE
          REPORT
          PLACE 1,1,WEST
          MOVE
          REPORT
          `
          let buffer:Array<string> = []
          
          const fillBuffer:runner.Output  = (s:string)=>{
                buffer.push(s)
          } 

          const newWorld:WorldState = runner.runScript(world, script, fillBuffer)
          expect(buffer.length).to.equal(1)
          expect(newWorld.bot.x).to.equal(0)
          expect(newWorld.bot.y).to.equal(1)
          expect(newWorld.output).to.equal('0,1,WEST')
          expect(newWorld.error).not.to.exist
      }) 
  })

  


})
