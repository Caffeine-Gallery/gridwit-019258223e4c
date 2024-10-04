import Bool "mo:base/Bool";
import Char "mo:base/Char";
import Func "mo:base/Func";

import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Nat8 "mo:base/Nat8";
import Option "mo:base/Option";
import Random "mo:base/Random";
import Text "mo:base/Text";

actor Crossword {
  // Define the structure for a crossword puzzle
  type Puzzle = {
    grid : [[?Char]];
    acrossClues : [(Nat, Text)];
    downClues : [(Nat, Text)];
  };

  // Sample puzzles (we'll start with just one for simplicity)
  stable var puzzles : [Puzzle] = [
    {
      grid = [
        [?'C', ?'A', ?'T'],
        [?'O', null, ?'E'],
        [?'W', ?'E', ?'T']
      ];
      acrossClues = [
        (1, "Feline pet"),
        (4, "Opposite of off"),
        (5, "Not dry")
      ];
      downClues = [
        (1, "Bovine animal"),
        (2, "At no time"),
        (3, "Beverage")
      ];
    }
  ];

  // Function to get a random puzzle
  public func getRandomPuzzle() : async Puzzle {
    let blob = await Random.blob();
    let randomGenerator = Random.Finite(blob);
    let puzzleCount = puzzles.size();
    if (puzzleCount == 0) {
      return {
        grid = [];
        acrossClues = [];
        downClues = [];
      };
    };
    let randomIndexOpt = if (puzzleCount > 255) {
      randomGenerator.range(255)
    } else {
      randomGenerator.range(Nat8.fromNat(puzzleCount))
    };
    let index = Option.get(randomIndexOpt, 0);
    puzzles[Nat.min(index, puzzleCount - 1)]
  };

  // Function to check if a solution is correct
  public query func checkSolution(solution : [[?Char]]) : async Bool {
    let puzzle = puzzles[0]; // For now, we're just using the first puzzle
    
    for (i in Iter.range(0, puzzle.grid.size() - 1)) {
      for (j in Iter.range(0, puzzle.grid[i].size() - 1)) {
        switch (puzzle.grid[i][j], solution[i][j]) {
          case (?expected, ?submitted) {
            if (expected != submitted) {
              return false;
            };
          };
          case (null, null) {};
          case (_, _) {
            return false;
          };
        };
      };
    };
    
    true
  };
}
