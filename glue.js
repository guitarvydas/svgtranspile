// npm install ohm-js
'use strict';

const grammar =
      `
SemanticsSCL {
  Semantics = SemanticsStatement+
  SemanticsStatement = RuleName "[" Parameters "]" "=" code? rewrites

  RuleName = letter1 letterRest*
  
  Parameters = Parameter*
  Parameter = treeparameter | flatparameter
  flatparameter = fpws | fpd
  fpws = pname ws+
  fpd = pname delimiter
  treeparameter = "@" tflatparameter
  tflatparameter = tfpws | tfpd
  tfpws = pname ws+
  tfpd = pname delimiter

  pname = letterRest letterRest*
  rewrites = rw1 | rw2
  rw1 = "[[" rwstringWithNewlines "]]"
  rw2 = rwstring

  letter1 = "_" | "a" .. "z" | "A" .. "Z"
  letterRest = "0" .. "9" | letter1

  ws = "\\n" | " " | "\\t" | "," 
  delimiter = &"]" | &"="

  rwstring = stringchar*
  stringchar = ~"\\n" any

  rwstringWithNewlines = nlstringchar*
  nlstringchar = ~"]]" ~"}}" any
  code = "{{" codeString "}}"
  codeString = rwstringWithNewlines

}
`;


function ohm_parse (grammar, text) {
    var ohm = require ('ohm-js');
    var parser = ohm.grammar (grammar);
    var cst = parser.match (text);
    if (cst.succeeded ()) {
	return { parser: parser, cst: cst };
    } else {
	console.log (parser.trace (text).toString ());
	throw "glue: Ohm matching failed";
    }
}

function getNamedFile (fname) {
    var fs = require ('fs');
    if (fname === undefined || fname === null || fname === "-") {
	return fs.readFileSync (0, 'utf-8');
    } else {
	return fs.readFileSync (fname, 'utf-8');
    }	
}

var varNameStack = [];

function addSemantics (sem) {
    sem.addOperation ('_glue', {
	
	Semantics: function (_1s) { 
	    var __1 = _1s._glue ().join (''); 
	    return `
function addSemantics (sem) { 
  sem.addOperation (
'_glue', 
{
${__1}
_terminal: function () { return this.primitiveValue; }
}); 
}`; 
	},
	SemanticsStatement: function (_1, _2, _3, _4, _5, _6s, _7) {
	    varNameStack = [];
	    var __1 = _1._glue ();
	    var __2 = _2._glue ();
	    var __3 = _3._glue ();
	    var __4 = _4._glue ();
	    var __5 = _5._glue ();
	    var __6s = _6s._glue ().join ('');
	    var __7 = _7._glue ();
	    return `
               ${__1} : function (${__3}) { 
                          _ruleEnter ("${__1}");
                          ${__6s}
                          ${varNameStack.join ('\n')}
                          _ruleExit ("${__1}");
                          return \`${__7}\`; 
                        },
            `;
	},
	RuleName: function (_1, _2s) { var __1 = _1._glue (); var __2s = _2s._glue ().join (''); return __1 + __2s; },
	Parameters: function (_1s) {  var __1s = _1s._glue ().join (','); return __1s; },
	
	Parameter: function (_1) { 
	    var __1 = _1._glue ();
	    return `${__1}`;
	},
	flatparameter: function (_1) { 
	    var __1 = _1._glue (); 
	    varNameStack.push (`var ${__1} = _${__1}._glue ();`);
	    return `_${__1}`;
	},
	fpws: function (_1, _2s) { var __1 = _1._glue (); var __2s = _2s._glue ().join (''); return __1; },
	fpd: function (_1, _2) { var __1 = _1._glue (); var __2 = _2._glue (); return __1; },
	
	treeparameter: function (_1, _2) { 
	    var __1 = _1._glue (); 
	    var __2 = _2._glue (); 
	    varNameStack.push (`var ${__2} = _${__2}._glue ().join ('');`);
	    return `_${__2}`; 
	},
	tflatparameter: function (_1) { 
	    var __1 = _1._glue (); 
	    return `${__1}`;
	},
	tfpws: function (_1, _2s) { var __1 = _1._glue (); var __2s = _2s._glue ().join (''); return __1; },
	tfpd: function (_1, _2) { var __1 = _1._glue (); var __2 = _2._glue (); return __1; },

	pname: function (_1, _2s) { var __1 = _1._glue (); var __2s = _2s._glue ().join (''); return __1 + __2s;},
	rewrites: function (_1) { var __1 = _1._glue (); return __1; },
	rw1: function (_1, _2, _3) { var __2 = _2._glue (); return __2; },
	rw2: function (_1) { var __1 = _1._glue (); return __1; },
	letter1: function (_1) { var __1 = _1._glue (); return __1; },
	letterRest: function (_1) { var __1 = _1._glue (); return __1; },

	ws: function (_1) { var __1 = _1._glue (); return __1; },
	delimiter: function (_1) { return ""; },

	rwstring: function (_1s) { var __1s = _1s._glue ().join (''); return __1s; },
	stringchar: function (_1) { var __1 = _1._glue (); return __1; },
	rwstringWithNewlines: function (_1s) { var __1s = _1s._glue ().join (''); return __1s; },
	nlstringchar: function (_1) { var __1 = _1._glue (); return __1; },

	code: function (_1, _2, _3) { return _2._glue (); },
	codeString: function (_1) { return _1._glue (); },

	_terminal: function () { return this.primitiveValue; }
    });
}

function main () {
    // usage: node glue <file
    // reads grammar from "glue.ohm" 
    var text = getNamedFile ("-");
    var { parser, cst } = ohm_parse (grammar, text);
    var sem = {};
    var outputString = "";
    if (cst.succeeded ()) {
	sem = parser.createSemantics ();
	addSemantics (sem);
	outputString = sem (cst)._glue ();
    }
    return { cst: cst, semantics: sem, resultString: outputString };
}


var { cst, semantics, resultString } = main ();
console.log(`'use strict'`);
console.log(`
var _scope;

function scopeStack () {
    this._stack = [];
    this.pushNew = function () {this._stack.push ([])};
    this.pop = function () {this._stack.pop ()};
    this._topIndex = function () {return this._stack.length - 1;};
    this._top = function () { return this._stack[this._topIndex ()]; };
    this.scopeAdd = function (key, val) {
	this._top ().push ({key: key, val: val});
    };
    this._lookup = function (key, a) { 
      return a.find (obj => {return obj && obj.key && (obj.key == key)}); };
    this.scopeGet = function (key) {
	var i = this._topIndex ();
	for (; i > 0 ; i -= 1) {
	    var obj = this._lookup (key, this._stack [i]);
	    if (obj) {
		return obj.val;
	    };
	};
	console.log (this._stack);
	console.log (key);
	throw "scopeGet internal error";
    };
    this.scopeModify = function (key, val) {
	var i = this._topIndex ();
	for (; i > 0 ; i -= 1) {
	    var obj = this._lookup (key, this._stack [i]);
	    if (obj) {
              obj.val = val;
              return val;
	    };
	};
	console.log (this._stack);
	console.log (key);
	throw "scopeModify internal error";
    };
}

function scopeAdd (key, val) {
  return _scope.scopeAdd (key, val);
}

function scopeModify (key, val) {
  return _scope.scopeModify (key, val);
}

function scopeGet (key, val) {
  return _scope.scopeGet (key, val);
}

function _ruleInit () {
    _scope = new scopeStack ();
}

function _ruleEnter (ruleName) {
    _scope.pushNew ();
}

function _ruleExit (ruleName) {
    _scope.pop ();
}
`);
console.log('_ruleInit ();');
console.log (resultString);
