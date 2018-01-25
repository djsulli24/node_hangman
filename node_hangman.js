var inquirer = require('inquirer');
var wordObject = require('./word.js');
var fs = require('fs');
var wordListImport = require('./wordlist.js');
const wordList = JSON.parse(JSON.stringify(wordListImport));
var gameInstances = [];

function newGame() {
    gameInstances.push(new Game(wordList[Math.floor(Math.random()*wordList.length)]));
    gameInstances[gameInstances.length-1].renderWord();
}

function Game(inputWord) {
    this.wordString = inputWord.toUpperCase();
    this.word = new wordObject(inputWord);
    this.remainingGuesses = 10;
};

Game.prototype.renderWord = function() {
    let string = "";
    if (this.remainingGuesses === 10 && gameInstances.length === 1) {
        console.log("-------------------------------------------------------------\nWelcome to Node Hangman. Press Control+C at any time to quit.\n-------------------------------------------------------------\n")
    }
    for (let obj of this.word.playArray) {
        if (obj.guessed){
            string += obj.letter + " ";
        }
        else {
            string += "_ ";
        }
    }
    console.log(string);
    this.askGuess();
};

Game.prototype.askGuess = function() {
    if (this.remainingGuesses > 0) {
        inquirer.prompt([
            {
                type: 'input',
                name: 'letterInput',
                message: `\nGuess a letter. You've got ${this.remainingGuesses} left.`,
            }
        ])
        .then(answer=>{
            this.checkGuess(answer.letterInput);
        });
    }
    else {
        console.log(`\n------------------------------------------------------------------\nYou Lost. The word was ${this.wordString} Let's start again with a new word.\n------------------------------------------------------------------\n`)
        newGame();
    }
};

Game.prototype.checkGuess = function (inputLetter) {
    let userGuess = inputLetter.toUpperCase();
    let match = false;
    for (let obj of this.word.playArray) {
        if (!obj.guessed && userGuess === obj.letter){
            obj.guessed = true;
            match = true;
        }
    }
    if (match && this.checkIfComplete()) {
        console.log("\n------------------------------------\nYou win! Let's play again, shall we?\n------------------------------------\n");
        newGame();
    }
    else if (match) {
        console.log("\n---------------------------------------\nGood guess. That letter is in the word.\n---------------------------------------\n");
        this.renderWord();
    }
    else {
        this.remainingGuesses--;
        console.log("\n-------------------------------------------\nNope, sorry. That letter isn't in the word.\n-------------------------------------------\n");
        this.renderWord();
    }
};

Game.prototype.checkIfComplete = function() {
    for (let obj of this.word.playArray) {
        if (!obj.guessed){
            return false;
        }
    }
        return true;
};

// Creates a new Game object instance with a random word from the wordList.

newGame();

