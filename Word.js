var Letter = require("./Letter");

class Word {
    constructor(val) {
        this.letters = [];

        var split_val = val.split("");
        for (var l in split_val) {
            var new_let = new Letter.Letter(l);
            this.letters.push(new_let);
        }
    }

    showWord() {
        var wrd = [];

        for (var l of this.letters) {
            wrd.push(l.getState());
        }

        console.log(wrd.toString());
    }

    guessLetter(val) {
        var done = true;

        for (var l of this.letters) {
            if (l.checkLetter(val))
        }
    }
}

module.exports.Word = Word;