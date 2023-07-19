import { mkService } from "../../service"
import './character.css'
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const CharacterScreen = () => {
  const navigate = useNavigate()
  const selectedElementRef = useRef<any | null>(null);
  const [character, setCharacter] = useState<any>({select: false})
  const [secCharacter, setSecCharacter] = useState<any>({select: false})
  const [isEventListenerActive, setIsEventListenerActive] = useState(true);
  const [selectedElementIndex, setSelectedElementIndex] = useState(0);

  const handleKeyDown = (event: any) => {
    if(isEventListenerActive){
      return;
    }
    
    switch (event.key) {
      case 'ArrowUp':
        setSelectedElementIndex((prevIndex) => {
          const newIndex = prevIndex - 5;
          return newIndex >= 0 ? newIndex : prevIndex;
        });
        break;
      case 'ArrowDown':
        setSelectedElementIndex((prevIndex) => {
          const newIndex = prevIndex + 5;
          return newIndex < 15 ? newIndex : prevIndex;
        });
        break;
      case 'ArrowLeft':
        setSelectedElementIndex((prevIndex) => {
          const newIndex = prevIndex - 1;
          const row = Math.floor(prevIndex / 5);
          return row === Math.floor(newIndex / 5) ? newIndex : prevIndex;
        });
        break;
      case 'ArrowRight':
        setSelectedElementIndex((prevIndex) => {
          const newIndex = prevIndex + 1;
          const row = Math.floor(prevIndex / 5);
          return row === Math.floor(newIndex / 5) ? newIndex : prevIndex;
        });
        break;
      default:
        break;
    }
  }; 

  const handleKeyPress = (event: any, item: any) => {
    if(event.key === 'Enter'){
      if(character.select){
        setSecCharacter({...item, select: true})
      }else{
        setCharacter({...item, select: true})
      }
    }
  };

  // here i have 3 different useEffect for 3 different action
  // first event adding our events for keys (up, down, left, right)
  // second checks if our state fullfilled and remove our action 
  // third it's autofocus event for our keys

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isEventListenerActive]);

  useEffect(() => {
    if(secCharacter.select === true){
      setIsEventListenerActive(true);
    } else {
      setIsEventListenerActive(false);
    }
  }, [character, secCharacter])

  useEffect(() => selectedElementRef.current.focus(), [selectedElementIndex]);

  if(secCharacter.select === true){
    const data = { character1: character, character2: secCharacter };
    navigate('/fight', {state: data})
  }

  return (
    <div className="main_container">
      <div className="text">SELECT YOUR CHARACTER</div>
      <div className="rot">
        { character.anim && <img src={character.anim} width={250}/>}
        <div className="choose_container">
          {
            mkService.map((item: any, index: number) => (
                <img
                  src={item.logo}
                  // here in classname i have me checks
                  // ${index === selectedElementIndex ? character.name === secCharacter.name ? 'character1' : 'character2' : ''} 
                  // this for track were my box and which character we select now
                  // ${character.name === item.name && 'character1'}
                  // this check setting our first character box 
                  // ${secCharacter.name === item.name && 'character2'}
                  // this check help us set second character box
                  className={`item
                    ${index === selectedElementIndex ? character.name === secCharacter.name ? 'character1' : 'character2' : ''} 
                    ${character.name === item.name && 'character1'}
                    ${secCharacter.name === item.name && 'character2'}
                  `}
                  onKeyDown={(event) => handleKeyPress(event, item)}
                  ref={index === selectedElementIndex ? selectedElementRef : null}
                  tabIndex={0}
                  key={index}
                />
            ))
          }
        </div>
        { secCharacter.anim && <img src={secCharacter.anim} width={250} style={{transform: 'scaleX(-1)'}}/>}
      </div>
      <div className="text">KOMBAT ZONE: SOUL CHAMBER</div>
    </div>
  )
}

export default CharacterScreen
