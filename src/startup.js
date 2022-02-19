import React from 'react';


const Startup = (props) => {
    let step = props.step;

    return (
        <div id="startup">
            {step > 1 && <h1>LET'S</h1>}
            {step > 2 && <h1>PLAY</h1>}
            {step > 3 && <h1>HANGMAN</h1>}
        </div>
        );
}


export { Startup };