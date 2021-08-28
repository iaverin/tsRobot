import { DIRECTION, WorldState, runCommand, runScript } from './botmaster'

let world:WorldState ={
  board:{
    height:5,
    width: 5
  },
  bot:{
    x:0,
    y:0,
    placed:false,
    facingDirection: DIRECTION.NORTH
  },
  error: null,
  output: null 
}

const commands = `
PLACE 1,2,EAST
MOVE
MOVE
LEFT
MOVE
REPORT

`

let afterScriptWorld = runScript(world, commands, (s)=>{console.log(s)})

if(afterScriptWorld.error){
  console.log('Error', afterScriptWorld.error)
}

