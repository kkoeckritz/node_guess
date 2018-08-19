var inquirer = require("inquirer");
var Word = require("./Word");

var words = [
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
    "Tesla",
    "Toyota",
    "Vauxhall",
    "Volkswagen",
    "Volvo"
];

var game = {
    solved: false,
    lives: 10,
    cur_term: "START",
    cur_word: null,
    
    newWord: function() {
        this.cur_term = words[Math.floor(Math.random() * words.length)];
        this.cur_word = new Word.Word(this.cur_term);
    },
    
    playGame: function() {
        inquirer.prompt([
            {
                type: "input",
                name: "guess",
                message: `Guess a letter:`,
                validate: function(val) {
                    return !(val == " " || val.length != 1);
                }
            }
        ]).then(function(result) {
            game.solved = game.cur_word.guessLetter(result.guess);
            game.cur_word.showWord();

            // call self again if word not solved
            if (game.solved) {
                console.log("Let's play again.");
                game.newWord();
            } else {
                game.playGame();
            }
        });
    }
};

// choose new word; show blank word; play game
game.newWord();
console.log(`${game.cur_term}\n\n`);
game.cur_word.showWord();
game.playGame();