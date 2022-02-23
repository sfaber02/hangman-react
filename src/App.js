import "./style.css";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Letters } from "./letters.js";
import { Blanks } from "./blanks.js";
import { HangmanDude } from "./hangmandude.js";
import { words } from "./words.js";
import { Startup } from "./startup";
import { ScoreBoard } from "./scoreboard";
import { HighScore } from "./highscore.js";
import soundEffects from "./sounds/sounds.js";

/** Debug switch - will redefine console.log to an empty function and disable all logging, comment out for debugging mode */
console.log = () => {};

/**
 * Main App component. whatever it does, it does it all.
 * @component
 */
const App = () => {
  /* possible game.status(es) 
        'startup' 
        'new game'
        'in progress' 
        'continue' 
        'won' 
        'lost' 
    */

  /**
   * Main state and ref hooks that run the game
   *
   */
  const [game, setGame] = useState({ status: "startup", startUpStep: 1 });
  const [gameState, setGameState] = useState(() => []);
  const [usedLetters, setUsedLetters] = useState(() => []);
  const [scoreLives, setScoreLives] = useState({ score: 0, lives: 3 });
  const word = useRef("");
  let startupTimer = useRef(0);
  let tries = useRef(() => 0);
  let currentGameState = useRef(() => []);
  let currentUsedLetters = useRef(() => []);
  let currentLives = useRef(() => 0);

 { 
  /**
   * Monitors game.status for changes to the overall game state
   * Possible game states are:
   * 'startup':
   *    - adds event listener for key press to start game
   *    - starts an interval function which steps through the intro screen
   *    - displays new game button on last step
   * 'new game':
   *    - plays new game sound
   *    - clears startup interval 
   *    - changes border to make space for scoreboard
   *    - intitializes ScoreLives state to an object to track score and lives
   *    - generates new random word from words array contained in ./words.js
   *    - intializes tries ref to 0
   *    - intializes gameState state to an array of '_' characters the same length as the word generated
   *    - intializes usedLetters state to an empty array
   *    - sets game.status to 'in progress'
   * 'continue':
   *    - does everything 'new game' does except does not reset ScoreLives state to intial value
   * 'in progress':
   *    - initialize event listener for key presses to input letter guesses, calls function handleKeyPress()
   * 'won': 
   *    - remove event listener for inputting key presses to handleKeyPress() so guesses can't be made after round has ended
   *    - adds event listener to for key presses to continue game by calling continueGame()
   *    - computes a score based on the length of the word guessed and the number of wrong guesses
   *    - adds score to ScoreLives state
   * 'lost':
   *    - remove event listener for inputting key presses to handleKeyPress() so guesses can't be made after round has ended
   *    - conditionally adds an event listener for keypress to the appropriate new game / continue game function based on currentLives ref
   *    - reduces lives in ScoreLives state by 1 
   */
 }
  useEffect(() => {
    console.log(game.status);
    switch (game.status) {
      case "startup":
        document.addEventListener("keydown", startGame);
        startupTimer.current = setInterval(() => {
          setGame((prevState) => {
            return {
              ...prevState,
              startUpStep: prevState.startUpStep + 1,
            };
          });
        }, 1100);
        break;
      case "new game":
        soundEffects.startGame.play();
        clearInterval(startupTimer.current);
        document.getElementById("mainContainer").style.borderBottom = "0";
        setScoreLives({ score: 0, lives: 3 });
        word.current = words[Math.floor(Math.random() * (words.length - 1))];
        tries.current = 0;
        setGameState(() => {
          let initialBoard = [];
          for (let e = 0; e < word.current.length; e++) {
            initialBoard.push("_");
          }
          return initialBoard;
        });
        setUsedLetters(() => []);
        setGame({ status: "in progress" });
        break;
      case "continue":
        soundEffects.startGame.play();
        word.current = words[Math.floor(Math.random() * (words.length - 1))];
        tries.current = 0;
        setGameState(() => {
          let initialBoard = [];
          for (let e = 0; e < word.current.length; e++) {
            initialBoard.push("_");
          }
          return initialBoard;
        });
        setUsedLetters(() => []);
        setGame({ status: "in progress" });
        break;
      case "in progress":
        console.log("in progress event listener added");
        document.addEventListener("keydown", handleKeyPress);
        break;
      case "won": {
        console.log("won event listener SHOULD BE REMOVED");
        document.removeEventListener("keydown", handleKeyPress);
        document.addEventListener("keydown", continueGame);
        let tempScore = word.current.length * 100 - tries.current * 30;
        tempScore = tempScore < 1 ? 1 : tempScore;
        setScoreLives((prev) => {
          return {
            ...prev,
            score: prev.score + tempScore,
          };
        });
        break;
      }
      case "lost":
        console.log("lost event listener SHOULD BE REMOVED");
        console.log(`lives = ${scoreLives.lives}`);
        document.removeEventListener("keydown", handleKeyPress);
        if (currentLives.current > 1) {
          document.addEventListener("keydown", continueGame);
        } else {
          document.addEventListener("keydown", startGame);
        }
        setScoreLives((prev) => {
          return {
            ...prev,
            lives: prev.lives - 1,
          };
        });
        break;
      default:
        break;
    }
  }, [game.status]);

  /** monitors gameState and sets currentGameState ref = to game state for various functions that need real time gameState info */
  useEffect(() => {
    console.log(`set new currentGameStateRef to ${gameState}`);
    currentGameState.current = [...gameState];
  }, [gameState]);

  /** monitors usedLetters and sets currentUsedLetters = to usedLetters state for various functions that need real time usedLetters info */
  useEffect(() => {
    console.log(`set new currentUsedLetters to ${usedLetters}`);
    currentUsedLetters.current = [...usedLetters];
  }, [usedLetters]);

  /** monitors scoreLives.lives and sets currentLives ref for real time Lives count referencing */
  useEffect(() => {
    currentLives.current = scoreLives.lives;
  }, [scoreLives.lives]);

  /**
   * 
   * @param {event object} param0
   *  
   */
  const handleClick = ({ target }) => {
    console.log("********* HandleClick *********");
    console.log(target.id);
    console.log(`gameState = ${gameState}`);
    console.log(`currentGameState = ${currentGameState.current}`);
    console.log(`usedLetters = ${usedLetters}`);
    console.log(`currentUsedLetters = ${currentUsedLetters.current}`);
    findMatch(target.id);
    addUsedLetter(target.id);
  };

  const handleKeyPress = useCallback((event) => {
    let letter = event.key.toUpperCase();
    console.log("********* Handle Key Press *********");
    console.log(letter);
    console.log(`gameState = ${gameState}`);
    console.log(`currentGameState = ${currentGameState.current}`);
    console.log(`usedLetters = ${usedLetters}`);
    console.log(`currentUsedLetters = ${currentUsedLetters.current}`);
    if (!currentUsedLetters.current.includes(letter) && /[A-Z]/.test(letter)) {
      findMatch(letter);
      addUsedLetter(letter);
    }
  }, []);

  const findMatch = (letter) => {
    console.log("********* Find Match *********");
    console.log(`gameState = ${gameState}`);
    console.log(`currentGameState = ${currentGameState.current}`);
    console.log(`usedLetters = ${usedLetters}`);
    console.log(`currentUsedLetters = ${currentUsedLetters.current}`);
    let foundOne = false;
    for (let char in word.current) {
      if (word.current[char].toLowerCase() == letter.toLowerCase()) {
        currentGameState.current[char] = letter;
        foundOne = true;
      }
    }
    if (!foundOne) {
      tries.current++;
    }
    setGameState([...currentGameState.current]);
    checkWinLose(tries.current, foundOne);
  };

  const addUsedLetter = (letter) => {
    console.log("********* Add used Letter *********");
    setUsedLetters((prevLetters) => [...prevLetters, letter]);
  };

  const checkWinLose = (turnsTaken, foundOne) => {
    console.log(`********Check win/Lose ************`);
    console.log(`gameState = ${gameState}`);
    console.log(`currentGameState = ${currentGameState.current}`);
    console.log(`usedLetters = ${usedLetters}`);
    console.log(`currentUsedLetters = ${currentUsedLetters.current}`);
    console.log(`Lives = ${scoreLives.lives}`);
    if (
      turnsTaken <= 7 &&
      currentGameState.current.join("").toLowerCase() ===
        word.current.toLowerCase()
    ) {
      soundEffects.correctLetter.pause();
      soundEffects.correctWord.play();
      setGame({ status: "won" });
    } else if (turnsTaken > 6) {
      if (currentLives.current > 1) {
        soundEffects.wrongLetter.pause();
        soundEffects.wrongWord.play();
      } else {
        soundEffects.gameOver.play();
      }
      setGame({ status: "lost" });
    } else {
      if (foundOne) {
        soundEffects.correctLetter.currentTime = 0;
        soundEffects.correctLetter.play();
      } else {
        soundEffects.wrongLetter.currentTime = 0;
        soundEffects.wrongLetter.play();
      }
    }
  };

  const startGame = useCallback(() => {
    document.removeEventListener("keydown", startGame);
    setGame({ status: "new game" });
  }, []);

  const continueGame = useCallback(() => {
    document.removeEventListener("keydown", continueGame);
    setGame({ status: "continue" });
  }, []);

  return (
    <div id="mainContainer">
      {game.status === "startup" && <Startup step={game.startUpStep} />}
      {game.status === "won" && (
        <div className="scoreMessage">
          <h1>THAT'S IT!</h1>
          <h4>
            Scored {word.current.length * 100 - tries.current * 30} Points
          </h4>
        </div>
      )}
      {game.status === "lost" && (
        <div className="scoreMessage">
          {scoreLives.lives < 1 ? <h1>GAME OVER</h1> : <h1>YOU ARE HANGED</h1>}
          <h4>The word was:</h4>
        </div>
      )}
      {game.status === "in progress" && <HangmanDude turn={tries.current} />}
      {(game.status === "in progress" ||
        game.status === "won" ||
        game.status === "lost") && (
        <Blanks current={gameState} status={game.status} word={word.current} />
      )}
      {game.status === "in progress" && (
        <Letters handleClick={handleClick} usedLetters={usedLetters} />
      )}
      {game.status != "startup" && (
        <ScoreBoard scoreLives={scoreLives} turn={tries.current} />
      )}
      <div id="menu">
        {game.status !== "in progress" &&
          game.status !== "won" &&
          (game.status != "lost" || scoreLives.lives <= 0) &&
          (game.startUpStep > 4 || !game.startUpStep) && (
            <div id="newGame">
              <button className="menuButtons" onClick={startGame}>
                New Game
              </button>
            </div>
          )}
        {(game.status == "won" ||
          (game.status == "lost" && scoreLives.lives > 0)) && (
          <div id="continue">
            <button className="menuButtons" onClick={continueGame}>
              Continue
            </button>
          </div>
        )}
      </div>
      {/* <h3 id="cheatWord">{word.current}</h3> */}
    </div>
  );
};

export { App };
