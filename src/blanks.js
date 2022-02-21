import React, { useState, useEffect } from 'react';
import letterGraphics from './graphics/letter-graphics';
import { v4 as uuidv4 } from 'uuid';

const Blanks = (props) => {
    const current = props.current;
    const status = props.status;
    const word = props.word;
    let solved = [];

    const [letterBlanks, setLetterBlanks] = useState(() => {
        let tempLetterArray = [];
        for (let c = 0; c < current.length; c++) {
            tempLetterArray.push(<img src={letterGraphics.blank} key={uuidv4()} id='_' />);
        }
        return tempLetterArray;
    });

    useEffect(() => {
        setLetterBlanks((prevBlanks) => {
            let tempBlanks = [...prevBlanks];
            for (let letter in current) {
                if (current[letter] != tempBlanks[letter].props.id) {
                    tempBlanks.splice(letter, 1, <img src={letterGraphics[current[letter].toLowerCase()]} key={uuidv4()} id={current[letter].toLowerCase()} />);
                }
            }
            return [...tempBlanks];
        });
    }, [current]);

    if (status == 'lost' || status == 'won') {
        for (let letter of word) {
            solved.push(<img src={letterGraphics[letter]} key={uuidv4()} id={letter} />)
        }
    }


    return (
        <div id='letterBlanks'>
            {status === 'in progress' && letterBlanks.map((blank) => blank)}
            {(status === 'won' || status === 'lost') && solved.map((letter) => letter)}
        </div>
    );
}

export { Blanks };