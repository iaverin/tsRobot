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