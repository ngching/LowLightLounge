const avaIngred = ["Gin", "Dry Vermouth", "Tequila", "Triple Sec", "White Rum",
    "Lime Juice", "Salted Rim", "Syrup", "Soda", "Lemon", "Lime", "Ice"];
//????
const martini = {
    name: "50/50 Martini",
    ingred: ["Gin", "Dry Vermouth", "Lemon", "Ice"],
    action: "Stir"
};
const margarita = {
    name: "Classic Margarita",
    ingred: ["Tequila", "Triple Sec", "Lime Juice", "Salted Rim", "Lime", "Ice"],
    action: "Shake"
};
const mojito = {
    name: "Mojito",
    ingred: ["White", "Dry Vermouth", "Lime Juice", "Syrup", "Soda", "Ice"],
    action: "Stir"
};
const avaDrinks = [martini, margarita, mojito];

let point = 0;
let currIngred = [];
let currOrder = avaDrinks[Math.floor(Math.random() * avaDrinks.length)];
let doneOrder = [];

document.addEventListener("load", setup());

function setup() {
    countdownTimer(1, 0);
    print();
}

function countdownTimer(minutes, seconds) {
    function tick() {
        var counter = document.getElementById("timer");
        counter.innerHTML =
            minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
        seconds--;
        if (seconds >= 0) {
            setTimeout(tick, 1000);
        } else {
            if (minutes >= 1) {
                setTimeout(function () {
                    countdownTimer(minutes - 1, 59);
                }, 1000);
            }
            // end game????
        }
    }
    tick();
}

function print() {
    var instruct = document.getElementById("instructions");
    instruct.innerHTML = "Order: " + currOrder.name + "<p> Ingredients: <p> " +
    currOrder.ingred.join("<p>") + "<p> Action: " + currOrder.action;
}

function addIngred(ingredient) {
    currIngred.push(ingredient);
}

function correctIngred() {
    let correct = (martini.ingred.length == currIngred.length);
    if (correct) {
        for (let i = 0; i < currIngred.length; i++) {
            if (!martini.ingred.includes(currIngred[i])) {
                correct = false;
            }
        }
    }
    return correct;
}

function doOrder(action) {
    if (correctIngred() && action == currOrder.action) {
        doneOrder.push(currOrder.name);
        updateScore();
    }
    currIngred = [];
    currOrder = avaDrinks[Math.floor(Math.random() * avaDrinks.length)];
    print();
}

function updateScore() {
    var score = document.getElementById("score");
    score.innerHTML = String(++point);
}