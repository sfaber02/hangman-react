
/**
 * An array of the sounds used by the game
 */
const soundEffects = {
    correctLetter: new Audio(require('./correctLetter.wav')),
    wrongLetter: new Audio(require('./wrongLetter.wav')),
    correctWord: new Audio(require('./correctWord.wav')),
    wrongWord: new Audio(require('./wrongWord.wav')),
    startup: new Audio(require('./startup.wav')),
    startGame: new Audio(require('./startGame.wav')),
    gameOver : new Audio(require('./gameover.wav'))
};



export default soundEffects;