import { Route, Routes } from "react-router-dom"
import CharacterScreen from "./screens/character/characters.screen"
import FightScreen from "./screens/fight/fight.screen"

const AppWrapper = () => {
  return(
    <Routes>
      <Route path="/" element={<CharacterScreen/>}/>
      <Route path="/fight" element={<FightScreen/>}/>
    </Routes>
  )
}

export default AppWrapper