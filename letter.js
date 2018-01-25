function Letter(letter) {
    this.letter = letter.toUpperCase();
    this.guessed = ("ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(letter.toUpperCase()) === -1)? true : false;
};

module.exports = Letter;

