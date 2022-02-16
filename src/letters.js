import React, { useState } from 'react';

const Letters = (props) => {

    const [letters, setLetters] = useState(() => {
        let tempLetters = [];
        for (let letter = 65; letter <= 90; letter++){
            let currentLetter = String.fromCharCode(letter);
            tempLetters.push(<button onClick={props.handleClick} className="buttons" key={letter} id={currentLetter} name={currentLetter}>{currentLetter}</button>)
        }
        tempLetters.splice(13, 0, <br key="lb"></br>);
        return tempLetters;
    });




    
    return (
        <div>
            {letters.map((letter) => letter)}
        </div>
    );
}



export { Letters };