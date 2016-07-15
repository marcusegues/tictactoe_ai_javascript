(function() {
if (typeof TicTacToe === "undefined") {
  window.TicTacToe = {}; // namespace for the game
}

window.TicTacToe.GameCounts = {
  blackWins: 0,
  whiteWins: 0,
  draws: 0
};

var Node = window.TicTacToe.Node = function(black, white, color, adjacent) {
  // default values for parameters
  black = typeof black !== 'undefined' ? black : 0;
  white = typeof white !== 'undefined' ? white : 0;
  color = typeof color !== 'undefined' ? color : "white";
  adjacent = typeof adjacent !== 'undefined' ? adjacent : [];

  this.black = black;
  this.white = white;
  this.color = color;
  this.adjacent = adjacent;
  this.won = this.gameWon(this.currentPlayerPosition());
};

Node.prototype.currentPlayerPosition = function() {
  return this.color === "white" ? this.white : this.black;
};

Node.prototype.currentSymbol = function() {
  return this.color === "white" ? 'O' : 'X';
};

Node.prototype.nextMoves = function() {
  var bits = ~(this.black | this.white);
  var possibleMoves = [];
  for(var pos = 0; pos <= 8; pos++) {
    var mask = 1 << pos;
    if ((mask & bits) !== 0) {
      possibleMoves.push(pos);
    }
  }
  return possibleMoves;
};

Node.prototype.draw = function() {
  return (!this.won && (this.nextMoves().length === 0));
};

Node.prototype.winningPosition = function() {
  var currentPlayedPosition = this.currentPlayerPosition();
  var winningPositions = window.TicTacToe.Constants.winningPositions;
  for (var i = 0; i < winningPositions.length; i++) {
    var winningPosition = winningPositions[i];
    if ((winningPosition & currentPlayedPosition) === winningPosition) {
      return winningPosition;
    }
  }
};

Node.prototype.gameWon = function(currentPlayedPosition) {
  var won = false;
  window.TicTacToe.Constants.winningPositions.forEach(function(winningPosition) {
    if ((winningPosition & currentPlayedPosition) === winningPosition) {
      won = true;
    }
  });
  return won;
};

Node.prototype.nextPlayerColor = function() {
  if (this.color === "black") {
    return "white";
  }
  return "black";
};

Node.prototype.simulateMove = function(currentMoves, newMove) {
  return (currentMoves | newMove);
};

Node.prototype.updateGameCounts = function() {
  if (this.won && this.color === "black") {
    window.TicTacToe.GameCounts.blackWins += 1;
  } else if (this.won && this.color === "white") {
    window.TicTacToe.GameCounts.whiteWins += 1;
  } else if (!this.won && this.draw()) {
    window.TicTacToe.GameCounts.draws += 1;
  }
};

Node.prototype.displayBoard = function() {
  var board = new Array(9);
  for (var i = 0; i < board.length; i++) {
    board[i] = "_";
  }
  for(var pos = 8; pos >= 0; pos--) {
    var mask = 1 << pos;
    if ((mask & this.black) !== 0) {
      board[pos] = "x";
    }

    if ((mask & this.white) !== 0) {
      board[pos] = "o";
    }
  }
  console.log(board[0], board[1], board[2]);
  console.log(board[3], board[4], board[5]);
  console.log(board[6], board[7], board[8]);
};

Node.prototype.buildTree = function() {
  var pathsToVictoryOnNextCurrentPlayerMove = undefined;
  if (!(this.won || this.draw())) {
    pathsToVictoryOnNextCurrentPlayerMove = [];
    this.nextMoves().forEach(function(move) {
      var newNode = new Node(
        this.nextPlayerColor() === "black" ? this.simulateMove(this.black, window.TicTacToe.Constants.positions[move]) : this.black,
        this.nextPlayerColor() === "white" ? this.simulateMove(this.white, window.TicTacToe.Constants.positions[move]) : this.white,
        this.nextPlayerColor()
      );
      this.adjacent.push(newNode);
      pathsToVictoryOnNextCurrentPlayerMove.push(newNode.buildTree());
    }.bind(this));
  }

  if (this.won === true) {
    this.pathToVictory = true;
  } else {
    if (pathsToVictoryOnNextCurrentPlayerMove !== undefined) {
      this.pathToVictory = pathsToVictoryOnNextCurrentPlayerMove.every(function(el) {
        return el === true;
      });
    } else {
      this.pathToVictory = false;
    }
  }

  this.updateGameCounts();

  return this.adjacent.some(function(node) {
    return node.pathToVictory;
  });

};

})();
