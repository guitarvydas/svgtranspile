'use strict';

var _id;

function init_id () {
    if (_id) {
    } else {
	_id = 0;
    };
}

function genid () {
    init_id ();
    _id += 1;
    _gluescope.put ("id", "id" + _id.toString ());
    return "";
}

function id () {
    return _gluescope.get ("id");
}
