# Hangman

## TODO
- high score database
- mobile version
- proper scaling for lower horizontal resolutions or ideally ANY resolution
    - dynamically set max width of letter blanks to 100% / word.length 
        - possibly with inline styling because you can't target a jsx class with dom manipultation?
- add a bonus for perfect round.
- refactor css style sheet for multiple resolutions

## BUGS
- doesn't display final word if word length is 1
- certain non letter keys (arrows, enter, backspace) are counting as guesses

