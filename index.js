var inquire = require("inquire");
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
    lives: 10,
    cur_term: "START",
    cur_word: null,

    newWord: function() {
        this.cur_term = words[Math.floor(Math.random() * words.length)];
        this.cur_word = new Word.Word(this.cur_term);
    }
};

game.newWord();
console.log(`${game.cur_term}\n\n`);
game.cur_word.showWord();