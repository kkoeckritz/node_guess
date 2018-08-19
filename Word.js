var Letter = require("./Letter");

class Word {
    constructor(val) {
        this.letters = [];

        var split_val = val.split("");
        for (var l of split_val) {
            var new_let = new Letter.Letter(l);
            this.letters.push(new_let);
        }
    }

    showWord() {
        var wrd = [];

        for (var l of this.letters) {
            wrd.push(l.getState());
        }

        console.log(wrd.join(" "));
    }

    guessLetter(val) {
        var solved = true;
        var matched = false;

        for (var l of this.letters) {
            if (!l.checkLetter(val)) {
                solved = false;
            } else {
                matched = true;
            }
        }
        
        if (!solved) {
            return false;
        }
    }
}

module.exports.Word = Word;