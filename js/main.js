const gameBoard = (function () {
    let board = { topl: "",
                  topm: "",
                  topr: "X",
                  midl: "",
                  midm: "",
                  midr: "X",
                  botl: "",
                  botm: "",
                  botr: "X"};

    function displayBoard () {
        console.log(board);
    }
    return { displayBoard };
})();