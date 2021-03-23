usedText(TID) :-
    nameOf(TID,_),!. % ok
usedText(TID) :-
    string(TID,STR),
    writef("error: name not contained by any shape: $%w, (\"%w\")\n", [TID,STR]).

designRuleUncontainedNames :-
    forall(text(ID,_),usedText(ID)).
