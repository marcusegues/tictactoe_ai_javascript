(function() {
if (typeof TicTacToe === "undefined") {
  window.TicTacToe = {}; // namespace for the game
}

var positions = {};
var winningPositions = ["111000000",
                        "000111000",
                        "000000111",
                        "100100100",
                        "010010010",
                        "001001001",
                        "100010001",
                        "001010100"].map(function(bits) {
                          return parseInt(bits, 2);
                        });

for (var pos = 0; pos <= 8; pos++) {
  positions[pos] = Math.pow(2, pos);
}

window.TicTacToe.Constants = {
  positions: positions,
  winningPositions: winningPositions
};

})();
