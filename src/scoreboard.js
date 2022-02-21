import React from 'react';

const ScoreBoard = (props) => {
    const score = props.scoreLives.score;
    const lives = props.scoreLives.lives;
    const status = props.scoreLives.status;
    const turn = props.turn;

    return (
        <div id="scoreBoard">
            <h3 className='scoreInfo'>Score: {score}</h3>
            <h3 className='scoreInfo'>Lives: {lives}</h3>
            <h3 className='scoreInfo'>Tries: {7 - turn}</h3>
        </div>
    );
}

export { ScoreBoard }