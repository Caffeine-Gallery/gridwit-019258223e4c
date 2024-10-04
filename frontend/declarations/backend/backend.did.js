export const idlFactory = ({ IDL }) => {
  const Puzzle = IDL.Record({
    'grid' : IDL.Vec(IDL.Vec(IDL.Opt(IDL.Nat32))),
    'downClues' : IDL.Vec(IDL.Tuple(IDL.Nat, IDL.Text)),
    'acrossClues' : IDL.Vec(IDL.Tuple(IDL.Nat, IDL.Text)),
  });
  return IDL.Service({
    'checkSolution' : IDL.Func(
        [IDL.Vec(IDL.Vec(IDL.Opt(IDL.Nat32)))],
        [IDL.Bool],
        ['query'],
      ),
    'getRandomPuzzle' : IDL.Func([], [Puzzle], []),
  });
};
export const init = ({ IDL }) => { return []; };
