"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const botMaster = require("./botmaster");
const consoleOut = (s) => console.log(s);
const robot = { x: 0, y: 0, facingDirection: null };
// const botMaster: BotMaster = initBotMaster({width: 5, height: 5})
const bm = botMaster.initBotMaster({ width: 5, height: 5 });
console.log("Hisss");
console.log(bm);
console.log("Done");
//# sourceMappingURL=index.js.map