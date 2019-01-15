
// VARIABLES, CONSTANTS, FUNCTION BINDING

var boardSize = {},
    emptySpace = {},
    numReference = {
        numToArr:[],
        x:[]
    },
    moves = 0;

document.onkeydown = useKeyboard;

// INITIATE

newGame();

// FUNCTIONS

function newGame() {

    boardSize.x = parseInt(inputBoardSizeX.value);
    boardSize.y = parseInt(inputBoardSizeY.value);

    // Below: probably can't happen now, due to event return
    if(isNaN(boardSize.x)) boardSize.x = 5;
    if(isNaN(boardSize.y)) boardSize.y = 5;

    if(boardSize.x <= 1) boardSize.x = 2;
    if(boardSize.y <= 1) boardSize.y = 2;

    if(boardSize.x > 10) boardSize.x = 10;
    if(boardSize.y > 10) boardSize.y = 10;

    inputBoardSizeY.value = boardSize.y;
    inputBoardSizeX.value = boardSize.x;

    moves = 0;
    movesBox.value = moves;

    solveBoard();
}

function solveBoard() {

    emptySpace.x = inputBoardSizeX.value;
    emptySpace.y = inputBoardSizeY.value;
    emptySpace.total = emptySpace.x * emptySpace.y;

    var s = "<table border=1 id=boardFrame>";

    for(var x=1; x<=boardSize.x; x++) {
        s+="<tr>";

        numReference[x] = [];

        for(var y=1; y<=boardSize.y; y++) {
            var num = ((x-1) * boardSize.y + y);

            if(num == emptySpace.total) {
                s += "<td class='boardCell empty' id=cell_" + num + " onClick=slideTile(" + x + "," + y + ")>";
            } else {
                s += "<td class=boardCell id=cell_" + num + " onClick=slideTile(" + x + "," + y + ")>" + num;
            }

            numReference.numToArr[num] = {x:x, y:y};
            numReference[x][y] = num;
        }
    }

    s+="</table>";

    document.getElementById("boardBox").innerHTML = s;
}

function shuffle() {
    for(var count = 1; count <= (boardSize.x * boardSize.y * 5); count ++) {
        if((count%2) == 0) {
            slideTile((Math.floor(Math.random() * boardSize.x) + 1), emptySpace.y);
        } else {
            slideTile(emptySpace.x, (Math.floor(Math.random() * boardSize.y) + 1));
        }
    }
    moves = 0;
    movesBox.value = moves;
}

function useKeyboard(keyPressed) {
    var keyPressed = (window.event ? window.event : keyPressed).keyCode;

    // Enter:

    if(keyPressed == 13) // enter
    {
        var focusElement = document.activeElement.id;

        if(focusElement == "inputBoardSizeX" || focusElement == "inputBoardSizeY")
        {
            newGame();
            document.activeElement.blur();
        }

        return;
    }

    // Press one of the the three buttons:

    if(keyPressed == 78) { // "n"
        newGame();
        return;
    }

    if(keyPressed == 83) { // "s"
        shuffle();
        return;
    }

    if(keyPressed == 70) { // "f"
        solveBoard();
        return;
    }

    // Focus one of the two input fields:

    if(keyPressed == 72) { // "h"
        inputBoardSizeX.focus();
        return;
    }

    if(keyPressed == 87) { // "w"
        inputBoardSizeY.focus();
        return;
    }

    // Arrow keys:

    if(keyPressed == 37) { // left arrow key
        if(emptySpace.y < boardSize.y)
            swapTiles(emptySpace.x, emptySpace.y + 1)

        return;
    }

    if(keyPressed == 38) { // up arrow key
        if(emptySpace.x < boardSize.x)
            swapTiles(emptySpace.x + 1, emptySpace.y)

        return;
    }

    if(keyPressed == 39) { // right arrow key
        if(emptySpace.y > 1)
            swapTiles(emptySpace.x , emptySpace.y - 1)

        return;
    }

    if(keyPressed == 40) { // down arrow key
        if(emptySpace.x > 1)
            swapTiles(emptySpace.x - 1, emptySpace.y)

        return;
    }
}

function slideTile(inputX, inputY) {
    if(emptySpace.x == inputX)  {
        if(emptySpace.y > inputY) {
            for(var y=emptySpace.y; y>=inputY; y--) {
                swapTiles(inputX, y);
            }
        } else if(emptySpace.y < inputY) {
            for(var y=emptySpace.y; y<=inputY; y++) {
                swapTiles(inputX, y);
            }
        }
    } else if(emptySpace.y == inputY) {
        if(emptySpace.x > inputX) {
            for(var x=emptySpace.x; x>=inputX; x--) {
                swapTiles(x, inputY);
            }
        } else if(emptySpace.x < inputX) {
            for(var x=emptySpace.x; x<=inputX; x++) {
                swapTiles(x, inputY);
            }
        }
    }
}

function swapTiles(x, y) {

    var newEmpty = document.getElementById("cell_" + numReference[x][y]),
        oldEmpty = document.getElementById("cell_" + emptySpace.total);

    emptySpace = {
        x: x,
        y: y,
        total: numReference[x][y]
    };

    oldEmpty.className = "boardCell";
    newEmpty.className = "boardCell empty";

    oldEmpty.innerHTML = newEmpty.innerHTML;
    newEmpty.innerHTML = "";

    moves ++;
    movesBox.value = moves;

    checkSolved();
}

function checkSolved() {
    for(var num=1; num<(boardSize.x * boardSize.y); num++) {
        if(("" + num + "") != document.getElementById("cell_" + num).innerHTML) {
            return;
        }
    }
    document.getElementById("cell_" + (boardSize.x * boardSize.y)).innerHTML = "&#9786;";
}
