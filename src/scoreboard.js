import React, { useState, useEffect, useRef } from 'react';

const LOCAL_STORAGE_KEY = 'hangman.highscores';

const ScoreBoard = (props) => {
    const score = props.scoreLives.score;
    const lives = props.scoreLives.lives;
    const status = props.scoreLives.status;
    const turn = props.turn;
    let highScore = useRef(0);

    // const [highScoreList, setHighScoreList] = useState(() => ({score: 0}));

    // useEffect(() => {
    //     const highScoreData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    //     if (highScoreData) {
    //         // highScore.current = highScoreData;
    //     }
    // }, []);

    // useEffect (() => {
    //     console.log (highScore.current);
    //     if (score > highScore.current) {
    //         highScore.current = score;
    //     }
    // }, [score]);

    if (score > highScore.current) {
        highScore.current = score;
    }
    


    return (
        <div id="scoreBoard">
            <h3 className='scoreInfo'>Score: {score}</h3>
            <h3 className='scoreInfo'>Lives: {lives}</h3>
            <h3 className='scoreInfo'>Tries: {7 - turn}</h3>
            <h3 className='scoreInfo'>High Score: {highScore.current}</h3>
        </div>
    );
}

export { ScoreBoard }