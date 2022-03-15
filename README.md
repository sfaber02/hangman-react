# Hangman
A version of hangman using the PERN stack.<br>
You have 7 guesses to guess the correct randomly generated word.<br>
Click the buttons or press the keys to input characters.<br>
A correct word is worth (word length * 100 - wrong guesses * 30) points<br>
A perfect round (no bad guesses) is worth (word length * 150)<br>
A users high score is stored in a PSQL database using an express API I created.

## Dependencies
- React.js
- Axios
- uuidv4
- jsdoc

## TODO
- make loaded-player button also start the game
- add button press events for user creation and high score area
- refactor my app return spaghetti code with react router

## BUGS
- doesn't display final word on win lose screen if word length is 1




