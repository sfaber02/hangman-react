import React, { useState, useEffect } from 'react';
import letterGraphics from './graphics/letter-graphics';

const Blanks = (props) => {
    const current = props.current;
    const [letterBlanks, setLetterBlanks] = useState(() => {
        let tempLetterArray = [];
        for (let c = 0; c < current.length; c++) {
            tempLetterArray.push(<img src={letterGraphics.blank} key={c} id='_' />);
        }
        return tempLetterArray;
    });

    useEffect(() => {
        setLetterBlanks((prevBlanks) => {
            let tempBlanks = [...prevBlanks];
            for (let letter in current) {
                // if (current[letter] = '_') continue;
                if (current[letter] != tempBlanks[letter].props.id) {
                    tempBlanks.splice(letter, 1, <img src={letterGraphics[current[letter].toLowerCase()]} key={letter} id={current[letter].toLowerCase()} />);
                }
            }
            return [...tempBlanks];
        });
    }, [current]);


    return (
        <div>
            <div id='letterBlanks'>
                {letterBlanks.map((blank) => blank)}
            </div>
        </div>
    );
}

export { Blanks };