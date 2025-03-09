const martini = {
    name: "Green Apple Martini",
    ingred: ["Vodka", "Apple Liqueur", "Lemon Juice", "Apple Slice", "Cherry", "Ice"],
    action: "Shake"
};
const margarita = {
    name: "Classic Margarita",
    ingred: ["Tequila", "Orange Liqueur", "Lime Juice", "Salt", "Lime", "Ice"],
    action: "Shake"
};
const thai = {
    name: "Thai Basil Sangria",
    ingred: ["Syrup", "White Wine", "Orange Juice", "Orange Slice", "Soda", "Ice"],
    action: "Stir"
};
const avaDrinks = [martini, margarita, thai];

const audioPlayer = document.getElementById('audioPlayer');

let point = 0;
let currIngred = [];
let currOrder = avaDrinks[Math.floor(Math.random() * avaDrinks.length)];
// let doneOrder = [];
// let doneOrder = ["Classic Margarita", "Thai Basil Sangria", "Green Apple Martini", "Green Apple Martini"];

function setup() {
    countdownTimer(1, 6);
    print();
}

function countdownTimer(minutes, seconds) {
    function tick() {
        if (minutes == 0 && seconds == 0) {
            window.location.href = "end.html";
            // document.getElementById("end").addEventListener("load", setupEnd);     
        }  
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
        }
    }
    tick();
}

function print() {
    displayCustomer();
    var customer = document.getElementById("customerOrder");
    customer.innerHTML = "<p>" + currOrder.name + " please <p>";
    var instructions = document.getElementById("instructions");
    instructions.innerHTML = "<p> Ingredients: <p> " + printList() + "<p> Action: " + currOrder.action;
}

function printList() {
    let list = currOrder.ingred;
    let output = "<ul>";
    for (let i = 0; i < list.length; i++) {
        output = output + "<li>" + list[i] + "</li>";
    }
    return output + "</ul>";
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

// function doOrder(action) {
//     if (action == "Stir")
//         element = document.getElementById("stirring");
//     else
//         element = document.getElementById("shaking");
//     element.style.visibility = "visible";
//     setTimeout(function() {
//         element.style.visibility = "hidden";
//         if (correctIngred() && action == currOrder.action) {
//             doneOrder.push(currOrder.name);
//             updateScore();
//         }
//         currIngred = [];
//         currOrder = avaDrinks[Math.floor(Math.random() * avaDrinks.length)];
//         print();
//     }, 1000);
// }

// function doOrder(action) {
//     if (action == "Stir")
//         element = document.getElementById("stirring");
//     else
//         element = document.getElementById("shaking");
//     element.style.visibility = "visible";
//     setTimeout(function() {
//         element.style.visibility = "hidden";
//         document.getElementById("")
//         drink = document.getElementById("drink");
//         bartender = document.getElementById("bartender");
//         bartendertalk = document.getElementById("bartendertalk");
//         drink.style.visibility = "visible";
//         bartender.style.visibility = "visible";
//         bartendertalk.style.visibility = "visible";
//         setTimeout(function() {
//             // drink.style.visibility = "hidden";
//             // bartender.style.visibility = "hidden";
//             // bartendertalk.style.visibility = "hidden";
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

function doOrder(action) {
    if (action == "Stir")
        element = document.getElementById("stirring");
    else
        element = document.getElementById("shaking");
    element.style.visibility = "visible";
    setTimeout(function() {
        element.style.visibility = "hidden";
        addBlock(`.serving`);
        drink = document.getElementById(currOrder.name);
        bartender = document.getElementById("bartender");
        bartendertalk = document.getElementById("bartendertalk");
        drink.style.visibility = "visible";
        bartender.style.visibility = "visible";
        bartendertalk.style.visibility = "visible";
        setTimeout(function() {
            drink.style.visibility = "hidden";
            bartender.style.visibility = "hidden";
            bartendertalk.style.visibility = "hidden";
            hideBlock(`.serving`);
            if (correctIngred() && action == currOrder.action) {
                doneOrder.push(currOrder.name);
                updateScore();
            }
            currIngred = [];
            currOrder = avaDrinks[Math.floor(Math.random() * avaDrinks.length)];
            print();
        }, 800);
    }, 1000);
}

function hideBlock(classname) {
    document.querySelectorAll(classname).forEach(element => {
        element.style.display = "none";
    })
}

function addBlock(classname) {
    document.querySelectorAll(classname).forEach(element => {
        element.style.display = "block";
    })
}

function updateScore() {
    var score = document.getElementById("score");
    audioPlayer.play();
    score.innerHTML = String(point++);
}

function setupEnd() {
    document.getElementById("finalscore").innerHTML = point;
    document.getElementById("martini").innerHTML = frequency("Green Apple Martini");
    document.getElementById("margarita").innerHTML = frequency("Classic Margarita");
    document.getElementById("thai").innerHTML = frequency("Thai Basil Sangria");
}

function frequency(order) {
    let i = 0;
    doneOrder.forEach(done => {
        if (done == order)
            i++;
    });
    return i;
}