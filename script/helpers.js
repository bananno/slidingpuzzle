
function keyEventIsInteger(e) {
  return e.charCode >= 48 && e.charCode <= 57;
}

function getRandomNumber(max) {
  return Math.floor(Math.random() * max) + 1;
}

function incrementMoveCount() {
  moves += 1;
  movesBox.innerHTML = moves;
}

function resetMoveCount() {
  moves = 0;
  movesBox.innerHTML = moves;
}

function selectCell(num) {
  return document.getElementById('cell_' + num);
}
