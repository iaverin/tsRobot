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
     COMMAND_NOT_FOUND,
     UNKWONW_ARGUMENT_TYPE,
     WRONG_ARGUMENT_NUMBER,  
     RUNTIME_ERROR
}

export type BotParseError = {
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


export type ParsedLine = {
    error?: BotParseError,
    execute(...args: any): any, 
    args: Array<allowedArgumentTypes> 
}

export function parseLine(line:string, functionsMap: FunctionMapping): ParsedLine  {
    const [token, ...args] = line.split(" ")
    
    if (!(token in functionsMap)) {
        return {
            error: {
                type: BotErrorType.COMMAND_NOT_FOUND,
                message: `Command ${token} not found`
            }
        } as ParsedLine
    }
        
    const parsedLine: ParsedLine = { execute: functionsMap[token].execute, args:[]} 

    if (parsedLine.execute.length !==  args.length) return {
        error:{
            message: `Worng arguments number: ${args.length}. Should be ${parsedLine.execute.length}`, 
            type: BotErrorType.WRONG_ARGUMENT_NUMBER

        } 
    } as ParsedLine

    args.forEach((arg, i) => {
        const tokenValue =  tokenToTypedValue(arg)
        if (tokenValue) {
            parsedLine.args.push(tokenValue)
        }
        else{
            
            return  {
                    error:{
                        type: BotErrorType.UNKWONW_ARGUMENT_TYPE,
                        message: `Argument ${arg} has unknown type`
                        }
                    } as ParsedLine
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


export const functionsMap: FunctionMapping  = {
    "HELLO_WORLD": {
        description: "test function",
        execute: (args:any) => {args.result = "Hello World!"}
    } 
}