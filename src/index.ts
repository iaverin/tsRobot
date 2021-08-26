
import * as parser from './parser'


// main app 

/// types 
enum Direction {
    NORTH = "NORTH",
    SOUTH = "SOUTH",
    EAST = "EAST" ,
    WEST = "WEST"
}

type BotState = {
    x: number, 
    y: number,
    placed: boolean,
    facingDirection:  Direction
}

type WorldState = {
    board:{
        width: number;
        height: number; 
    }, 

    bot:BotState
}

type Command = {
    command: string, 
    arguments: Array<number | Direction>,
}

type commands = Array<Command>

// init world 

let world:WorldState = {
    board:{
        height:5,
        width:5
    },
    
    bot:{
        x: 0,
        y: 0,
        facingDirection: Direction.NORTH,
        placed: false
    }
}



const script = `
    PLACE 0,0,NORTH
    MOVE
    REPORT
    Output: 0,1,NORTH
`

const commandsInmplementation: parser.FunctionMapping = {
    'PLACE':{
        description:"Place the robot on board",
        execute: (world: WorldState, x: number, y:number, direction: Direction) =>{
            
            if ( x>=0 && x <= world.board.width && y>=0 && y <= world.board.height ){
                return {
                    ...world,
                    bot:{
                        x: x,
                        y: y,
                        facingDirection: direction,
                        placed: true
                    }
                }
            }
            else {
                return {
                    ...world,
                    error:{
                        message:"Placing coordinaties out of scope"
                    } 
                }
            }
        } 
    }
}


// while (nextCommand(world)){
//     world = applyCommand(world, nextCommad)

//     )
    
// }