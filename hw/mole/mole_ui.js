const time = document.getElementById("time");
let holeHit = false;
function timer() {
    let i = parseInt(time.innerText);
    myTimer();
    let myInterval = setInterval(myTimer, 1000);
    function myTimer() {
        i--;
        if (i === 0) {
            console.log("im here");
            clearInterval(myInterval);
        }
        time.innerHTML = i;
    }
}

const field = document.getElementById("lawn");
const score = document.getElementById("score");
let scoreInt;
function startGame() {
    score.innerText = "0";
    scoreInt = 0;
    const holes = document.getElementsByClassName("hole");
    for (let i = 0; i < holes.length; i++) {
        holes[i].className = "hole";
    }
    timer();
    midGame();
}

function midGame() {
    const holes = document.getElementsByClassName("hole");
    const number = Math.floor(Math.random() * holes.length);
    for (let i = 0; i < holes.length; i++) {
        if (i === number) {
            holes[i].className = "hole up";
            setTimeout(makeSad,800, holes[i]);
        } else {
            holes[i].className = "hole";
        }
    }
    if (time.innerText === "0") {
        endGame();
    } else {
        moleTimer();
    }
}

function endGame() {
    const holes = document.getElementsByClassName("hole");
    for (let i = 0; i < holes.length; i++) {
        holes[i].className = "hole";
    }
}

function moleTimer() {
    setTimeout(midGame, 2000);
}

field.addEventListener("click", function (event) {
    const target = event.target;
    if (target.className === "hole up" || target.className === "hole sad") {
        if (!holeHit) {
            setTimeout(makeHit, 100, target);
            scoreInt++;
            score.innerText = String(scoreInt);
            holeHit = true;
        }
        target.className = "hole";
    } else if (target.className === "hole start") {
        startGame();
    }
});

function makeSad(target) {
    if (!holeHit) { // Only change to "hole sad" if the hole has not been hit
        target.className = "hole sad";
    }
}

function makeHit(target) {
    target.className = "hole hit";
    setTimeout(() => {
        target.className = "hole";
        holeHit = false; // Reset holeHit after 300 ms
    }, 300);
}