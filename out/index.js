function initBotMaster(args) {
    return {
        world: {
            width: args.width | 0,
            height: args.width | 0,
        },
        codeBuffer: args.codeBuffer || new Array(),
        outPut: args.outPut || function (s) { console.log(s); },
        processRobot: function (r) { console.log("process"); }
    };
}
var consoleOut = function (s) { return console.log(s); };
var robot = { x: 0, y: 0 };
var botMaster = initBotMaster({ width: 5, height: 5 });
console.log("Hi");
console.log(botMaster);
//# sourceMappingURL=index.js.map