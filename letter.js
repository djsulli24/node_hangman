function Letter(letter) {
    this.letter = letter.toUpperCase();
    this.guessed = ("abcdefghijklmnopqrstuvwxy".indexOf(letter) === -1)? true : false;
};

module.exports = Letter;

