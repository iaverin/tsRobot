import * as botMaster  from './botmaster'


const consoleOut = (s: string) => console.log(s)

const robot = {x:0, y:0, facingDirection: null}

// const botMaster: BotMaster = initBotMaster({width: 5, height: 5})
const bm = botMaster.initBotMaster({width: 5, height:5})

console.log("Hisss")
console.log(bm)
console.log("Done")
