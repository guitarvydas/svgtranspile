usedText(TID) :-
    name(Shape,TID),!. % ok
usedText(TID) :-
    string(TID,STR),
    writef("error: name not contained by any shape: $%w, (\"%w\")\n", [TID,STR]).
