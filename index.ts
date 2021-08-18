
type Direction = {
    NORTH: "NORTH",
    SOUTH: "SOUTH",
    EAST: "EAST", 
    WEST: "WEST" 
}

type Robot = {
    x: number | null,
    y: number | null,
    facingDirection: Direction | null
}

type BotWorld = 
    {
        width: number,
        height: number
    }



interface BotMaster {
    
    codeBuffer: Array<string>
    outPut: (s: string) => void
    
    world:{
        width: number,
        height: number
    }
    
    processRobot: (r: Robot, code: Array<string>) => void
}

function initBotMaster(args:{width: number, height: number, outPut?: (s: string)=> void, codeBuffer?: Array<string>}) : BotMaster {

    return {
        world: {
            width: args.width | 0,
            height: args.width | 0,
        },

        codeBuffer: args.codeBuffer || new Array() , 
        outPut: args.outPut || function (s:string) {console.log(s)}, 
        processRobot: () => {console.log("process")}
    }

}    

function initWorld(width:number, height:number) : BotWorld {
     
     if (width % ( width % 1) !== 1 ) throw new Error("width should be integer") 
     if (height % ( height % 1) !== 1 ) throw new Error("height should be integer") 
                  
     return {
         width: width,
         height: height
     }

}

const consoleOut = (s: string) => console.log(s)

const robot: Robot = {x:0, y:0, facingDirection: null}

// const botMaster: BotMaster = initBotMaster({width: 5, height: 5})
const botMaster: BotMaster = initBotMaster({width: 5, height:5})

console.log("Hi")
console.log(botMaster.world.height)



