//DISCLAIMER: A large part of this was developed with using a pre-existing tic-tac-toe code from a third party as a guide.
// Assistance was difficult to obtain, but regardless, I used my best effort to put my own spin on the code without directly copying.

const messageBox = document.querySelector('.message');

const winningMessage = () => `<p>Player</p> <p>${player}</p> <p>has won</p>`;
const drawMessage = () => `<p>A strange game</p><p>The only winning move was not to play...</p> <p>How about a nice game of chess?</p>`;
const playerTurn = () => `<p>It is now Player</p> <p>${player}'s</p> <p>turn</p>`;

let gameActive = true;

let player = "X";

let board = [
    "", "", "",
    "", "", "",
    "", "", ""
];

function restartGame() {
    gameActive = true;
    player = "X";
    board = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];
    messageBox.innerHTML = playerTurn();
    document.querySelectorAll('.cell')
    .forEach(cell => cell.innerHTML = "");
}

function boardPlayerPlayed(cellClick, clickedCell) {
    board[clickedCell] = player;
    cellClick.innerHTML = player;
}

messageBox.innerHTML = playerTurn();

function endPlayerTurn() {
    player = player === "X" ? "O" : "X";
    messageBox.innerHTML = playerTurn();
}

function boardPlaceClicked(cellClickEvent) {
    const cellClick = cellClickEvent.target;
    
    const clickedCell = parseInt(
        cellClick.getAttribute('data-cell-index')
    );
    
    if (board[clickedCell] !== "" || !gameActive) {
        return;
    }
       
    boardPlayerPlayed(cellClick, clickedCell);

    winStatus();
}

const winningConditions = [
    //horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //diagonal
    [0, 4, 8],
    [2, 4, 6]
]

function winStatus() {
    let gameWon = false;

    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];

        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            gameWon = true;
            break
        }
    }

    if (gameWon) {
        gameActive = false;
        messageBox.innerHTML = winningMessage();
        return;
    }

    let roundDraw = !board.includes("");

    if (roundDraw) {
        gameActive = false;
        messageBox.innerHTML = drawMessage();
        return;
    }

    endPlayerTurn();
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', boardPlaceClicked));
document.querySelector('.restart').addEventListener('click', restartGame);