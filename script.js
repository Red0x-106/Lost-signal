document.addEventListener("DOMContentLoaded", function () {

    const sourceArea = document.getElementById("source-area");
    const numberArea = document.getElementById("number-area");
    const nextArea = document.getElementById("next-area");
    const signal4Reveal = document.getElementById("signal4Reveal");

    if (sourceArea) {
        sourceArea.style.display = "none";
    }

    if (numberArea) {
        numberArea.style.display = "none";
    }

    if (nextArea) {
        nextArea.style.display = "none";
    }

    if (signal4Reveal) {
        signal4Reveal.style.display = "none";
    }

    setupSignal02();
    setupMemoryGame();

});


/* =========================
   RESULT COLORS
========================= */

function setSuccess(element) {

    if (!element) {
        return;
    }

    element.classList.remove("error");
    element.classList.add("success");

}


function setError(element) {

    if (!element) {
        return;
    }

    element.classList.remove("success");
    element.classList.add("error");

}


/* =========================
   SIGNAL 01
========================= */

let wrongAttempts = 0;

function checkAnswer() {

    const input = document.getElementById("answer");
    const result = document.getElementById("result");

    if (!input || !result) {
        return;
    }

    const answer = input.value.trim().toLowerCase();

    if (answer === "") {

        result.textContent = "ENTER A RESPONSE";
        setError(result);

    }

    else if (answer === "red0x") {

        result.textContent =
            "SIGNAL DECODED // ACCESS GRANTED";

        setSuccess(result);

        const continueBtn =
            document.getElementById("continueBtn");

        if (continueBtn) {
            continueBtn.style.display = "inline-block";
        }

    }

    else {

        wrongAttempts++;

        setError(result);

        if (wrongAttempts >= 12) {

            result.textContent =
                "I GUESS YOU WON'T MAKE IT!";

        }

        else if (wrongAttempts >= 9) {

            result.textContent =
                "A = 1, B = 2, C = 3...";

        }

        else if (wrongAttempts >= 6) {

            result.textContent =
                "NUMBERS MAYBE DISGUISED AS ALPHABETS.";

        }

        else if (wrongAttempts >= 3) {

            result.textContent =
                "THE ANSWER IS SOMEWHERE ON THIS WEBSITE.";

        }

        else {

            result.textContent =
                "WRONG SIGNAL // TRY AGAIN.";

        }

    }

}


/* =========================
   SIGNAL 01 → SIGNAL 02
========================= */

function goToSignal02() {
    window.location.href = "signal-02.html";
}


/* =========================
   SIGNAL 02 GRID
========================= */

let signal02Step = 0;
let signal02Wrong = 0;

const correctSequence = [18, 5, 4, 24];


function setupSignal02() {

    const gridBoxes =
        document.querySelectorAll(".grid-box");

    if (!gridBoxes.length) {
        return;
    }

    gridBoxes.forEach(function (box) {

        box.addEventListener("click", function () {

            const number =
                Number(this.textContent);

            if (
                number ===
                correctSequence[signal02Step]
            ) {

                this.style.background = "#213548";
                this.style.borderColor = "#60829d";

                signal02Step++;

                if (
                    signal02Step ===
                    correctSequence.length
                ) {

                    showSignal02Message();

                }

            }

            else {

                signal02Wrong++;
                signal02Step = 0;

                gridBoxes.forEach(function (box) {

                    box.style.background = "";
                    box.style.borderColor = "";

                });

                const result =
                    document.getElementById("result");

                if (!result) {
                    return;
                }

                setError(result);

                if (signal02Wrong >= 6) {

                    result.textContent =
                        "SIGNAL RESET // THE OLD NUMBERS ARE STILL IMPORTANT.";

                }

                else if (signal02Wrong >= 3) {

                    result.textContent =
                        "SIGNAL RESET // LOOK BACK AT SIGNAL 01.";

                }

                else {

                    result.textContent =
                        "WRONG SEQUENCE // TRY AGAIN.";

                }

            }

        });

    });

}


function showSignal02Message() {

    const result =
        document.getElementById("result");

    if (result) {

        result.textContent =
            "SIGNAL FOUND // MESSAGE RECOVERED\n\n" +
            "Kliknij źródło sygnału. Przejdziesz na stronę internetową – przewiń ją w dół. Znajdź na niej Instagram. Odpowiedzią są cyfry w identyfikatorze (ID).";

        setSuccess(result);

    }

    const answerArea =
        document.getElementById("answer-area");

    if (answerArea) {
        answerArea.style.display = "block";
    }

}


function checkLearnAnswer() {

    const input =
        document.getElementById("learnAnswer");

    const result =
        document.getElementById("result");

    if (!input || !result) {
        return;
    }

    const answer =
        input.value.trim().toLowerCase();

    if (answer === "instagram") {

        result.textContent =
            "ANSWER ACCEPTED // SIGNAL SOURCE FOUND";

        setSuccess(result);

        const answerArea =
            document.getElementById("answer-area");

        const sourceArea =
            document.getElementById("source-area");

        if (answerArea) {
            answerArea.style.display = "none";
        }

        if (sourceArea) {
            sourceArea.style.display = "block";
        }

    }

    else if (answer === "") {

        result.textContent =
            "ENTER A RESPONSE";

        setError(result);

    }

    else {

        result.textContent =
            "WRONG ANSWER // READ THE MESSAGE AGAIN.";

        setError(result);

    }

}


function goToWebsite() {

    window.open(
        "https://red0x-106.github.io/",
        "_blank"
    );

    const numberArea =
        document.getElementById("number-area");

    if (numberArea) {
        numberArea.style.display = "block";
    }

}


function checkInstagramNumber() {

    const input =
        document.getElementById("instagramNumber");

    const result =
        document.getElementById("result");

    if (!input || !result) {
        return;
    }

    const number =
        input.value.trim();

    if (number === "106") {

        result.textContent =
            "NUMBER ACCEPTED // SIGNAL 03 UNLOCKED";

        setSuccess(result);

        const sourceArea =
            document.getElementById("source-area");

        const numberArea =
            document.getElementById("number-area");

        const nextMessage =
            document.getElementById("nextMessage");

        const nextArea =
            document.getElementById("next-area");

        if (sourceArea) {
            sourceArea.style.display = "none";
        }

        if (numberArea) {
            numberArea.style.display = "none";
        }

        if (nextMessage) {

            nextMessage.textContent =
                "SIGNAL 03 // CONNECTION ESTABLISHED";

        }

        if (nextArea) {
            nextArea.style.display = "block";
        }

    }

    else if (number === "") {

        result.textContent =
            "ENTER A NUMBER";

        setError(result);

    }

    else {

        result.textContent =
            "WRONG NUMBER // CHECK THE ID.";

        setError(result);

    }

}


/* =========================
   SIGNAL 02 → SIGNAL 03
========================= */

function goToSignal03() {
    window.location.href = "signal-03.html";
}


/* =========================
   SIGNAL 03
========================= */

function checkRiddle() {

    const input =
        document.getElementById("riddleAnswer");

    const result =
        document.getElementById("riddleResult");

    const equationArea =
        document.getElementById("equation-area");

    if (!input || !result) {
        return;
    }

    const answer =
        input.value.trim().toLowerCase();

    if (answer === "map") {

        result.textContent =
            "SIGNAL ACCEPTED // MAP DETECTED";

        setSuccess(result);

        input.disabled = true;

        const button =
            input.parentElement.querySelector("button");

        if (button) {
            button.style.display = "none";
        }

        if (equationArea) {

            equationArea.style.display = "block";

            setTimeout(function () {

                equationArea.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }, 250);

        }

    }

    else if (answer === "") {

        result.textContent =
            "ENTER A RESPONSE";

        setError(result);

    }

    else {

        result.textContent =
            "WRONG ANSWER // THINK ABOUT THE RIDDLE.";

        setError(result);

    }

}


function checkEquation() {

    const input =
        document.getElementById("equationAnswer");

    const result =
        document.getElementById("equationResult");

    const equation2Area =
        document.getElementById("equation2-area");

    if (!input || !result) {
        return;
    }

    const answer =
        input.value.trim();

    if (answer === "35") {

        result.textContent =
            "NUMBER ACCEPTED // 35";

        setSuccess(result);

        input.disabled = true;

        const button =
            input.parentElement.querySelector("button");

        if (button) {
            button.style.display = "none";
        }

        if (equation2Area) {

            equation2Area.style.display = "block";

            setTimeout(function () {

                equation2Area.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }, 250);

        }

    }

    else if (answer === "") {

        result.textContent =
            "ENTER A NUMBER";

        setError(result);

    }

    else {

        result.textContent =
            "WRONG ANSWER // TRY AGAIN.";

        setError(result);

    }

}


function checkEquation2() {

    const input =
        document.getElementById("equation2Answer");

    const result =
        document.getElementById("equation2Result");

    const locationArea =
        document.getElementById("location-area");

    if (!input || !result) {
        return;
    }

    const answer =
        input.value.trim();

    if (answer === "139") {

        result.textContent =
            "NUMBER ACCEPTED // COORDINATES FOUND";

        setSuccess(result);

        input.disabled = true;

        const button =
            input.parentElement.querySelector("button");

        if (button) {
            button.style.display = "none";
        }

        if (locationArea) {

            locationArea.style.display = "block";

            setTimeout(function () {

                locationArea.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }, 250);

        }

    }

    else if (answer === "") {

        result.textContent =
            "ENTER A NUMBER";

        setError(result);

    }

    else {

        result.textContent =
            "WRONG ANSWER // TRY AGAIN.";

        setError(result);

    }

}


function checkCity() {

    const input =
        document.getElementById("cityAnswer");

    const result =
        document.getElementById("cityResult");

    const shibuyaStep =
        document.getElementById("shibuya-step");

    if (!input || !result) {
        return;
    }

    const answer =
        input.value.trim().toLowerCase();

    if (
        answer === "tokyo" ||
        answer === "tokyo japan" ||
        answer === "tokyo, japan"
    ) {

        result.textContent =
            "CITY CONFIRMED // TOKYO, JAPAN";

        setSuccess(result);

        input.style.display = "none";

        const button =
            document.querySelector("#city-step button");

        if (button) {
            button.style.display = "none";
        }

        if (shibuyaStep) {

            shibuyaStep.style.display = "block";

            setTimeout(function () {

                shibuyaStep.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }, 250);

        }

    }

    else if (answer === "") {

        result.textContent =
            "ENTER A CITY";

        setError(result);

    }

    else {

        result.textContent =
            "WRONG CITY // FOLLOW THE COORDINATES.";

        setError(result);

    }

}


function checkLocation() {

    const input =
        document.getElementById("locationAnswer");

    const result =
        document.getElementById("locationResult");

    const crossingGame =
        document.getElementById("crossing-game");

    if (!input || !result) {
        return;
    }

    const answer =
        input.value.trim().toLowerCase();

    if (
        answer === "shibuya crossing" ||
        answer === "shibuya scramble crossing"
    ) {

        result.textContent =
            "LOCATION CONFIRMED // SHIBUYA CROSSING";

        setSuccess(result);

        input.style.display = "none";

        const button =
            document.querySelector("#shibuya-step button");

        if (button) {
            button.style.display = "none";
        }

        if (crossingGame) {

            crossingGame.style.display = "block";

            setTimeout(function () {

                crossingGame.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }, 350);

        }

    }

    else if (answer === "") {

        result.textContent =
            "ENTER A LOCATION";

        setError(result);

    }

    else {

        result.textContent =
            "WRONG LOCATION // READ THE CLUE AGAIN.";

        setError(result);

    }

}


/* =========================
   CROSSING GAME
========================= */

let gameRunning = false;
let gameTimer = 30;
let gameInterval = null;
let gameAnimation = null;

let playerX = 20;
let playerY = 0;

let keys = {};
let obstacles = [];


document.addEventListener("keydown", function (event) {

    const activeElement =
        document.activeElement;

    if (
        activeElement &&
        (
            activeElement.tagName === "INPUT" ||
            activeElement.tagName === "TEXTAREA"
        )
    ) {
        return;
    }

    if (!gameRunning) {
        return;
    }

    const key =
        event.key.toLowerCase();

    if (
        key === "arrowup" ||
        key === "arrowdown" ||
        key === "arrowleft" ||
        key === "arrowright" ||
        key === "w" ||
        key === "a" ||
        key === "s" ||
        key === "d"
    ) {

        event.preventDefault();

        keys[key] = true;

    }

});


document.addEventListener("keyup", function (event) {

    const key =
        event.key.toLowerCase();

    keys[key] = false;

});


function startCrossingGame() {

    const board =
        document.getElementById("game-board");

    const player =
        document.getElementById("player");

    const startButton =
        document.getElementById("startGameBtn");

    const status =
        document.getElementById("gameStatus");

    const message =
        document.getElementById("gameMessage");

    const timer =
        document.getElementById("gameTimer");

    if (!board || !player) {
        return;
    }

    gameRunning = true;
    gameTimer = 30;
    keys = {};

    clearInterval(gameInterval);
    cancelAnimationFrame(gameAnimation);

    obstacles = [];

    board
        .querySelectorAll(".moving-obstacle")
        .forEach(function (obstacle) {
            obstacle.remove();
        });


    /* SAFE START */

    playerX =
        (board.clientWidth / 2) -
        (player.offsetWidth / 2);

    playerY =
        board.clientHeight -
        player.offsetHeight -
        18;


    player.style.left =
        playerX + "px";

    player.style.top =
        playerY + "px";

    player.style.bottom =
        "auto";


    if (status) {
        status.textContent = "RUNNING";
    }

    if (message) {
        message.textContent =
            "MOVE UP // AVOID THE SIGNAL TRAFFIC";
    }

    if (timer) {
        timer.textContent = gameTimer;
    }

    if (startButton) {
        startButton.textContent =
            "RESTART CROSSING";
    }


    createObstacles(board);


    gameInterval =
        setInterval(function () {

            if (!gameRunning) {
                return;
            }

            gameTimer--;

            if (timer) {
                timer.textContent =
                    gameTimer;
            }

            if (gameTimer <= 0) {
                endCrossingGame(false);
            }

        }, 1000);


    gameLoop();

}


function createObstacles(board) {

    const lanes = [
        70,
        130,
        190,
        250
    ];


    lanes.forEach(function (laneY, laneIndex) {

        for (let i = 0; i < 2; i++) {

            const obstacle =
                document.createElement("div");

            obstacle.className =
                "moving-obstacle";

            obstacle.style.top =
                laneY + "px";

            obstacle.style.zIndex =
                "15";


            const direction =
                laneIndex % 2 === 0
                    ? 1
                    : -1;


            let startingX;


            if (direction === 1) {

                startingX =
                    -100 -
                    (i * 300);

            }

            else {

                startingX =
                    board.clientWidth +
                    100 +
                    (i * 300);

            }


            obstacle.style.left =
                startingX + "px";


            board.appendChild(obstacle);


            obstacles.push({

                element: obstacle,

                x: startingX,

                y: laneY,

                width: 42,

                height: 24,

                direction: direction,

                speed:
                    5 +
                    Math.random() * 2

            });

        }

    });

}


function gameLoop() {

    if (!gameRunning) {
        return;
    }

    updatePlayer();
    updateObstacles();


    if (checkCollision()) {

        endCrossingGame(false);

        return;

    }


    if (playerY <= 45) {

        endCrossingGame(true);

        return;

    }


    gameAnimation =
        requestAnimationFrame(gameLoop);

}


function updatePlayer() {

    const board =
        document.getElementById("game-board");

    const player =
        document.getElementById("player");

    if (!board || !player) {
        return;
    }


    const playerSpeed = 5;


    if (
        keys["arrowup"] ||
        keys["w"]
    ) {
        playerY -= playerSpeed;
    }


    if (
        keys["arrowdown"] ||
        keys["s"]
    ) {
        playerY += playerSpeed;
    }


    if (
        keys["arrowleft"] ||
        keys["a"]
    ) {
        playerX -= playerSpeed;
    }


    if (
        keys["arrowright"] ||
        keys["d"]
    ) {
        playerX += playerSpeed;
    }


    const maxX =
        board.clientWidth -
        player.offsetWidth;


    const maxY =
        board.clientHeight -
        player.offsetHeight;


    if (playerX < 0) {
        playerX = 0;
    }


    if (playerX > maxX) {
        playerX = maxX;
    }


    if (playerY < 0) {
        playerY = 0;
    }


    if (playerY > maxY) {
        playerY = maxY;
    }


    player.style.left =
        playerX + "px";

    player.style.top =
        playerY + "px";

}


function updateObstacles() {

    const board =
        document.getElementById("game-board");

    if (!board) {
        return;
    }


    obstacles.forEach(function (obstacle) {

        obstacle.x +=
            obstacle.speed *
            obstacle.direction;


        if (
            obstacle.direction === 1 &&
            obstacle.x >
            board.clientWidth + 60
        ) {

            obstacle.x = -70;

        }


        if (
            obstacle.direction === -1 &&
            obstacle.x < -70
        ) {

            obstacle.x =
                board.clientWidth + 60;

        }


        obstacle.element.style.left =
            obstacle.x + "px";

    });

}


function checkCollision() {

    const player =
        document.getElementById("player");

    if (!player) {
        return false;
    }


    const playerLeft =
        playerX;

    const playerRight =
        playerX +
        player.offsetWidth;

    const playerTop =
        playerY;

    const playerBottom =
        playerY +
        player.offsetHeight;


    for (
        let i = 0;
        i < obstacles.length;
        i++
    ) {

        const obstacle =
            obstacles[i];


        const obstacleLeft =
            obstacle.x;

        const obstacleRight =
            obstacle.x +
            obstacle.width;

        const obstacleTop =
            obstacle.y;

        const obstacleBottom =
            obstacle.y +
            obstacle.height;


        if (
            playerLeft < obstacleRight &&
            playerRight > obstacleLeft &&
            playerTop < obstacleBottom &&
            playerBottom > obstacleTop
        ) {

            return true;

        }

    }


    return false;

}


function endCrossingGame(won) {

    if (!gameRunning) {
        return;
    }

    gameRunning = false;

    clearInterval(gameInterval);
    cancelAnimationFrame(gameAnimation);

    keys = {};


    const status =
        document.getElementById("gameStatus");

    const message =
        document.getElementById("gameMessage");

    const startButton =
        document.getElementById("startGameBtn");


    if (won) {

        if (status) {
            status.textContent =
                "CLEARED";

            setSuccess(status);
        }

        if (message) {
            message.textContent =
                "CROSSING COMPLETE // SIGNAL PATH OPEN";

            setSuccess(message);
        }

        if (startButton) {

            startButton.textContent =
                "CROSSING COMPLETE";

            startButton.disabled = true;

        }


        setTimeout(function () {
            startJumbleStage();
        }, 900);

    }

    else {

        if (status) {
            status.textContent =
                "FAILED";

            setError(status);
        }

        if (message) {
            message.textContent =
                "SIGNAL LOST // TRY AGAIN";

            setError(message);
        }

        if (startButton) {

            startButton.textContent =
                "TRY AGAIN";

            startButton.disabled = false;

        }

    }

}


/* =========================
   JUMBLE
========================= */

let jumbleAttempts = 3;


function startJumbleStage() {

    const stage =
        document.getElementById("jumble-stage");

    if (!stage) {
        return;
    }

    stage.style.display =
        "block";

    jumbleAttempts = 3;


    const attempts =
        document.getElementById("jumbleAttempts");

    if (attempts) {
        attempts.textContent =
            jumbleAttempts;
    }


    setTimeout(function () {

        stage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }, 250);

}


function checkJumble() {

    const input =
        document.getElementById("jumbleAnswer");

    const result =
        document.getElementById("jumbleResult");

    if (!input || !result) {
        return;
    }


    const answer =
        input.value.trim().toLowerCase();


    const correctAnswers = [
        "follow the signal",
        "follow signal"
    ];


    if (answer === "") {

        result.textContent =
            "ENTER THE MESSAGE";

        setError(result);

        return;

    }


    if (correctAnswers.includes(answer)) {

        result.textContent =
            "MESSAGE RESTORED // SIGNAL CONTINUES";

        setSuccess(result);

        input.disabled = true;


        const button =
            input.parentElement.querySelector("button");

        if (button) {
            button.style.display =
                "none";
        }


        setTimeout(function () {
            startHiddenStage();
        }, 1000);

        return;

    }


    jumbleAttempts--;


    const attempts =
        document.getElementById("jumbleAttempts");

    if (attempts) {
        attempts.textContent =
            jumbleAttempts;
    }

    setError(result);


    if (jumbleAttempts <= 0) {

        result.textContent =
            "SIGNAL LOCKED // REFRESH AND TRY AGAIN";

        input.disabled = true;


        const button =
            input.parentElement.querySelector("button");

        if (button) {
            button.disabled = true;
        }

    }

    else {

        result.textContent =
            "MESSAGE CORRUPTED // TRY AGAIN";

    }

}


/* =========================
   HIDDEN STAGE
========================= */

function startHiddenStage() {

    const stage =
        document.getElementById("hidden-stage");

    const message =
        document.getElementById("hidden-message");

    const continueButton =
        document.getElementById("hiddenContinueBtn");


    if (!stage || !message) {
        return;
    }


    stage.style.display =
        "block";


    message.style.opacity =
        "0";

    message.textContent =
        "WAITING...";


    if (continueButton) {

        continueButton.style.display =
            "none";

    }


    setTimeout(function () {

        message.textContent =
            "REMEMBER: FOUR PAIRS";

        message.style.opacity =
            "1";

    }, 1200);


    setTimeout(function () {

        message.style.opacity =
            "0";

    }, 2600);


    setTimeout(function () {

        message.textContent =
            "SIGNAL STABLE";

        message.style.opacity =
            "1";


        if (continueButton) {

            continueButton.style.display =
                "inline-block";

        }

    }, 3300);


    setTimeout(function () {

        stage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }, 300);

}


/* =========================
   MEMORY GAME
========================= */

let memoryCards = [];
let firstCard = null;
let secondCard = null;
let memoryLocked = false;
let memoryMatches = 0;


function setupMemoryGame() {

    memoryCards =
        document.querySelectorAll(".memory-card");

    if (!memoryCards.length) {
        return;
    }


    memoryCards.forEach(function (card) {

        card.addEventListener("click", function () {

            flipMemoryCard(card);

        });

    });

}


function startMemoryGame() {

    const stage =
        document.getElementById("memory-stage");

    if (!stage) {
        return;
    }


    stage.style.display =
        "block";


    firstCard = null;
    secondCard = null;

    memoryLocked = false;
    memoryMatches = 0;


    const matchCount =
        document.getElementById("matchCount");

    const message =
        document.getElementById("memoryMessage");


    if (matchCount) {
        matchCount.textContent =
            "0";
    }


    if (message) {
        message.textContent =
            "";
    }


    memoryCards.forEach(function (card) {

        card.disabled = false;

        card.classList.remove(
            "flipped",
            "matched"
        );

        card.textContent =
            "?";

    });


    shuffleMemoryCards();


    setTimeout(function () {

        stage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }, 250);

}


function shuffleMemoryCards() {

    const values = [
        "A",
        "B",
        "C",
        "D",
        "A",
        "B",
        "C",
        "D"
    ];


    for (
        let i = values.length - 1;
        i > 0;
        i--
    ) {

        const random =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        const temp =
            values[i];

        values[i] =
            values[random];

        values[random] =
            temp;

    }


    memoryCards.forEach(function (card, index) {

        card.dataset.card =
            values[index];

    });

}


function flipMemoryCard(card) {

    if (
        memoryLocked ||
        card.classList.contains("flipped") ||
        card.classList.contains("matched")
    ) {
        return;
    }


    card.classList.add(
        "flipped"
    );

    card.textContent =
        card.dataset.card;


    if (!firstCard) {

        firstCard =
            card;

        return;

    }


    secondCard =
        card;

    memoryLocked =
        true;


    if (
        firstCard.dataset.card ===
        secondCard.dataset.card
    ) {

        firstCard.classList.add(
            "matched"
        );

        secondCard.classList.add(
            "matched"
        );


        firstCard.disabled =
            true;

        secondCard.disabled =
            true;


        memoryMatches++;


        const matchCount =
            document.getElementById("matchCount");


        if (matchCount) {

            matchCount.textContent =
                memoryMatches;

        }


        firstCard = null;
        secondCard = null;

        memoryLocked =
            false;


        if (memoryMatches === 4) {

            const message =
                document.getElementById("memoryMessage");


            if (message) {

                message.textContent =
                    "MEMORY COMPLETE // FINAL SIGNAL UNLOCKED";

                setSuccess(message);

            }


            setTimeout(function () {

                finishSignal03();

            }, 1000);

        }

    }

    else {

        setTimeout(function () {

            firstCard.classList.remove(
                "flipped"
            );

            secondCard.classList.remove(
                "flipped"
            );


            firstCard.textContent =
                "?";

            secondCard.textContent =
                "?";


            firstCard = null;
            secondCard = null;

            memoryLocked =
                false;

        }, 700);

    }

}


/* =========================
   SIGNAL 03 COMPLETE
========================= */

function finishSignal03() {

    const finalStage =
        document.getElementById("signal03-final");

    const signal4Reveal =
        document.getElementById("signal4Reveal");


    if (!finalStage) {
        return;
    }


    finalStage.style.display =
        "block";


    if (signal4Reveal) {

        signal4Reveal.style.display =
            "block";

    }


    setTimeout(function () {

        finalStage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }, 250);

}
