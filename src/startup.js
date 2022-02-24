import React from 'react';
import startupGraphics from './graphics/startupgraphics';

/**
 * 
 * @param {number} props.step - passed from game.startUpStep
 * @import {array} array of images of the three startup graphics 'LETS' 'LETS PLAY' and 'LETS PLAY HANGMAN'
 * this component is only used at the initial load of the game to display the 'LETS PLAY HANGMAN' graphics
 *  
 * @returns LETS PLAY HANGMAN in three steps 
 */
const Startup = (props) => {
    let step = props.step;
    if (step > 4) step = 4;

    return (
        <div id="startup">
            {<img className='bigGraphics' src={startupGraphics[step - 2]} />}
        </div>
        );
}


export { Startup };