import React, { useState, useEffect, useRef } from 'react';

/** set local storage location */
const LOCAL_STORAGE_KEY = 'hangman.highscores';

/**
 * 
 * @param {number} props.score - current game score, since last game over, passed from scoreLives state in <App />
 * @param {number} props.lives - lives remaining, passed from scoreLives state in <App />
 * @param {number} props.turn - number of wrong guesses, passed from tries ref() in <App />
 * @param {object} props.player - player state from <App />
 * @returns Scoreboard div which is a flex box containing pertinent game information
 */
const ScoreBoard = (props) => {
    const score = props.scoreLives.score;
    const lives = props.scoreLives.lives;
    const player = props.player;
    const turn = props.turn;

    return (
        <div id="scoreBoard">
            <h3 className='scoreInfo'>{player.name}</h3>
            <h3 className='scoreInfo'>Score: {score}</h3>
            <h3 className='scoreInfo'>Lives: {lives}</h3>
            <h3 className='scoreInfo'>Tries: {7 - turn}</h3>
            <h3 className='scoreInfo'>High Score: {player.highScore}</h3>
            <h3 className='scoreInfo'>Rank: {player.rank}</h3>
        </div>
    );
}

export { ScoreBoard }