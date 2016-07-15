
var Game = {
  board: [0, 0, 0, 0, 0, 0, 0, 0, 0]
};

var cells = document.querySelectorAll('.cell');

var player = [1,2];
var turn = 0;

cells.forEach(function(cell, idx) {
  cell.onclick = function(e) {
    if (Game.board[idx] != 0) {
      return;
    }
    Game.board[idx] = player[turn % 2];
    cell.textContent = Game.board[idx];
    if (gamewon(player[turn % 2])) {
      alert("won");
    }
    turn += 1;
  };
});

var gamewon = function(playerTurn) {
  var b = Game.board;

  if (b[0] === playerTurn && b[1] === playerTurn && b[2] === playerTurn) {
    return true;
  }

  if (b[3] === playerTurn && b[4] === playerTurn && b[5] === playerTurn) {
    return true;
  }

  if (b[6] === playerTurn && b[7] === playerTurn && b[8] === playerTurn) {
    return true;
  }

  if (b[0] === playerTurn && b[3] === playerTurn && b[6] === playerTurn) {
    return true;
  }

  if (b[1] === playerTurn && b[4] === playerTurn && b[7] === playerTurn) {
    return true;
  }

  if (b[2] === playerTurn && b[5] === playerTurn && b[8] === playerTurn) {
    return true;
  }

  if (b[0] === playerTurn && b[4] === playerTurn && b[8] === playerTurn) {
    return true;
  }

  if (b[2] === playerTurn && b[4] === playerTurn && b[6] === playerTurn) {
    return true;
  }

  return false;
};
