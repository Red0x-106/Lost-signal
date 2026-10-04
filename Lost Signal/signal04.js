const staticButton = document.getElementById("staticButton");

const wakeUp = document.getElementById("wakeUp");

const investigation = document.getElementById("investigation");

const output = document.getElementById("output");

const sequenceCount = document.getElementById("sequenceCount");

const archiveStatus = document.getElementById("archiveStatus");

const observerStatus = document.getElementById("observerStatus");

const secondStage = document.getElementById("secondStage");

const answerArea = document.getElementById("answerArea");

const answerInput = document.getElementById("answerInput");

const submitAnswer = document.getElementById("submitAnswer");

const answerMessage = document.getElementById("answerMessage");

const ending = document.getElementById("ending");

const actionButtons =
    document.querySelectorAll(".options button");

const fragmentButtons =
    document.querySelectorAll(".fragment-list button");

  


/*    VARIABLES*/

let wakeClicks = 0;

let sequence = [];

let investigationComplete = false;

let finalCodeUnlocked = false;


/*
   THIS IS THE CORRECT INVESTIGATION ORDER.

   The player discovers this through the clues.
*/

const correctSequence = [
    "archive",
    "logs",
    "status",
    "unknown"
];


/*   HIDDEN "_" BUTTON*/

staticButton.addEventListener("click", () => {

    wakeClicks++;

    if (wakeClicks === 1) {

        addWakeLine(
            "> ...",
            false
        );

    }

    else if (wakeClicks === 2) {

        addWakeLine(
            "> SIGNAL DETECTED.",
            false
        );

    }

    else if (wakeClicks === 3) {

        addWakeLine(
            "> SOMETHING WAS HIDDEN HERE.",
            true
        );

    }

    else if (wakeClicks === 4) {

        addWakeLine(
            "> THE SYSTEM IS WATCHING.",
            true
        );

    }

    else if (wakeClicks >= 5) {

        unlockInvestigation();

    }

});


/*    WAKE UP TEXT */

function addWakeLine(text, important) {

    const line = document.createElement("p");

    line.className = "wake-line";

    if (important) {

        line.classList.add("wake-important");

    }

    line.textContent = text;

    wakeUp.appendChild(line);

}


/*    UNLOCK INVESTIGATION*/

function unlockInvestigation() {

    if (investigation.style.display === "block") {

        return;

    }

    addWakeLine(
        "> ARCHIVE ACCESS REQUESTED.",
        true
    );

    setTimeout(() => {

        addWakeLine(
            "> FOUR FRAGMENTS DETECTED.",
            true
        );

    }, 500);

    setTimeout(() => {

        addWakeLine(
            "> THE ORDER MATTERS.",
            true
        );

    }, 1000);

    setTimeout(() => {

        investigation.style.display = "block";

        investigation.scrollIntoView({
            behavior: "smooth"
        });

    }, 1500);

}


/*    INVESTIGATION BUTTONS */

actionButtons.forEach(button => {

    button.addEventListener("click", () => {

        const action = button.dataset.action;

        handleInvestigation(action);

    });

});


/*    INVESTIGATION LOGIC*/

function handleInvestigation(action) {

    /*
       If the player clicks something already used,
       don't count it again.
    */

    if (sequence.includes(action)) {

        addOutput(
            "> THIS FRAGMENT HAS ALREADY BEEN ACCESSED."
        );

        return;

    }


    /*
       Check whether the player chose
       the correct next step.
    */

    const expected =
        correctSequence[sequence.length];


    if (action !== expected) {

        wrongSequence();

        return;

    }


    sequence.push(action);

    sequenceCount.textContent =
        sequence.length
            .toString()
            .padStart(2, "0");


    /*
       Disable the button after use.
    */

    const clickedButton =
        document.querySelector(
            `[data-action="${action}"]`
        );

    clickedButton.disabled = true;

    clickedButton.style.opacity = "0.45";

    clickedButton.style.cursor = "default";


    /*
       Show the clue.
    */

    if (action === "archive") {

        showArchive();

    }

    else if (action === "logs") {

        showLogs();

    }

    else if (action === "status") {

        showStatus();

    }

    else if (action === "unknown") {

        showUnknown();

    }


    if (sequence.length === 4) {

        finishInvestigation();

    }

}


/*    WRONG SEQUENCE*/

function wrongSequence() {

    document.body.classList.add("glitch");

    setTimeout(() => {

        document.body.classList.remove("glitch");

    }, 500);


    addOutput(`
        <p class="warning">
            &gt; INVALID SEQUENCE.
        </p>

        <p>
            THE SYSTEM RESET YOUR PROGRESS.
        </p>
    `);


    sequence = [];

    sequenceCount.textContent = "00";


    actionButtons.forEach(button => {

        button.disabled = false;

        button.style.opacity = "1";

        button.style.cursor = "pointer";

    });

}


/*    ARCHIVE */

function showArchive() {

    addOutput(`
        <p>
            &gt; OPENING ARCHIVE...
        </p>

        <p class="warning">
            &gt; OLD SIGNAL DATA FOUND.
        </p>

        <div class="hidden-clue">

            <p>
                SIGNAL 01 ............. FOUND
            </p>

            <p>
                SIGNAL 02 ............. FOUND
            </p>

            <p>
                SIGNAL 03 ............. FOUND
            </p>

            <p>
                SIGNAL 04 ............. CURRENT
            </p>

        </div>
    `);

}


/*    SYSTEM LOG */

function showLogs() {

    addOutput(`
        <p>
            &gt; SYSTEM LOG FOUND.
        </p>

        <p class="warning">
            [LOG 01] SIGNAL 01 ACCESSED.
        </p>

        <p class="warning">
            [LOG 02] SIGNAL 02 ACCESSED.
        </p>

        <p class="warning">
            [LOG 03] SIGNAL 03 ACCESSED.
        </p>

        <div class="hidden-clue">

            <p class="important">
                [WARNING]
            </p>

            <br>

            <p>
                SIGNAL 01 DATA HAS BEEN ACCESSED
                MORE TIMES THAN THE OTHER SIGNALS.
            </p>

            <br>

            <p>
                REASON:
                UNKNOWN.
            </p>

        </div>
    `);

}


/*    SIGNAL STATUS */

function showStatus() {

    addOutput(`
        <p>
            &gt; CHECKING SIGNAL STATUS...
        </p>

        <div class="hidden-clue">

            <p>
                SIGNAL 01:
                CONNECTED
            </p>

            <p>
                SIGNAL 02:
                CONNECTED
            </p>

            <p>
                SIGNAL 03:
                CONNECTED
            </p>

            <p>
                SIGNAL 04:
                CONNECTED
            </p>

            <br>

            <p class="important">
                ALL FOUR SIGNALS ARE CONNECTED.
            </p>

        </div>
    `);

}


/*    UNKNOWN */

function showUnknown() {

    document.body.classList.add("glitch");

    setTimeout(() => {

        document.body.classList.remove("glitch");

    }, 600);


    addOutput(`
        <p>
            &gt; UNKNOWN DATA REQUESTED.
        </p>

        <p class="warning">
            ACCESSING...
        </p>

        <div class="hidden-clue">

            <p class="important">
                WHY DID YOU THINK
                THE FIRST SIGNAL WAS ONLY AN ENTRY?
            </p>

            <br>

            <p>
                THE FIRST SIGNAL WAS THE KEY.
            </p>

        </div>
    `);

}


/*    INVESTIGATION COMPLETE */

function finishInvestigation() {

    investigationComplete = true;

    archiveStatus.textContent =
        "PARTIALLY RESTORED";


    setTimeout(() => {

        addOutput(`
            <p class="important">
                &gt; FOUR FRAGMENTS ACCEPTED.
            </p>

            <p>
                &gt; RESTORING ARCHIVED DATA...
            </p>
        `);

    }, 700);


    setTimeout(() => {

        showRecoveredArchive();

    }, 1500);

}


/*    RECOVERED ARCHIVE */

function showRecoveredArchive() {

    addOutput(`

        <div class="hidden-clue">

            <p class="important">
                ARCHIVED SIGNAL DATA
            </p>

            <p>
                -------------------------
            </p>

            <br>

            <p>
                SIGNAL 01
            </p>

            <p class="archive-code">
                18 - 5 - 4 - 0 - 24
            </p>

            <br>

            <p>
                SIGNAL 02
            </p>

            <p>
                [DATA RECOVERED]
            </p>

            <br>

            <p>
                SIGNAL 03
            </p>

            <p>
                [DATA RECOVERED]
            </p>

            <br>

            <p>
                SIGNAL 04
            </p>

            <p>
                [YOU ARE HERE]
            </p>

        </div>

    `);


    setTimeout(() => {

        addOutput(`

            <p class="important">
                YOU HAVE SEEN THIS CODE BEFORE.
            </p>

            <p>
                BUT YOU NEVER ASKED WHY IT WAS THERE.
            </p>

        `);

    }, 1000);


    setTimeout(() => {

        showFragments();

    }, 2200);

}


/*    SECOND STAGE */

function showFragments() {

    secondStage.style.display = "block";

    secondStage.scrollIntoView({
        behavior: "smooth"
    });


    addOutput(`

        <p class="warning">
            &gt; ONE MORE CONNECTION REMAINS.
        </p>

        <p>
            FIND THE SIGNAL THAT STARTED EVERYTHING.
        </p>

    `);

}


/*    FRAGMENT BUTTONS */

fragmentButtons.forEach(button => {

    button.addEventListener("click", () => {

        const fragment =
            button.dataset.fragment;

        checkFragment(fragment);

    });

});


function checkFragment(fragment) {

    if (fragment === "one") {

        addOutput(`

            <div class="hidden-clue">

                <p>
                    SIGNAL 01
                </p>

                <br>

                <p>
                    18 - 5 - 4 - 0 - 24
                </p>

                <br>

                <p class="important">
                    THIS IS WHERE IT BEGAN.
                </p>

            </div>

        `);


        unlockFinalCode();

        return;

    }


    addOutput(`

        <p class="warning">
            &gt; THIS SIGNAL IS NOT THE SOURCE.
        </p>

        <p>
            THE SYSTEM POINTS YOU BACK.
        </p>

    `);

}


/*FINAL CODE */

function unlockFinalCode() {

    if (finalCodeUnlocked) {

        return;

    }

    finalCodeUnlocked = true;


    setTimeout(() => {

        addOutput(`

            <div class="hidden-clue">

                <p>
                    A NUMBER IS ONLY A NUMBER
                </p>

                <p>
                    UNTIL YOU GIVE IT A NAME.
                </p>

                <br>

                <p class="important">
                    A = 1
                </p>

                <p>
                    THE REST SHOULD BE EASY.
                </p>

            </div>

        `);


        answerArea.style.display = "block";

        answerArea.scrollIntoView({
            behavior: "smooth"
        });

    }, 1200);

}


/* ANSWER */

submitAnswer.addEventListener(
    "click",
    checkAnswer
);


answerInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            checkAnswer();

        }

    }
);


function checkAnswer() {

    const answer =
        answerInput.value
            .trim()
            .replace(/\s+/g, "")
            .toLowerCase();


    if (answer === "18-5-4-0-24") {

        answerMessage.textContent =
            "> SIGNAL PATTERN RECOGNIZED.";


        answerInput.disabled = true;

        submitAnswer.disabled = true;


        revealIdentity();

    }

    else {

        answerMessage.textContent =
            "> INVALID RESPONSE. YOU HAVE SEEN THIS BEFORE.";

        answerInput.value = "";


        document.body.classList.add("glitch");

        setTimeout(() => {

            document.body.classList.remove("glitch");

        }, 400);

    }

}


/*   IDENTITY REVEAL */

function revealIdentity() {

    setTimeout(() => {

        addOutput(`

            <div class="hidden-clue">

                <p class="important">
                    18 = R
                </p>

                <p>
                    5 = E
                </p>

                <p>
                    4 = D
                </p>

                <p>
                    0 = 0
                </p>

                <p>
                    24 = X
                </p>

                <br>

                <p class="important">
                    R - E - D - 0 - X
                </p>

            </div>

        `);

    }, 700);


    setTimeout(() => {

        addOutput(`

            <p class="important">
                IDENTITY CONFIRMED.
            </p>

            <p class="archive-code">
                RED0X
            </p>

            <br>

            <p>
                YOU THOUGHT YOU WERE
                FOLLOWING THE SIGNAL.
            </p>

            <p>
                YOU WERE FOLLOWING YOURSELF.
            </p>

        `);

    }, 1800);


    setTimeout(() => {

        observerStatus.textContent =
            "OFFLINE";

        document.getElementById("connection")
            .textContent =
            "● CONNECTION: TERMINATED";


        ending.style.display = "block";

        ending.scrollIntoView({
            behavior: "smooth"
        });

    }, 3300);

}


/*   OUTPUT HELPER*/

function addOutput(content) {

    output.insertAdjacentHTML(
        "beforeend",
        content
    );

}