% svg objects that have no X and Y are defined to be at (0,0)

left(ID,X) :- x(ID,X),!.
left(_,0).
top(ID,Y) :- x(ID,Y),!.
top(_,0).

bb(ID,Left,Top,Right,Bottom) :-
    width(ID,W),
    height(ID,H),
    left(ID,Left),
    top(ID,Top),
    Right is Left + W,
    Bottom is Top + H.

displayTerm(Term) :- write_canonical(Term),writef(".",_),nl.

writeBoundingBox(ID,L,T,R,B) :-
    displayTerm(bbleft(ID,L)),
    displayTerm(bbtop(ID,T)),
    displayTerm(bbright(ID,R)),
    displayTerm(bbbottom(ID,B)).

main :-
    forall(bb(ID,L,T,R,B),writeBoundingBox(ID,L,T,R,B)).
