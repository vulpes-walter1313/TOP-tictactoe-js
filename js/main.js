const gameBoard = (function (doc) {
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
       displayBoard();
    }
    return { displayBoard, playTurn, resetBoard, winCheck };
})(document);

function playerFactory(name, token) {
    const getInfo = () => {
        console.log(`My name is ${name} and i use the token ${token}`);
    };
    return {name, token, getInfo};
}

// buttons
const resetBtn = document.querySelector('#reset-board-btn');
resetBtn.addEventListener('click', () => {
    gameBoard.resetBoard();
});