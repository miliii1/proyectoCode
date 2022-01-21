import { useEffect, useState } from 'react';
import SingleCard from './components/SingleCard';
import './App.css';

const cardImages = [
  {"src": "/img/javascript.png", matched: false },
  {"src": "/img/html.png", matched: false },
  {"src": "/img/css.png", matched: false },
  {"src": "/img/react.png", matched: false },
  {"src": "/img/nodejs.png", matched: false },
  {"src": "/img/mongodb.png", matched: false }
]

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id: Math.random() }));

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    // console.log(card)
  }

  //comparar 2 tarjetas
  useEffect(() => {
    if(choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        // console.log('Estas tarjetas son iguales')
        resertTurn()
      } else {
        // console.log('Estas tarjetas no son iguales')
       setTimeout(() => resertTurn(), 1000) 
      }
    }
  }, [choiceOne, choiceTwo])

  console.log(cards)

  const resertTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns+ 1);
    setDisabled(false);
  }

  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="App">
      <h1>Magic Nova</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard key={card.id} card={card} 
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled}
          />   
        ))}
      </div>
      <p>Turnos: {turns}</p>
    </div>
  );
}

export default App;
