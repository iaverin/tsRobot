import { Func } from "mocha"
import { Direction } from "./botmaster"

export type allowedArgumentTypes = number | typeof Direction

export type Code = Array<string>

export function loadCodeFromString(s:string): Code | null {
    
    const code:Code = []
    
    s.split("\n").forEach((v)=>{
        const codeLine = v.trim().toUpperCase()
        if (codeLine !=="") 
        code.push(codeLine)
    })
   
    return code
        
}

export type Token = {
    function: string
    args: []
}

export enum BotErrorType {
     COMMAND_NOT_FOUND = 1,
     WRONG_PARAMS = 2, 
     RUNTIME_ERROR = 3
}

export type BotError = {
    line: number,
    type: BotErrorType, 
    message: string, 
}

export function tokenToTypedValue(token:string): allowedArgumentTypes {
    
    const tryNumber:number = Number(token)
    
    if (!!tryNumber && (tryNumber > 0 && tryNumber % 1 === 0 ) ) {
        return tryNumber
    }

    const tryDirection = Direction[token]
    if (tryDirection) return tryDirection

    return undefined

}

export function parseLine(line:string, functionsMap: FunctionMapping): ParsedLine | BotError | void {
    const [token, ...args] = line.split(" ")
    
    if (!(token in functionsMap)) {
        return  {
            type: BotErrorType.COMMAND_NOT_FOUND,
            message: `Command ${token} not found`
        } as BotError
    }
        
    const parsedLine: ParsedLine = { execute: functionsMap[token].execute, args:[]} 

    args.forEach((arg, i) => {
        const tokenValue =  tokenToTypedValue(arg)
        if (tokenValue) {
            parsedLine.args.push(tokenValue)
        }
        else{
                // report error
        }

    })

    return parsedLine
    
}

export type FunctionMapping = {
    [token : string] : {
        description?: string,
        positionalArgsTypes?:Array<any> | null,
        execute(...args: Array<any>): void,
    }
}

type ParsedLine = {
    execute(args: any): any, 
    args: Array<allowedArgumentTypes> 
}

export const functionsMap: FunctionMapping  = {
    "HELLO_WORLD": {
        description: "test function",
        execute: (args:any) => {args.result = "Hello World!"}
    } 
}