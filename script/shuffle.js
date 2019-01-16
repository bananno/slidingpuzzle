
function shuffleBoard() {
  let numShuffles = boardSize.x * boardSize.y * 5;
  let direction = true;

  forNumberOfTimes(numShuffles, () => {
    if (direction) {
      slideTile(getRandomNumber(boardSize.x), emptySpace.y);
    } else {
      slideTile(emptySpace.x, getRandomNumber(boardSize.y));
    }
    direction = !direction;
  });

  resetMoveCount();
}
