import {
  WorldState,
  runScript,
  initWorld,
  loadCodeFromString
} from './botmaster'

const world:WorldState =initWorld(5,5)

{
  console.log('=== EXAMPLE a ====')
  const commands = `PLACE 0,0,NORTH
  MOVE
  REPORT`
  
  console.log(loadCodeFromString(commands).join("\n"))
  
  const afterScriptWorld = runScript(world, commands, (s)=>{console.log(s)})

  if(afterScriptWorld.error){
    console.log('Error', afterScriptWorld.error)
  }

}

{
  console.log('')
  console.log('=== EXAMPLE b ====')
  const commands = `PLACE 0,0,NORTH
  LEFT
  REPORT`
  
  console.log(loadCodeFromString(commands).join('\n'))

  const afterScriptWorld = runScript(world, commands, (s) => {
    console.log(s)
  })

  if (afterScriptWorld.error) {
    console.log('Error', afterScriptWorld.error)
  }
}


{
  console.log('')
  console.log('=== EXAMPLE c ====')
  const commands = `PLACE 1,2,EAST
    MOVE
    MOVE
    LEFT
    MOVE
    REPORT`
  
  console.log(loadCodeFromString(commands).join('\n'))
  
  const afterScriptWorld = runScript(world, commands, (s) => {
    console.log(s)
  })

  if (afterScriptWorld.error) {
    console.log('Error', afterScriptWorld.error)
  }
}

{
  console.log('')
  console.log('=== EXAMPLE: ignore commands before place ====')
  const commands = `MOVE
          LEFT
          MOVE
          REPORT
          PLACE 1,1,WEST
          MOVE
          RIGHT
          REPORT`

  console.log(loadCodeFromString(commands).join('\n'))

  const afterScriptWorld = runScript(world, commands, (s) => {
    console.log(s)
  })

  if (afterScriptWorld.error) {
    console.log('Error', afterScriptWorld.error)
  }
}

{
  console.log('')
  console.log('=== EXAMPLE: keep robot on board ====')
  const commands = `
          PLACE 0,0,SOUTH
          MOVE
          REPORT
          MOVE
          MOVE
          REPORT
          PLACE 4,4, NORTH
          MOVE
          MOVE
          MOVE
          REPORT
          `

  console.log(loadCodeFromString(commands).join('\n'))

  const afterScriptWorld = runScript(world, commands, (s) => {
    console.log(s)
  })

  if (afterScriptWorld.error) {
    console.log('Error', afterScriptWorld.error)
  }
}

{
  console.log('')
  console.log('=== EXAMPLE: error reporting ====')
  const commands = `
          PLACE 0,0,SOUTH
          MOVE
          REPORT
          MOVE
          MOVE
          REPORT
          PLACE 4,4, NORTH
          MOVE
          REPORT
          ERROR1
          ERROR2
          MOVE
          REPORT
          `

  console.log(loadCodeFromString(commands).join('\n'))

  const afterScriptWorld = runScript(world, commands, (s) => {
    console.log(s)
  })

  if (afterScriptWorld.error) {
    console.log('Error', afterScriptWorld.error)
    console.log('Output', afterScriptWorld.output)
  }

}