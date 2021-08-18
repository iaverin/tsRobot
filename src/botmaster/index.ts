
 export type Direction = {
    NORTH: "NORTH",
    SOUTH: "SOUTH",
    EAST: "EAST", 
    WEST: "WEST" 
}

export type Robot = {
    x: number | null,
    y: number | null,
    facingDirection: Direction | null
}

export type World = 
    {
        width: number,
        height: number
    } 

export interface BotMaster {
    
    codeBuffer: Array<string>
    outPut: (s: string) => void
    
    world:{
        width: number,
        height: number
    } 
    
    processRobot: (r: Robot, code: Array<string>) => void
}

export function initBotMaster(args:{width: number, height: number, outPut?: (s: string)=> void, codeBuffer?: Array<string>}) : BotMaster {

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

export function initWorld(width:number, height:number) : World {
     
     if (width <= 0 || width % 1 !== 0 ) throw new Error("width should be an positive integer") 
     if (height <= 0 || height % 1 !== 0 ) throw new Error("height should be an positive integer") 
                  
     return {
         width: width,
         height: height
     }
}
