const martini = {
    name: "Green Apple Martini",
    ingred: ["Vodka", "Apple Liqueur", "Lemon Juice", "Apple Slice", "Cherry", "Ice"],
    action: "Shake"
};
const margarita = {
    name: "Classic Margarita",
    ingred: ["Tequila", "Orange Liquor", "Lime Juice", "Salt", "Lime", "Ice"],
    action: "Shake"
};
const thai = {
    name: "Thai Basil Sangria",
    ingred: ["Syrup", "White Wine", "Orange Juice", "Orange Slice", "Soda", "Ice"],
    action: "Stir"
};
const avaDrinks = [martini, margarita, thai];

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
            // end game
            // window.location.href = "";
        }
    }
    tick();
}

function print() {
    // var customer = document.getElementById("customer");
    // customer.innerHTML = currOrder.name + " please";
    var instructions = document.getElementById("instructions");
    instructions.innerHTML = "Order: " + currOrder.name + "<p> Ingredients: <p> " +
    currOrder.ingred.join("<p>") + "<p> Action: " + currOrder.action;
}

function addIngred(ingredient) {
    currIngred.push(ingredient);
}

function correctIngred() {
    let correct = (currOrder.ingred.length == currIngred.length);
    if (correct) {
        for (let i = 0; i < currIngred.length; i++) {
            if (!currOrder.ingred.includes(currIngred[i])) {
                correct = false;
            }
        }
    }
    return correct;
}

function doOrder(action) {
    element = document.getElementById("animation");
    element.style.visibility = "visible";
    setTimeout(function() {
        document.getElementById("test").style.visibility = "hidden";
        if (correctIngred() && action == currOrder.action) {
            doneOrder.push(currOrder.name);
            updateScore();
        }
        currIngred = [];
        currOrder = avaDrinks[Math.floor(Math.random() * avaDrinks.length)];
        print();
    }, 1000);
}

function updateScore() {
    var score = document.getElementById("score");
    score.innerHTML = String(++point);
}

function frequency(order) {
    let i = 0;
    doneOrder.forEach(done => {
        if (done == order)
            i++;
    });
    return i;
}