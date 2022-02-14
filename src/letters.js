import React from 'react';

const Letters = () => {
    let letters = [];
    for (let letter = 65; letter <= 90; letter++){
        let currentLetter = String.fromCharCode(letter);
        letters.push(<button className="buttons" id={currentLetter} name={currentLetter}>{currentLetter}</button>)
    }
    
    
    return (
        <div>
            {letters.map((letter) => letter)}
        </div>
    );
}



export { Letters };