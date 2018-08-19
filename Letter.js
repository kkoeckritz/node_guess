class Letter {
    constructor(val) {

        // handle spaces in input term
        if (val == " ") {
            this.guessed = true;
        } else {
            this.val = val.toLowerCase();
            this.guessed = false;
        }
        
    }

    getState() {
        if (this.guessed == true) {
            return this.val;
        } else {
            return "_";
        }
    }

    checkLetter(input) {
        var lower = input.toLowerCase();

        if (lower == this.val) {
            this.guessed = true;
            return true;
        } else {
            return false;
        }
    }
}

module.exports.Letter = Letter;