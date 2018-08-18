/*
    HANGMAN: Food, Cars, and Cities Edition
    _______________________________________

    Kris Koeckritz
    mod: 06/22/18
    notes:
        - q key does not fire keyup
*/

$(document).ready(function() {

    // store lists
    var lists = {
        food: [
            "burrito",
            "Caesar salad",
            "chicken parmesan",
            "dumpling",
            "garlic bread",
            "lasagna",
            "pasta",
            "pizza",
            "quesadilla",
            "ramen",
            "sandwich",
            "soup"
        ],
        cars: [
            "Acura",
            "Alfa Romeo",
            "Aston Martin",
            "Bentley",
            "Bugatti",
            "BMW",
            "Chevrolet",
            "Chrysler",
            "Dodge",
            "Eagle",
            "Ferrari",
            "Fiat",
            "Fisker",
            "Ford",
            "GMC",
            "Hennessey",
            "Honda",
            "Hyundai",
            "Infinity",
            "Isuzu",
            "Jaguar",
            "Jeep",
            "Kia",
            "Koenigsegg",
            "Lamborghini",
            "Land Rover",
            "Lexus",
            "Lincoln",
            "Lotus",
            "Maserati",
            "Mazda",
            "McLaren",
            "Mercedes",
            "Mitsubishi",
            "Nissan",
            "Opel",
            "Pagani",
            "Peugeot",
            "Porsche",
            "Ram",
            "Renault",
            "Subaru",
            "Suzuki",
            "Toyota",
            "Vauxhall",
            "Volkswagen",
            "Volvo"
        ],
        cities: [
            "Albany",
            "Berlin",
            "Brooklyn",
            "Cairo",
            "Charlotte",
            "Chicago",
            "Delhi",
            "Denver",
            "Edinburgh",
            "Frankfurt",
            "Geneva",
            "Gothenburg",
            "Glasgow",
            "Hamburg",
            "Las Vegas",
            "Liverpool",
            "London",
            "Los Angeles",
            "Lucerne",
            "Manchester",
            "Moscow",
            "Munich",
            "Mumbai",
            "New York City",
            "Paris",
            "Saint Petersburg",
            "Stockholm",
            "Venice",
            "Yorkshire",
            "Zurich"            
        ]
    };

    var game = {
        // game vars
        lives: 0,
        cur_word: "START",
        split_word: [],
        dash_word: [],
        guessed_letters: [],
        // cur_guess: 'x',
        word_list: [
            "ERROR",
            "PROBLEM"
        ],

        // display divs
        g_letters: document.getElementById("g_letters"),
        g_guessed: document.getElementById("g_guessed"),
        g_lives: document.getElementById("g_lives"),

        fillWord: function() {
            // fill dash_word
            this.dash_word = [];
            for (var i = 0; i < this.split_word.length; i++) {
                if (this.split_word[i] == ' ') {
                    this.dash_word.push(' ');
                }
                else {
                    this.dash_word.push('_');
                }
            }
        },
        printWord: function() {
            // print dashes to screen
            this.g_letters.innerHTML = "";
            for (var i = 0; i < this.split_word.length; i++) {
                if (this.split_word[i] == ' ') {
                    this.g_letters.append(String.fromCharCode(160));
                    this.g_letters.append(String.fromCharCode(160));
                    this.g_letters.append(String.fromCharCode(160));
                }
                else {
                    this.g_letters.append(this.dash_word[i] + ' ');
                }
            }   
        },
        newWord: function() {
            // choose random word from selected list, split it for display on screen
            this.cur_word = this.word_list[Math.floor(Math.random() * this.word_list.length)];
            this.split_word = [...this.cur_word];
            console.log("Word: " + this.cur_word);
        },
        initGame: function() {
            // clear notification (if nec)
            document.getElementById("win").innerHTML = "";
            document.getElementById("lose").innerHTML = "";

            // grab option choices, set game accordingly
            var game_diff = document.getElementById("game_diff");
            this.lives = game_diff.value;
            var game_mode = document.getElementById("game_mode");
            if (game_mode.value == "cars") {
                this.word_list = lists.cars;
            }
            else if (game_mode.value == "cities") {
                this.word_list = lists.cities;
            }
            else if (game_mode.value == "food") {
                this.word_list = lists.food;
            }

            // get, display random word for play
            this.newWord();
            this.fillWord();
            this.printWord();

            // show initial lives, clear guessed letters (if nec)
            this.g_lives.innerHTML = "<p>" + this.lives + "</p>";
            this.g_guessed.innerHTML = "";
            this.guessed_letters = [];
        },
        matchGuessed: function(cur_guess) {
            var matched = false;
            for (var i = 0; i < this.guessed_letters.length; i++) {
                if (cur_guess == this.guessed_letters[i]) {
                    matched = true;
                }
            }
            return matched;
        },
        playGame: function(cur_guess) {
            var letter_found = false;

            // check word for letter match
            for (var i = 0; i < this.split_word.length; i++) {
                // if match found, show letter, set flag true, decrement cur_length
                if (this.split_word[i].toLowerCase() == cur_guess.toLowerCase()) {
                    this.dash_word[i] = this.split_word[i];
                    
                    letter_found = true;

                    console.log(cur_guess + ": FOUND A MATCH");
                }
            }

            // if flag false
            if (letter_found == false && this.matchGuessed(cur_guess) == false) {
                this.guessed_letters.push(cur_guess);
                this.g_guessed.append(cur_guess.toUpperCase() + " ");
                this.lives--;
                console.log("FALSE");
            }

            // re-print word, lives
            this.printWord();
            this.g_lives.innerHTML = "<p>" + this.lives + "</p>";
        },
        checkWon: function() {
            var won = true;
            for (var i = 0; i < this.split_word.length; i++) {
                if (this.dash_word[i] != this.split_word[i]) {
                    won = false;
                }
            }

            if (won == true) {
                // show WIN notification for 2 seconds, then restart game
                document.getElementById("win").innerHTML = "<h2>YOU WIN</h2>";
                console.log("WIN");
                setTimeout(function() { game.initGame() }, 2000);
            }
        },
        checkLost: function() {
            if (this.lives <= 0) {
                // show LOSE notification for 2 seconds, then restart game
                document.getElementById("lose").innerHTML = "<h2>GAME OVER</h2>";
                console.log("LOSE")
                setTimeout(function() { game.initGame() }, 2000);
            }
        }
    };

    game.initGame();

    // trigger game logic on keypress
    document.onkeyup = function(event) {
        if (event.key.length === 1 && event.key.match(/[a-z]/i)) {
            game.playGame(event.key);
            game.checkWon();
            game.checkLost();
        }
    };

    // reset game if word list or difficulty changed, or RESET pressed
    game_mode.onchange = function() {
        game.initGame();
    }
    game_diff.onchange = function() {
        game.initGame();
    }
    document.getElementById("reset").onclick = function() {
        game.initGame();
    }
});
