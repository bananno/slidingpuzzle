
const keyboardRun = {
  enter: keyboardPressEnter,
  n: newGame,
  s: shuffleBoard,
  f: solveBoard,
  h: () => { focusOnElement('inputBoardSizeX'); },
  w: () => { focusOnElement('inputBoardSizeY'); },
  arrowleft: () => { keyboardPressArrowKey(emptySpace.y < boardSize.y, 0, 1); },
  arrowup: () => { keyboardPressArrowKey(emptySpace.x < boardSize.x, 1, 0); },
  arrowright: () => { keyboardPressArrowKey(emptySpace.y > 1, 0, -1); },
  arrowdown: () => { keyboardPressArrowKey(emptySpace.x > 1, -1, 0); }
};

document.onkeydown = (e) => {
  const keyName = (window.event || e).key.toLowerCase();

  if (keyboardRun[keyName]) {
    keyboardRun[keyName]();
  }
}

function keyboardPressEnter() {
  let focusElement = document.activeElement.id;

  if (focusElement == 'inputBoardSizeX' || focusElement == 'inputBoardSizeY') {
    newGame();
    unfocusEverything();
  }
}

function keyboardPressArrowKey(condition, changeX, changeY) {
  if (condition) {
    let xVal = parseInt(emptySpace.x) + changeX;
    let yVal = parseInt(emptySpace.y) + changeY;
    swapTiles(xVal, yVal);
  }
}
