
document.onkeydown = useKeyboard;

const keyboardRun = {
  enter: keyboardPressEnter,
  n: newGame,
  s: shuffleBoard,
  f: solveBoard,
  h: () => { inputBoardSizeX.focus(); },
  w: () => { inputBoardSizeY.focus(); },
  arrowleft: () => { keyboardPressArrowKey('left'); },
  arrowup: () => { keyboardPressArrowKey('up'); },
  arrowright: () => { keyboardPressArrowKey('right'); },
  arrowdown: () => { keyboardPressArrowKey('down'); }
};

function useKeyboard(e) {
  const keyName = (window.event || e).key.toLowerCase();

  if (keyboardRun[keyName]) {
    keyboardRun[keyName]();
  }
}

function keyboardPressEnter() {
  let focusElement = document.activeElement.id;

  if (focusElement == 'inputBoardSizeX' || focusElement == 'inputBoardSizeY') {
    newGame();
    document.activeElement.blur();
  }
}

function keyboardPressArrowKey(direction) {
  if (direction == 'left') {
    if (emptySpace.y < boardSize.y) {
      swapTiles(emptySpace.x, emptySpace.y + 1)
    }
  } else if (direction == 'up') {
    if (emptySpace.x < boardSize.x) {
      swapTiles(emptySpace.x + 1, emptySpace.y)
    }
  } else if (direction == 'right') {
    if (emptySpace.y > 1) {
      swapTiles(emptySpace.x , emptySpace.y - 1)
    }
  } else if (direction == 'down') {
    if (emptySpace.x > 1) {
      swapTiles(emptySpace.x - 1, emptySpace.y)
    }
  }
}
