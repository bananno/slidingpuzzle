
function shuffleBoard() {
  let numShuffles = boardSize.x * boardSize.y * 5;
  let direction = true;

  for (let count = 1; count <= numShuffles; count++) {
    let tileX = boardSize.x;
    let tileY = boardSize.y;

    if (direction) {
      tileX = getRandomNumber(tileX);
    } else {
      tileY = getRandomNumber(tileY);
    }

    slideTile(tileX, tileY);

    direction = !direction;
  }

  resetMoveCount();
}
