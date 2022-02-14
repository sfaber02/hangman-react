import React from 'react';
import { Letters } from './letters.js';
import { Blanks } from './blanks.js'
import { HangmanDude } from './hangmandude.js'



const App = () => {
    return (
        <div>
            <h1>Hangman</h1>
            <HangmanDude />
            <Blanks />
            <Letters />
        </div>
    );
}


export { App };