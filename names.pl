%% ID contains text TID if
%% a) ID is a shape
%% b) TID is a text object
%% c) TID(x,y) is contained in the bounding box of ID

%% ID is the Smallest Containing Box for text TID if
%% a) ID contains TID
%% b) there is no other bounding Box ID2, with area smaller than ID's bounding box that also contains text TID	 

%% Name of ID is TID if
%% b) ID is a shape
%% c) TID is a text object
%% a) ID is the Smallest Containing Box for text TID

%:- debug.

containsText(ID,TID) :-
    shape(ID),
    textObject(TID),
    pointContainedInBB(TID,ID).

smallestEnclosingShape(ID,TID) :-
    containsText(ID,TID),
    containsText(ID2,TID),
    smallerBB(ID,ID2),!.
smallestEnclosingShape(ID,TID) :-
    containsText(ID,TID).


name(ID,TID) :-
    shape(ID),
    textObject(TID),
    smallestEnclosingShape(ID,TID).

namestr(ID,Str) :-
    name(ID,TID),
    string(TID,Str).


shape(ID) :-
    rect(ID,_).

textObject(ID) :-
    text(ID,_).

smallerBB(ID1,ID2) :- % succeed if area(ID1) <= area(ID2)
    shape(ID1),
    shape(ID2),
    area(ID1,A1),
    area(ID2,A2),
    A1 =< A2.

area(ID,Area) :-
    shape(ID),
    bb(ID,L,T,R,B),
    Xdelta is abs(R - L),
    Ydelta is abs(B - T),
    Area is Xdelta * Ydelta.

pointContainedInBB(IDpointObject, IDBBobject) :-
    x(IDpointObject,X),
    y(IDpointObject,Y),
    bbleft(IDBBobject,L),
    bbtop(IDBBobject,T),
    bbright(IDBBobject,R),
    bbbottom(IDBBobject,B),
    L =< X, X =< R,
    T =< Y, Y =< B.

bb(ID,L,T,R,B) :-
    bbleft(ID,L),
    bbtop(ID,T),
    bbright(ID,R),
    bbbottom(ID,B).

writeName(ID,Str) :- writef("name(%w,\"%w\").\n",[ID,Str]).

main :-
    forall(namestr(ID,Str),writeName(ID,Str)).
