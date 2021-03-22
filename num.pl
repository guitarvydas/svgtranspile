
xc(ID,X,Xstr) :- x_str(ID,Xstr),number_string(X,Xstr).
yc(ID,Y,Ystr) :- y_str(ID,Ystr),number_string(Y,Ystr).
widthc(ID,W,Wstr) :- width_str(ID,Wstr),number_string(W,Wstr).
heightc(ID,H,Hstr) :- height_str(ID,Hstr),number_string(H,Hstr).


main :-
    forall(xc(ID,X,_),writef("x(%w,%w).\n",[ID,X])),
    forall(yc(ID,X,_),writef("y(%w,%w).\n",[ID,X])),
    forall(widthc(ID,X,_),writef("width(%w,%w).\n",[ID,X])),
    forall(heightc(ID,X,_),writef("height(%w,%w).\n",[ID,X])).
