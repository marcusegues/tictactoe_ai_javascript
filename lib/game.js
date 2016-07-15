(function() {
if (typeof TicTacToe === "undefined") {
  window.TicTacToe = {}; // namespace for the game
}

var Game = window.TicTacToe.Game = function() {
  this.initialMove = true;
  this.processingClick = false;
};

Game.prototype.calculateAllPossibleGames = function() {
  for (var initialPosition = 0; initialPosition <= 8; initialPosition++) {
    this.root = new window.TicTacToe.Node(0, window.TicTacToe.Constants.positions[initialPosition], "white");
    this.root.buildTree();
  }
  console.log(this.root.whiteWins, this.root.blackWins, this.root.draws);
};

Game.prototype.buildTreeFromInitialMove = function(initialPosition) {
  this.root = new window.TicTacToe.Node(0, window.TicTacToe.Constants.positions[initialPosition], "white");
  this.root.buildTree();
};

Game.prototype.moveUserIfValid = function(position) {
  var nextMoves = this.root.nextMoves();
  var nextNodeIdx = nextMoves.indexOf(position);
  if (nextNodeIdx !== -1) {
    this.root = this.root.adjacent[nextNodeIdx];
    return true;
  }
  return false;
},

Game.prototype.receiveUserMove = function(position) {
  if (this.initialMove === true) {
    this.buildTreeFromInitialMove(position);
    this.initialMove = false;
    return true;
  } else {
    return this.moveUserIfValid(position);
  }
};

Game.prototype.nextAIMove = function() {
  var adjacentNodes = this.root.adjacent;
  for (var nextNodeIdx = 0; nextNodeIdx < adjacentNodes.length; nextNodeIdx++) {
    var nextNode = adjacentNodes[nextNodeIdx];
    if (nextNode.pathToVictory === true) {
      var aiCellIdx = this.root.nextMoves()[nextNodeIdx];  // index of the cell the AI chose
      this.root = nextNode;
      return aiCellIdx;
    }
  }

  for (var nextNodeIdx = 0; nextNodeIdx < adjacentNodes.length; nextNodeIdx++) {
    var nextNode = adjacentNodes[nextNodeIdx];
    if (nextNode.adjacent.every(function(nextNextNode) {
      return !nextNextNode.pathToVictory;
    })) {
      var aiCellIdx = this.root.nextMoves()[nextNodeIdx];  // index of the cell the AI chose
      this.root = nextNode;
      return aiCellIdx;
    }
  }

};

Game.prototype.setEventListeners = function() {
  var cells = document.querySelectorAll('.cell');
  cells.forEach(function(cell, position) {
    cell.onclick = function() {
      if (this.processingClick === true) {
        return;
      }
      this.processingClick = true;
      var userMoved = this.receiveUserMove(position);
      if (userMoved === true) {
        cell.textContent = this.root.currentSymbol();
        var aiCellIdx = this.nextAIMove();
        cells[aiCellIdx].textContent = this.root.currentSymbol();
      }
      this.processingClick = false;
    }.bind(this);
  }.bind(this));
};

var game = new Game();
game.setEventListeners();

})();
