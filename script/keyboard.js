
document.onkeydown = useKeyboard;

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
    shuffleBoard();
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
