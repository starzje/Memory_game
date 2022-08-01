import { useState, useEffect } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";
import YouWonMessage from "./components/YouWonMessage";

const cardImages = [
  { src: "./img/helmet-1.png", matched: false },
  { src: "./img/potion-1.png", matched: false },
  { src: "./img/ring-1.png", matched: false },
  { src: "./img/scroll-1.png", matched: false },
  { src: "./img/shield-1.png", matched: false },
  { src: "./img/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTruns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  //start a game automatically
  useEffect(() => {
    shuffleCards();
  }, []);

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, card: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTruns(0);
  };

  // handle choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // compare cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
      }
      setTimeout(() => resetTurn(), 1000);
    }
  }, [choiceOne, choiceTwo]);

  //reset turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTruns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  //check if all cards are matched
  const everythingIsMatched = () => {
    return cards.every((card) => card.matched);
  };

  return (
    <div className="App">
      {everythingIsMatched() ? (
        <YouWonMessage turns={turns} shuffleCards={shuffleCards} />
      ) : (
        <>
          <h1 className="text-4xl mb-10">Memory card game</h1>
          <button onClick={shuffleCards}>New game</button>
          <div className="card-grid">
            {cards.map((card) => (
              <SingleCard
                card={card}
                handleChoice={handleChoice}
                key={card.card}
                flipped={
                  card === choiceOne || card === choiceTwo || card.matched
                }
                disabled={disabled}
              />
            ))}
          </div>
          <h2 className="mt-8">turns: {turns}</h2>
        </>
      )}
    </div>
  );
}

export default App;
