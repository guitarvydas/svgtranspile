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
    _glueDynamicScope.put ("id", "id" + _id.toString ());
    return "";
}

function id () {
    init_id ();
    return _glueDynamicScope.get ("id");
}
