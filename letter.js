function Letter(letter) {
    this.letter = letter.toUpperCase();
    this.guessed = ("abcdefghijklmnopqrstuvwxyz".indexOf(letter) === -1)? true : false;
};

module.exports = Letter;

