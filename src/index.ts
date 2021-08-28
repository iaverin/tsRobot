import { DIRECTION, WorldState, runCommand } from "./botmaster"

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

world = runCommand(world, "PLACE 2 , 3, SOUTH")
console.log("Error", world.error)
console.log("Output", world.output)
console.log("World", world)
