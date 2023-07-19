import { useLocation } from "react-router-dom"
import './fight.css'

const FightScreen = () => {
    const location = useLocation()
    const state = location.state
    console.log(state.character2.versus)
    return(
        <div className="container transition-fade">  
            <h1 className="header_text">BATTLE <br/>1</h1>
            <h1 className="versus">VS</h1>
            <div>
                <img src={state.character1.versus} width={500} className="fight_left"/>
                <img src={state.character2.versus} width={570} className="fight_right"/>
            </div>
        </div>
    )
}

export default FightScreen