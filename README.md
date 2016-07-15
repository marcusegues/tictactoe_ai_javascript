# tictactoe_ai_javascript

Though the AI behaves correctly (never loses), there is one further improvement to make:
- when the user makes a mistake, the AI chooses the first move it encounters that will lead to a sure victory for the AI. However, his move may not lead to the victory in the shortest number of moves, leading the AI to sometimes not choose an obvious immediate victory and instead go for a victory two moves ahead. 
- this can be solved by augmenting the tree structure with heights for the nodes, and then testing for the shortest path to victory.
