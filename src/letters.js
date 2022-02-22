import React, { useState, useEffect } from 'react';

//NEEDS UPPER CASE LETTERS
const Letters = (props) => {
    let usedLetters = props.usedLetters;
    const [letters, setLetters] = useState([]);
    // console.log (usedLetters);
    
    useEffect(() => {
        setLetters((prev) => {
            let tempLetters = [];
            for (let letter = 65; letter <= 90; letter++){
                let currentLetter = String.fromCharCode(letter);
                if (!usedLetters.includes(String.fromCharCode(letter).toUpperCase())){
                    tempLetters.push(<button disabled={false} onClick={props.handleClick} className="buttons" key={letter} id={currentLetter} name={currentLetter}>{currentLetter}</button>)
                }else{
                    tempLetters.push(<button disabled={true} onClick={props.handleClick} className="disabledButtons" key={letter} id={currentLetter} name={currentLetter}>{currentLetter}</button>)
                }
            }
            tempLetters.splice(Math.floor(tempLetters.length / 2), 0, <br key="lb"></br>);
            return tempLetters;
        });
    }, [usedLetters]);

        
    return (
        <div id="buttonGrid">
            {letters.map((letter) => letter)}
        </div>
    );
}



export { Letters };