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
