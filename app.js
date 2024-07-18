let blocks = document.querySelectorAll(".block");
let resetBtn = document.querySelector("#resetBtn");
let newBtn = document.querySelector("#newBtn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let count = 0;

let patterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


const checkWinner = () => {

    for (let pattern of patterns) {
        let pos1 = blocks[pattern[0]].innerText;
        let pos2 = blocks[pattern[1]].innerText;
        let pos3 = blocks[pattern[2]].innerText;

        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
                return true;
            }
        }

    }
}

const showWinner = (winner) => {
    msg.innerText = `Player ${winner} is the WINNER!`;
    msgContainer.classList.remove("hide");
    disableBlocks();
}

const disableBlocks = () => {
    for (let block of blocks) {
        block.disabled = true;
    }
}

const gameDraw = () => {
    msg.innerText = `Game is a DRAW!`;
    msgContainer.classList.remove("hide");
    disableBlocks();
}

const resetGame = () => {
    turnO = true;
    count = 0;
    msgContainer.classList.add("hide");
    enableBoxes();
}

const enableBoxes = () => {
    for (let block of blocks) {
        block.disabled = false;
        block.innerText = "";
    }
}

const displaySign = (block) => {
    if (turnO) {
        block.innerText = "O";
        turnO = false;
    }
    else {
        block.innerText = "X";
        turnO = true
    }
}

blocks.forEach((block) => {

    block.addEventListener("click", () => {

        displaySign(block);

        block.disabled = true;
        count++;

        let winner = checkWinner();

        if (count === 9 && !winner) {
            gameDraw();
        }
    });

});

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

