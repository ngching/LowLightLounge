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
// let doneOrder = ["Thai Basil Sangria"];

document.addEventListener("load", setup());

function setup() {
    countdownTimer(0, 30);
    print();
    // document.getElementById("score").innerHTML = point;
}

function countdownTimer(minutes, seconds) {
    function tick() {
        if (seconds == 0 && minutes == 0) {
            clearTimeout();
            window.location.href = "end.html";
            document.getElementById("end").addEventListener("load", setupEnd());
    //         window.onload = function() {
    //             document.getElementById("finalscore").innerHTML = point;
    // document.getElementById("martini").innerHTML = frequency("Green Apple Martini");
    // document.getElementById("margarita").innerHTML = frequency("Classic Margarita");
    // document.getElementById("thai").innerHTML = frequency("Thai Basil Sangria");
    //         }        
        }  
        var counter = document.getElementById("timer");
        counter.innerHTML = String(minutes) + ":" + (seconds < 10 ? "0" : "") + String(seconds);
        seconds--;
        if (seconds >= 0) {
            setTimeout(tick, 1000);
            clearTimeout();
        } else {
            if (minutes >= 1) {
                setTimeout(function () {
                    countdownTimer(minutes - 1, 59);
                }, 1000);
                clearTimeout();
            }
        }
    }
    tick();
}

// window.load = function() {
//     window.document.body.onload = setupEnd();
// }

function print() {
    displayCustomer();
    var customer = document.getElementById("customerOrder");
    customerOrder.innerHTML = "<p>" + currOrder.name + " please <p>";
    var instructions = document.getElementById("instructions");
    instructions.innerHTML = "<p> Ingredients: <p> " + currOrder.ingred.join("<p>") + "<p> Action: " + currOrder.action;
}

function displayCustomer() {
    var customersArr = ["assets/character_01.svg", "assets/character_02.svg", "assets/character_03.svg"];
    var randomNum = Math.floor(Math.random() * 3);
    document.customer.src = customersArr[randomNum];
}

function addIngred(ingredient) {
    currIngred.push(ingredient);
}

document.querySelectorAll(".under-counter-container img").forEach(img => {
    const defaultSrc = img.src;
    const hoverSrc = defaultSrc.replace("buttons_default", "buttons_hover");

    img.addEventListener("mouseover", () => img.src = hoverSrc);
    img.addEventListener("mouseout", () => img.src = defaultSrc);
});

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
    if (action == "Stir")
        element = document.getElementById("stirring");
    else
        element = document.getElementById("shaking");
    element.style.visibility = "visible";
    setTimeout(function() {
        element.style.visibility = "hidden";
        if (correctIngred() && action == currOrder.action) {
            doneOrder.push(currOrder.name);
            updateScore();
        }
        currIngred = [];
        currOrder = avaDrinks[Math.floor(Math.random() * avaDrinks.length)];
        print();
    }, 1000);
}

// function doOrder(action) {
//     if (action == "Stir")
//         element = document.getElementById("stirring");
//     else
//         element = document.getElementById("shaking");
//     element.style.visibility = "visible";
//     setTimeout(function() {
//         element.style.visibility = "hidden";
//         drink = document.getElementById(currOrder.name);
//         drink.style.visibility = "visible";
//         setTimeout(function() {
//             drink.style.visibility = "hidden";
//             if (correctIngred() && action == currOrder.action) {
//                 doneOrder.push(currOrder.name);
//                 updateScore();
//             }
//             currIngred = [];
//             currOrder = avaDrinks[Math.floor(Math.random() * avaDrinks.length)];
//             print();
//         }, 800);
//     }, 1000);
// }

// completes = document.querySelectorAll(".completes");
// completes.forEach(complete => {
//     if (complete.getAttributes("data-info") == "") {
        
//     }
// });

function updateScore() {
    var score = document.getElementById("score");
    score.innerHTML = String(++point);
}

// document.getElementById("end").addEventListener("load", setupEnd());
// function setupEnd() {
//     document.getElementById("finalscore").innerHTML = 87;
//     document.getElementById("martini").innerHTML = frequency("Green Apple Martini");
//     document.getElementById("margarita").innerHTML = frequency("Classic Margarita");
//     document.getElementById("thai").innerHTML = frequency("Thai Basil Sangria");
// }

// function frequency(order) {
//     let doneOrder = JSON.parse(localStorage.getItem("doneOrder")) || [];
//     let i = 0;
//     doneOrder.forEach(done => {
//         if (done == order)
//             i++;
//     });
//     return i;
// }