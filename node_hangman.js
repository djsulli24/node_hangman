var inquirer = require('inquirer');
var wordObject = require('./word.js');
var fs = require('fs');
var wordListImport = require('./wordlist.js');
const wordList = JSON.parse(JSON.stringify(wordListImport));

function Game(inputWord) {
    this.wordString = inputWord;
    this.word = new wordObject(inputWord);
}

Game.prototype.renderWord = function() {
    let string = "";
    for (let char of this.word) {
        string += char + " ";
    }
    console.log(string);
}

// Creates a new Game object instance with a random word from the wordList.
var game = new Game(wordList[Math.floor(Math.random()*wordList.length)]);

console.log(game.word)