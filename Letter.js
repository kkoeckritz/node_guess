class Letter {
    constructor(val, ) {
        this.val = val;
        this.guessed = false;
    }

    getState() {
        if (this.guessed == true) {
            return this.val;
        } else {
            return "_";
        }
    }

    checkLetter(letter) {
        if (letter == this.val) {
            this.guessed = true;
            return true;
        }
        else {
            return false;
        }
    }
}

module.exports.Letter = Letter;