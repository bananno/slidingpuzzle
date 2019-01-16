
document.onkeydown = useKeyboard;

const keyboardRun = {
  enter: keyboardPressEnter
};

function useKeyboard(e) {
  const keyName = (window.event || e).key.toLowerCase();

  if (keyboardRun[keyName]) {
    keyboardRun[keyName]();
    return;
  }

  if (keyName == 'n') {
    newGame();
    return;
  }

  if (keyName == 's') {
    shuffleBoard();
    return;
  }

  if (keyName == 'f') {
    solveBoard();
    return;
  }

  if (keyName == 'h') {
    inputBoardSizeX.focus();
    return;
  }

  if (keyName == 'w') {
    inputBoardSizeY.focus();
    return;
  }

  if (keyName == 'arrowleft') { // left
    if (emptySpace.y < boardSize.y) {
      swapTiles(emptySpace.x, emptySpace.y + 1)
    }
    return;
  }

  if (keyName == 'arrowup') { // up
    if (emptySpace.x < boardSize.x) {
      swapTiles(emptySpace.x + 1, emptySpace.y)
    }
    return;
  }

  if (keyName == 'arrowright') { // right
    if (emptySpace.y > 1) {
      swapTiles(emptySpace.x , emptySpace.y - 1)
    }
    return;
  }

  if (keyName == 'arrowdown') { // down
    if (emptySpace.x > 1) {
      swapTiles(emptySpace.x - 1, emptySpace.y)
    }
    return;
  }
}

function keyboardPressEnter() {
  let focusElement = document.activeElement.id;

  if (focusElement == 'inputBoardSizeX' || focusElement == 'inputBoardSizeY') {
    newGame();
    document.activeElement.blur();
  }
}
