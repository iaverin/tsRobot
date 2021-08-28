# Intro

This package contains implementation of 'Robot on Board' challenge.
## In brief

* The application is a simulation of a toy robot moving on a square tabletop, of dimensions 5 units x 5 units.
* There are no other obstructions on the table surface.
* The robot is free to roam around the surface of the table, but must be prevented from falling to destruction. Any movement that would result in the robot falling from the table must be prevented, however further valid movement commands must still be allowed. 

For the full description pleace reffer to [challenge.md] file.


# Installation and running the demo 

```shell
# install dependencies
npm install

# run tests
npm run test 

# demo programm
npm run start
```
# Implementation overview

The robot controlling system implemented as a separate component called ```botmaster```  with an ability to separate it into detachable library for using in complex project. 

The ```botmaster``` implemented in a functional way: it takes the whole state as parameter and returns new state with possibe errors and output.

```javascript

// ./src/botmaster/core/types.ts
// State declaration 

type BotState = {
  x: number
  y: number
  placed: boolean
  facingDirection: DIRECTION
}

export type WorldState = {
  board: {
    width: number
    height: number
  }

  bot: BotState

  output: string | null

  error: {
    type: RUNTIME_ERROR | PARSER_ERROR
    message: string
  } | null
}

```


## API usage overview

For detailed API overview please reffer to ```./src/botmaster/core/runner.ts```

### Run the whole script 

```javascript

import {
  WorldState, // describes the state of board and robot
  initWorld, // helper  to init the board
  runScript   // script runner 
} from './botmaster'

// initiate the 5x5 board
const world:WorldState =initWorld(5,5) 

// provide script
const commands = `
    PLACE 0,0,NORTH
    MOVE
    REPORT
`

// run the script and get the new state after all of commands in script
// callback are used for dynamic output
const afterScriptWorld = runScript(world, commands, (s)=>{console.log(s)})

// checking for errors
  if (afterScriptWorld.error) {
    console.log('Error', afterScriptWorld.error)
 }

```

### Run single command 

```javascript
import {
  WorldState, // describes the state of board and robot
  initWorld, // helper  to init the board
  runCommand   // script runner 
} from './botmaster'

const world:WorldState =initWorld(5,5) 

// let's run single command
let afterScriptWorld = runCommand(world, "PLACE 1,1,NORTH")

if (afterScriptWorld.error) {
    console.log('Error', afterScriptWorld.error)
    sys.exit(0)
}

if (afterScriptWorld.output) {
    console.log(afterScriptWorld.output)
}

```

## Files

###  Demo program

The demo program is presented in ```src/index.ts``` file. It runs several scripts for robot presented in challenge description with some additional cases. 


### The lib

Robot's command management component is locacted under ```src/botmaster``` directory. 
```
./src/botmaster
    ├── core
    |    ├ commands.ts    # commands implementation functions (resolvers)  
    |    ├ parser.ts      # extracts resolvers and arguments from text
    |    ├ runner.ts      # provides API to run actual command
    |    ├ types.ts       # common types 
    |
    ├── tests 
    |      └── ...        # tests for components
    |
    ├── index.ts          # exports the final api 

```

# Self evaluation
### Overall
- Code seems solid with maintained functional approach
- No documentation and commenta in code provided
- Some naming could be slight confusing
   

### Maintainablity
Thanks to typescript, separation of functional components and complete tests coverage it seems easy to maintain the code while adding or fixing something. 

### Extensibility

It's easy to add additional commands with different parameters. Current parser allows to map any functions with any numbers of parameters and automatically detect corecntess  number of arguments in user's commands. However type checking is the responcibility of resolving function (check ```./botmaster/core/commands.ts``` file).  

However introducing features such as IFs, FORs and etc will require signigicant efforts. 

### Readiness for production 
Ready for production. Has no internal state so ready for scaling ) 


## 













