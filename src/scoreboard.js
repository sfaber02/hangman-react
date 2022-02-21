import React, { useState, useEffect, useRef } from 'react';

const LOCAL_STORAGE_KEY = 'hangman.highscores';

const ScoreBoard = (props) => {
    const score = props.scoreLives.score;
    const lives = props.scoreLives.lives;
    const turn = props.turn;
    const [highScoreList, setHighScoreList] = useState(() => ({score: 0}));

    useEffect(() => {
        const highScoreData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (highScoreData) {
           setHighScoreList(highScoreData);
        }
    }, []);

    useEffect (() => {
        if (score > highScoreList.score) {
            setHighScoreList({score: score});
        }
    }, [score]);

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