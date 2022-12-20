const gameStatus = document.querySelector(".gameStatus");
let curPlayer = "x";
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
const winnigMessage = () => `${curPlayer} has won the Game !`;
const drawMessage = () => `Game ended in a draw`;
const currentPlayerTurn = () => `it's ${curPlayer}'s turn`;

document.querySelectorAll(".cell").forEach((item) => {
    item.addEventListener("click", cellClickHandler);
});

document.querySelector(".reset").addEventListener("click" , resetHandler);
function resetHandler() {
    curPlayer = "x";
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    gameStatus.innerHTML = currentPlayerTurn();
    document.querySelectorAll(".cell").forEach( item => {
        item.innerHTML = "";
    })
}

function cellClickHandler(e) {
    const curCell = e.currentTarget;
    const curCellIndex = +curCell.dataset.cellIndex;
    curCell.setAttribute('data-value', curPlayer);
    if (gameState[curCellIndex] !== "" || !gameActive) {
        return;
    }
    gameState[curCellIndex] = curCell.dataset.value;
    if (curPlayer === "x") {
        curCell.innerHTML = `<img src="./assets/img/cross.png" alt="" />`;
    } else {
        curCell.innerHTML = `<img src="./assets/img/circle.png" alt="" />`;
    }
    handleResultValidation();
}
function handleResultValidation() {
    let roundWon = false;
    winningCandition = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    for (let i = 0; i <= 7; i++) {
        winCondition = winningCandition[i];
        const a = gameState[winCondition[0]];
        const b = gameState[winCondition[1]];
        const c = gameState[winCondition[2]];
        if (a === "" || b === "" || c === "") {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
    if (roundWon) {
        gameActive = false;
        gameStatus.textContent = winnigMessage();
        return;
    }
    if (!gameState.includes("")) {
        gameActive = false;
        gameStatus.textContent = drawMessage();
        return;
    }
    handlePlayerChange();
};
function handlePlayerChange() {
    curPlayer = curPlayer === "x" ? "o" : "x";
    gameStatus.textContent = currentPlayerTurn();
};
