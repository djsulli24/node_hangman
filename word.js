var Letter = require('./letter');

function Word(inputString) {
    this.word = inputString;
    this.playArray = inputString.split('').map(letter => {return new Letter(letter)});
    this.remainingGuesses = 10;
};

module.exports = Word;