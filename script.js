var readline = require("readline-sync");

const target = 2048;
const n = 4; // number of rows and columns 

var board = new Array(n);   // n rows

for (let i = 0; i < n; i++) {  // fill board with zeroes
    board[i] = new Array(n);
    for (let j = 0; j < n; j++) {
        board[i][j] = 0;         // zero will denote empty cell
    }
}


function showBoard() {                   // printing the board
    for (let i = 0; i < n; i++)
        console.log(board[i]);
}

function fillOneCell() {   // select one random empty cell and fill it with 2 or 4
    var emptyCells = [];
    for (let i = 0; i < n; i++) {          // store all the empty cells
        for (let j = 0; j < n; j++) {
            if (board[i][j] == 0) {
                emptyCells.push({
                    x: i,
                    y: j
                });
            }
        }
    }
    var m = emptyCells.length;
    var randomInd = Math.floor(Math.random() * m);
    var r = emptyCells[randomInd].x, c = emptyCells[randomInd].y;

    var randomBinary = Math.floor(Math.random() * 2);
    if (randomBinary == 0) {
        board[r][c] = 2;
    }
    else
        board[r][c] = 4;
}

function clone(original) {      // to make a clone of board
    var copy = new Array(n);
    for (let i = 0; i < n; i++) {
        copy[i] = new Array(n);
        for (let j = 0; j < n; j++)
            copy[i][j] = original[i][j];
    }
    return copy;
}
function areDiffrent(board1, board2) {    // check if an element is different 
    for (let i = 0; i < n; i++)
        for (let j = 0; j < n; j++)
            if (board1[i][j] != board2[i][j])
                return true;
    return false;
}

function shiftLeft() {           // slice non zero cells left side
    for (let i = 0; i < n; i++) {
        var ind = 0;
        for (let j = 0; j < n; j++) {
            if (board[i][j] != 0) {
                board[i][ind] = board[i][j];
                ++ind;
            }
        }
        while (ind < n)
            board[i][ind++] = 0;
    }
}
function shiftRight() {       // slice non zero cells right side
    for (let i = 0; i < n; i++) {
        var ind = n - 1;
        for (let j = n - 1; j >= 0; j--) {
            if (board[i][j] != 0)
                board[i][ind--] = board[i][j];
        }
        while (ind >= 0)
            board[i][ind--] = 0;
    }
}
function shiftUp() {        // slice non zero cells upside
    for (let j = 0; j < n; j++) {
        var ind = 0;
        for (let i = 0; i < n; i++) {

            if (board[i][j] != 0)
                board[ind++][j] = board[i][j];
        }
        while (ind < n)
            board[ind++][j] = 0;
    }
}
function shiftDown() {     // shift non zero cells downside
    for (let j = 0; j < n; j++) {
        var ind = n - 1;
        for (let i = n - 1; i >= 0; i--) {

            if (board[i][j] != 0)
                board[ind--][j] = board[i][j];
        }
        while (ind >= 0)
            board[ind--][j] = 0;
    }
}

function moveLeft() {  // left operation
    var boardCopy = clone(board);

    shiftLeft();      // slice values left side first
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - 1; j++) {
            if (board[i][j] != 0 && board[i][j] == board[i][j + 1]) {
                board[i][j] = board[i][j] * 2;
                board[i][j + 1] = 0;
            }
        }
    }
    shiftLeft();
    for (let i = 0; i < n; i++)
        for (let j = 0; j < n; j++)
            if (board[i][j] == target) // wining
                return 1;

    if (areDiffrent(board, boardCopy))
        fillOneCell();
    return -1;
}

function moveRight() {
    var boardCopy = clone(board);
    shiftRight();
    for (let i = 0; i < n; i++) {
        for (let j = n - 1; j > 0; j--) {
            if (board[i][j] != 0 && board[i][j] == board[i][j - 1]) {
                board[i][j] = board[i][j] * 2;
                board[i][j - 1] = 0;
            }
        }
    }
    shiftRight();
    for (let i = 0; i < n; i++)
        for (let j = 0; j < n; j++)
            if (board[i][j] == target) // wining
                return 1;

    if (areDiffrent(board, boardCopy))
        fillOneCell();
    return -1;
}
function moveUp() {                // up operation
    var boardCopy = clone(board);
    shiftUp();                     // slice values upside first
    for (let j = 0; j < n; j++) {
        for (let i = 0; i < n - 1; i++) {
            if (board[i][j] != 0 && board[i][j] == board[i + 1][j]) {
                board[i][j] = board[i][j] * 2;
                board[i + 1][j] = 0;
            }
        }
    }
    shiftUp();
    for (let i = 0; i < n; i++)
        for (let j = 0; j < n; j++)
            if (board[i][j] == target) // wining
                return 1;

    if (areDiffrent(board, boardCopy))
        fillOneCell();
    return -1;
}
function moveDown() {             // perform down operation
    var boardCopy = clone(board);
    shiftDown();
    for (let j = 0; j < n; j++) {
        for (let i = n - 1; i > 0; i--) {
            if (board[i][j] != 0 && board[i][j] == board[i - 1][j]) {
                board[i][j] = board[i][j] * 2;
                board[i - 1][j] = 0;
            }
        }
    }
    shiftDown();
    for (let i = 0; i < n; i++)
        for (let j = 0; j < n; j++)
            if (board[i][j] == target) // wining
                return 1;

    if (areDiffrent(board, boardCopy))
        fillOneCell();
    return -1;
}

function isGameOver() {            // function to check for game over 
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] == 0)
                return false;
        }
    }
    var boardCopy = clone(board);    // make copy of boarch so we can again rollback to same board after checking
    shiftLeft();

    if (areDiffrent(board, boardCopy)) {   // to check if left operation gives some movement
        board = clone(boardCopy);
        return false;
    }

    shiftRight();
    if (areDiffrent(board, boardCopy)) {
        board = clone(boardCopy);
        return false;
    }
    shiftUp();
    if (areDiffrent(board, boardCopy)) {
        board = clone(boardCopy);
        return false;
    }
    shiftDown();
    if (areDiffrent(board, boardCopy)) {
        board = clone(boardCopy);
        return false;
    }

    return true;
}


fillOneCell();  // initially we need to fill two cells
fillOneCell();
showBoard();

while (true) {

    var choice = Number(readline.question("Enter your choice"));
    if (isGameOver()) {     // check if game over at this move
        showBoard();
        console.log("Game Over!");
        break;
    }

    if (choice === 1) {  // left
        var val = moveLeft();
        if (val == 1) {  // target achieved
            console.log("You Won!!");
            break;
        }
        else {
            showBoard();
            continue;
        }

    }
    else if (choice === 2) { // right
        var val = moveRight();
        if (val == 1) {  // target achieved
            console.log("You Won!!");
            break;
        }
        else {
            showBoard();
            continue;
        }
    }
    else if (choice === 3) { //up
        var val = moveUp();
        if (val == 1) {  // target achieved
            console.log("You Won!!");
            break;
        }
        else {
            showBoard();
            continue;
        }
    }
    else if (choice == 4) { // down
        var val = moveDown();
        if (val == 1) {  // target achieved
            console.log("You Won!!");
            break;
        }
        else {
            showBoard();
            continue;
        }
    }

    else {  // not valid choice
        console.log("Not a valid choice");
        continue;
    }
}
