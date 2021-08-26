
# Implementaion approach 
```
const bot:BotState = initBot()
type WorldState = {
    board:{
        width: number;
        height: number; 
    }, 
    bot:{
        x: number, 
        y: number,
        facingDirection:  Direction
    }
}

let world = intWorld(board, bot, commands)

while (nextCommand(world)){
    world = applyCommand(world, nextCommad)

    )
    
}

function applyCommand(wolrd: WorldState, nextCommand: parsedCommand) => WolrdState {
    
    if (nextCommand.error) {

        //... 
        reportParsingError(nextCommand.error.message)
        return wolrd;
    } 

    let nextWolrd = copy(wolrd)

    swtich (nextCommand.token){
        case 'PLACE': {
            
            if(!checkPlaceParams(args, world)) {
                reportPlaceError(args)
                return world
            }

            const x = nextcommand.args[0]
            const y = nextcommand.args[1]
            const facing = nextcommand.args[2]
            
            
          
            break;
        }
     /// ... 

    } 

    return nextWolrd 

}  



```
````

PLACE X,Y,F
  commandToken = 
  args X,Y,F

const Direction = {
    NORTH : {x: 0, y: 1},
    SOUTH : {x: 0, y:-1 },
    EAST : {x:1, y:0}, 
    WEST : {x:-1, y:0}
}

parsedCommand = type {
    commandToken: sting, 
    args: Array<{number | typeof Direction}}> 
    execute: (args: Array<{number | typeof Direction}}>)=>any, 
    error?: BotError | undefined
} 

allowedCommands = type {
    [string]: parsedCommands
} 

function world placeCommand(x:number, y:number, directin: Direction){
    
} 


MOVE
LEFT
RIGHT
REPORT


```

# Starting the challange 

```bash
# Installation 
npm install

# Run tests
npm run test

# Run the programs
npm run run

```

# Challenge description 

## Description:

* The application is a simulation of a toy robot moving on a square tabletop, of dimensions 5 units x 5 units.
* There are no other obstructions on the table surface.
* The robot is free to roam around the surface of the table, but must be prevented from falling to destruction. Any movement
that would result in the robot falling from the table must be prevented, however further valid movement commands must still
be allowed.

Create an application that can read in commands of the following form:

```
PLACE X,Y,F
MOVE
LEFT
RIGHT
REPORT
```

* PLACE will put the toy robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST.
* The origin (0,0) can be considered to be the SOUTH WEST most corner.
* The first valid command to the robot is a PLACE command, after that, any sequence of commands may be issued, in any order, including another PLACE command. The application should discard all commands in the sequence until a valid PLACE command has been executed.
* MOVE will move the toy robot one unit forward in the direction it is currently facing.
* LEFT and RIGHT will rotate the robot 90 degrees in the specified direction without changing the position of the robot.
* REPORT will announce the X,Y and orientation of the robot.
* A robot that is not on the table can choose to ignore the MOVE, LEFT, RIGHT and REPORT commands.
* Provide test data to exercise the application.

## Constraints:

The toy robot must not fall off the table during movement. This also includes the initial placement of the toy robot.
Any move that would cause the robot to fall must be ignored.

Example Input and Output:

a)
```
PLACE 0,0,NORTH
MOVE
REPORT
Output: 0,1,NORTH
```

b)
```
PLACE 0,0,NORTH
LEFT
REPORT
Output: 0,0,WEST
```

c)
```
PLACE 1,2,EAST
MOVE
MOVE
LEFT
MOVE
REPORT
Output: 3,3,NORTH
```

## Deliverables:

The source files, the test data and any test code.

## Expectations

We're not just looking for any old solution that would solve the problem. We're looking for:

- good OO or functional practices
- a solid testing approach
- production quality code
- well thought out naming
- solid error handling
- extensibility/maintainability/*ility
- etc

Basically treat the coding test as if it's part of a larger problem.





