import React, { useState, useEffect } from 'react';

const Letters = (props) => {
    let usedLetters = props.usedLetters;
    const [letters, setLetters] = useState(() => {
        let tempLetters = [];
        for (let letter = 65; letter <= 90; letter++){
            let currentLetter = String.fromCharCode(letter);
                tempLetters.push(<button disabled={false} onClick={props.handleClick} className="buttons" key={letter} id={currentLetter} name={currentLetter}>{currentLetter}</button>)
        }
        tempLetters.splice(13, 0, <br key="lb"></br>);
        return tempLetters;
    });

    useEffect(() => {
        setLetters((prev) => {
            let tempLetters = [];
            for (let letter = 65; letter <= 90; letter++){
                if (!usedLetters.includes(String.fromCharCode(letter).toUpperCase())){
                    let currentLetter = String.fromCharCode(letter);
                    tempLetters.push(<button disabled={false} onClick={props.handleClick} className="buttons" key={letter} id={currentLetter} name={currentLetter}>{currentLetter}</button>)
                }
            }
            return tempLetters;
        });
    }, [usedLetters]);

        
    return (
        <div>
            {letters.map((letter) => letter)}
        </div>
    );
}



export { Letters };