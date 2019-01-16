
// VARIABLES, CONSTANTS, FUNCTION BINDING

var boardSize = {},
  emptySpace = {},
  numReference = {
    numToArr:[],
    x:[]
  };

let moveCount = 0;

const defaultBoardSize = 5;
const minBoardSize = 2;
const maxBoardSize = 10;

const winningCharacter = '&#9786;';

// INITIATE

window.onload = function() {
  newGame();
};

// FUNCTIONS

function newGame() {
  boardSize = getBoardSizeInputs();

  inputBoardSizeY.value = boardSize.y;
  inputBoardSizeX.value = boardSize.x;

  resetMoveCount();
  solveBoard();
}

function getBoardSizeInputs() {
  let newBoardSize = {};

  newBoardSize.x = parseInt(inputBoardSizeX.value);
  newBoardSize.y = parseInt(inputBoardSizeY.value);

  ['x', 'y'].forEach((coord, i) => {
    if (isNaN(newBoardSize[coord])) {
      newBoardSize[coord] = defaultBoardSize;
    }

    if (newBoardSize[coord] < minBoardSize) {
      newBoardSize[coord] = minBoardSize;
    }

    if (newBoardSize[coord] > maxBoardSize) {
      newBoardSize[coord] = maxBoardSize;
    }
  });

  return newBoardSize;
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

  var newEmpty = selectCell(numReference[x][y]),
    oldEmpty = selectCell(emptySpace.total);

  emptySpace = {
    x: x,
    y: y,
    total: numReference[x][y]
  };

  oldEmpty.className = "boardCell";
  newEmpty.className = "boardCell empty";

  oldEmpty.innerHTML = newEmpty.innerHTML;
  newEmpty.innerHTML = "";

  incrementMoveCount();
  checkIfBoardIsSolved();
}

function checkIfBoardIsSolved() {
  let numberOfCells = boardSize.x * boardSize.y;
  for (let num = 1; num < numberOfCells; num++) {
    let cellNum = selectCell(num).innerHTML;
    if ('' + num != cellNum) {
      return;
    }
  }
  selectCell(numberOfCells).innerHTML = winningCharacter;
}
