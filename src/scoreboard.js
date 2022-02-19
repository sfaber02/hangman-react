import React, { useState, useEffect } from 'react';

const ScoreBoard = (props) => {
    const score = props.scoreLives.score;
    const lives = props.scoreLives.lives;
    const status = props.scoreLives.status;
    


    // useEffect(() => {
    //     setScoreLives(({score: score, lives: lives, status: status}))
    // }, [score, lives, status]);
    
    return (
        <div id="scoreBoard">
            <h3 className='scoreInfo'>Score: {score}</h3>
            <h3 className='scoreInfo'>Lives:{lives}</h3>
            <h3 className='scoreInfo'>Status: {status}</h3>
        </div>
    );
}

export { ScoreBoard }