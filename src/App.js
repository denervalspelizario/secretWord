import StartScreen from './components/StartScreen';
import { useCallback, useState, useEffect } from 'react';
import {wordList} from './data/word'
import './App.css';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"},
];

const guessesQty = 3


function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordList);

  const [pickedWord, setPickedWorld] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQty);
  const [score, setScore] = useState(0);

  // funcao para criar a aleatoriedade na categoria
  const pegarPalavraeCategoria = () => {
    const categories = Object.keys(words) // passa para categories todas as chaves da word que recebeu anteriormente a wordlist
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]  

    console.log(category);

    // funcao para criar a aleatoriedade na palavra
    const word = 
      words[category][Math.floor(Math.random() * words[category].length)];  

    console.log(word);
    
    return {word, category}
  };


  // startando o secret word
  const startGame = () => {
    // pegar a palavra e a categoria
    const {word, category} = pegarPalavraeCategoria();

    // criando uma array de letras
    let wordLetters = word.split("") // o split sem espaço vai tranformar a palavra em uma array com suas letras
    wordLetters = wordLetters.map((min) => min.toLowerCase()); // faz um lopping para tranformar todas em minuscula



    console.log(word, category);
    console.log(wordLetters);

    // preenchendo estados
    setPickedWorld(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  };


  // process the letter input
  const verifyLetter = (letter) => {
    
    const normalizedLetter = letter.toLowerCase()

    //  check letter has  already been utilized

      if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)){
        return;
      };

    // push guessed letter or remove a guess
      if(letters.includes(normalizedLetter)){

        setGuessedLetters((actualGuessedLetters) => [
          ...actualGuessedLetters,
          normalizedLetter
        ]);

      } else {
        setWrongLetters((actualWrongLetters) => [
          ...actualWrongLetters,
          normalizedLetter
        ]);

        setGuesses((actualGuesses) => actualGuesses - 1);

      }

  };

  const clearLetterStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }


  
  useEffect(() => {

    if(guesses <= 0){
      // reset all states
      clearLetterStates()

      setGameStage(stages[2].name);
    };

  },[guesses])

  // restartando o jogo
  const retry = () => {
    setScore(0);
    setGuesses(guessesQty);

    setGameStage(stages[0].name)
  }


  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen  startGame={startGame} />}
      {gameStage === 'game' && (
        <Game verifyLetter={verifyLetter}
              pickedWord={pickedWord} 
              pickedCategory={pickedCategory} 
              letters={letters}
              guessedLetters={guessedLetters}
              wrongLetters={wrongLetters}
              guesses={guesses}
              score={score}
          />
        )}
      {gameStage === 'end' && <GameOver  retry={retry}  score={score} />}
    </div>
  );
}

export default App;
