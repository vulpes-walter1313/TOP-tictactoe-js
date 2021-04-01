const gameBoard = (function (doc) {
    let playersTurnNotice = doc.querySelector(".whos-turn");
    let board = { topl: "",
                  topm: "",
                  topr: "",
                  midl: "", 
                  midm: "",
                  midr: "",
                  botl: "",
                  botm: "",
                  botr: ""};
    let slots = doc.querySelectorAll('[data-key]');
    let roundNumber = 0;
    let hasBeenWon = false;

    // Functions
    function displayBoard () {
        console.log(board);
        // const slots = doc.querySelectorAll('[data-key]');
        // console.log(slots);
        slots.forEach( slot => {
            // console.log(slot.dataset.key);
            slot.textContent = board[slot.dataset.key];
        });
    }
    
    function playTurn(player, slotKey) {
        if (!board[slotKey]) {
            board[slotKey] = player.token;
        }
        displayBoard();
        if (winCheck(player.token)) {
            console.log(`You won ${player.name}!!`);
            playersTurnNotice.textContent = `${player.name} Won The Game!!`;
            player.addWin();
        }
    }
    
    function winCheck(token) {
        let wonFlag = false;
        const wonTest = (str) => board[str] === token ? true : false;
        const winningCombos = [
            // horizontal
            ["topl", "topm", "topr"],
            ["midl", "midm", "midr"],
            ["botl", "botm", "botr"],
            // vertical
            ["topl", "midl", "botl"],
            ["topm", "midm", "botm"],
            ["topr", "midr", "botr"],
            // diagnol
            ["topl", "midm", "botr"],
            ["botl", "midm", "topr"]
        ];
        winningCombos.forEach( combo => {
            if(combo.every(wonTest)) {
                wonFlag = true;
                hasBeenWon = true;
                // const slots = document.querySelectorAll("[data-key]");
                slots.forEach( slot => {
                    if (combo.includes(slot.dataset.key)) {
                        slot.classList.add("winner");
                    }
                });
            }
        });
        return wonFlag;
    }
    
    function resetBoard() {
        for(key in board) {
            board[key] = "";
        }
        slots.forEach(slot => {
            if (slot.classList.contains("winner")) {
                slot.classList.remove("winner");
            }
        });
        hasBeenWon = false;
        roundNumber = 0;
        playersTurnNotice.textContent = "Player 1 goes first";
        displayBoard();
    }
    function isBoardFull() {
        if (Array.from(slots).every(slot => board[slot.dataset.key] != "")) {
            return true;
        } else {
            return false;
        }
    }

    function changePlayersTurnNotice(player) {
        playersTurnNotice.textContent = `It's ${player.name}'s turn`;
        
    }
    
    function gameRound(player1, player2, slotChoice) {
        if (isBoardFull() == false && !hasBeenWon) {
            if (roundNumber % 2 == 0) {
                changePlayersTurnNotice(player2);
                playTurn(player1, slotChoice);
            } else {
                changePlayersTurnNotice(player1);
                playTurn(player2, slotChoice);
            }
            roundNumber++;
        } else {
            playersTurnNotice.textContent = "⬆Reset it my guy⬆";
        }
    }
    
    return { displayBoard, playTurn, resetBoard, gameRound };
})(document);

function playerFactory(name, token) {
    let wins = 0;
    const getInfo = () => {
        console.log(`My name is ${name} and i use the token ${token}`);
    };
    const addWin = () => {
        wins++;
    };
    const getWins = () => wins;

    return {name, token, getInfo, addWin, getWins};
}
function handlePlayersEnter() {
    
}

// buttons
const resetBtn = document.querySelector('#reset-board-btn');
resetBtn.addEventListener('click', () => {
    gameBoard.resetBoard();
});

const enterPlayersForm = document.querySelector('.player-init-inputs');
let enterPlayersBtn = document.querySelector('#enter-players');
const playerOneName = document.querySelector('#name-player1');
const playerOneToken = document.querySelector('#token-player1');
const playerTwoName = document.querySelector('#name-player2');
const playerTwoToken = document.querySelector('#token-player2');
let player1;
let player2;

let scoreBoard = document.querySelector('.record-keeping-info');

enterPlayersBtn.addEventListener('click', () => {
    player1 = playerFactory(playerOneName.value, playerOneToken.value);
    player2 = playerFactory(playerTwoName.value, playerTwoToken.value);
    enterPlayersForm.classList.add('hide');
});
// Set trigger points for clicks
let slots = document.querySelectorAll('[data-key]');
slots.forEach( slot => slot.addEventListener('click', function() {
    console.log(this);
    gameBoard.gameRound(player1, player2, this.dataset.key);
    scoreBoard.textContent = `${player1.name}: ${player1.getWins()} | ${player2.name}: ${player2.getWins()}`;
}));