"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initWorld = exports.initBotMaster = void 0;
function initBotMaster(args) {
    return {
        world: {
            width: args.width | 0,
            height: args.width | 0,
        },
        codeBuffer: args.codeBuffer || new Array(),
        outPut: args.outPut || function (s) { console.log(s); },
        processRobot: () => { console.log("process"); }
    };
}
exports.initBotMaster = initBotMaster;
function initWorld(width, height) {
    if (width % 1 !== 0)
        throw new Error("width should be an integer");
    if (height % 1 !== 0)
        throw new Error("height should be an integer");
    return {
        width: width,
        height: height
    };
}
exports.initWorld = initWorld;
// const consoleOut = (s: string) => console.log(s)
// const robot: Robot = {x:0, y:0, facingDirection: null}
// // const botMaster: BotMaster = initBotMaster({width: 5, height: 5})
// const botMaster: BotMaster = initBotMaster({width: 5, height:5})
// console.log("Hi")
// console.log(botMaster.world.height)
//# sourceMappingURL=index.js.map