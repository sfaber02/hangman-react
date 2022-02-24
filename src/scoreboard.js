import React, { useState, useEffect, useRef } from 'react';

/** set local storage location */
const LOCAL_STORAGE_KEY = 'hangman.highscores';

/**
 * 
 * @param {number} props.score - current game score, since last game over, passed from scoreLives state in <App />
 * @param {number} props.lives - lives remaining, passed from scoreLives state in <App />
 * @param {number} props.turn - number of wrong guesses, passed from tries ref() in <App />
 * @returns Scoreboard div which is a flex box containing pertinent game information
 */
const ScoreBoard = (props) => {
    const score = props.scoreLives.score;
    const lives = props.scoreLives.lives;
    const turn = props.turn;

    /**
     * State for storing the current high score, stored client-side
    */
    const [highScoreList, setHighScoreList] = useState(() => ({score: 0}));
    
    /** uncomment and run app to reset local highscore
     * this will ultimately be removed once highscore DB is up
     */
    // localStorage.setItem(LOCAL_STORAGE_KEY, 0); //resets high scores!!! careful!!

    /** First render effect that loads highscore from local storage, and sets highScoreList to stored value if it exists */
    useEffect(() => {
        const highScoreData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (highScoreData) {
           setHighScoreList(highScoreData);
        }
    }, []);

    /**
     * Monitors score to see if it exceeds current highscore
     * updates highScoreList state if new highscore has been achieved
     */
    useEffect (() => {
        if (score > highScoreList.score) {
            setHighScoreList({score: score});
        }
    }, [score]);

    /** Monitors highScoreList for changes and writes changes to local storage */
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(highScoreList));
    }, [highScoreList]);

    


    return (
        <div id="scoreBoard">
            <h3 className='scoreInfo'>Score: {score}</h3>
            <h3 className='scoreInfo'>Lives: {lives}</h3>
            <h3 className='scoreInfo'>Tries: {7 - turn}</h3>
            <h3 className='scoreInfo'>High Score: {highScoreList.score}</h3>
        </div>
    );
}

export { ScoreBoard }