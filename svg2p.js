// npm install ohm-js

function ohm_parse (grammar, text) {
    var ohm = require ('ohm-js');
    var parser = ohm.grammar (grammar);
    var cst = parser.match (text);
    if (cst.succeeded ()) {
	return { parser: parser, cst: cst };
    } else {
	console.log (parser.trace (text).toString ());
	throw "svg2p: Ohm matching failed";
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
'use strict'

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

_ruleInit ();

function addSemantics (sem) { 
  sem.addOperation (
'_glue', 
{

               htmlsvg : function (_ws,_docH,_htmlH,_bodyH,_elements,_bodyE,_htmlE) { 
                          _ruleEnter ("htmlsvg");
                          
                          var ws = _ws._glue ().join ('');
var docH = _docH._glue ();
var htmlH = _htmlH._glue ();
var bodyH = _bodyH._glue ();
var elements = _elements._glue ().join ('');
var bodyE = _bodyE._glue ();
var htmlE = _htmlE._glue ();
                          _ruleExit ("htmlsvg");
                          return `${elements}`; 
                        },
            
               htmlHeader : function (__,_ws) { 
                          _ruleEnter ("htmlHeader");
                          
                          var _ = __._glue ();
var ws = _ws._glue ().join ('');
                          _ruleExit ("htmlHeader");
                          return `${_}${ws}`; 
                        },
            
               htmlEnd : function (__,_ws) { 
                          _ruleEnter ("htmlEnd");
                          
                          var _ = __._glue ();
var ws = _ws._glue ().join ('');
                          _ruleExit ("htmlEnd");
                          return `${_}${ws}`; 
                        },
            
               bodyHeader : function (__,_ws) { 
                          _ruleEnter ("bodyHeader");
                          
                          var _ = __._glue ();
var ws = _ws._glue ().join ('');
                          _ruleExit ("bodyHeader");
                          return `${_}${ws}`; 
                        },
            
               bodyEnd : function (__,_ws) { 
                          _ruleEnter ("bodyEnd");
                          
                          var _ = __._glue ();
var ws = _ws._glue ().join ('');
                          _ruleExit ("bodyEnd");
                          return `${_}${ws}`; 
                        },
            
               docTypeHeader : function (__1,_stuff,__2,_ws) { 
                          _ruleEnter ("docTypeHeader");
                          
                          var _1 = __1._glue ();
var stuff = _stuff._glue ().join ('');
var _2 = __2._glue ();
var ws = _ws._glue ().join ('');
                          _ruleExit ("docTypeHeader");
                          return `${_1}${stuff}${_2}${ws}`; 
                        },
            
               element : function (_e) { 
                          _ruleEnter ("element");
                          
                          var e = _e._glue ();
                          _ruleExit ("element");
                          return `${e}`; 
                        },
            
               svgElement : function (__1,__2,_ws,_attributes,__5,__6,_elements,_text,__9,__10,__11,__12) { 
                          _ruleEnter ("svgElement");
                           var name = "svg"; scopeAdd ("path", name); scopeAdd ("counter", 0); 
                          var _1 = __1._glue ();
var _2 = __2._glue ();
var ws = _ws._glue ().join ('');
var attributes = _attributes._glue ().join ('');
var _5 = __5._glue ();
var _6 = __6._glue ().join ('');
var elements = _elements._glue ().join ('');
var text = _text._glue ().join ('');
var _9 = __9._glue ();
var _10 = __10._glue ();
var _11 = __11._glue ();
var _12 = __12._glue ().join ('');
                          _ruleExit ("svgElement");
                          return ` svgbox(${name},"").
	     ${attributes}
	     ${elements}`; 
                        },
            
               rectElement : function (__1,__2,_ws,_attributes,__5,__6,_elements,_text,__9,__10,__11,__12) { 
                          _ruleEnter ("rectElement");
                           var name = scopeGet ("path") + "_rect_" + gen (); scopeAdd ("path", name); 
                          var _1 = __1._glue ();
var _2 = __2._glue ();
var ws = _ws._glue ().join ('');
var attributes = _attributes._glue ().join ('');
var _5 = __5._glue ();
var _6 = __6._glue ().join ('');
var elements = _elements._glue ().join ('');
var text = _text._glue ().join ('');
var _9 = __9._glue ();
var _10 = __10._glue ();
var _11 = __11._glue ();
var _12 = __12._glue ().join ('');
                          _ruleExit ("rectElement");
                          return `
     rect(${name},"").
     ${attributes}
     ${elements} `; 
                        },
            
               textElement : function (__1,__2,_ws,_attributes,__5,__6,_elements,_text,__9,__10,__11,__12) { 
                          _ruleEnter ("textElement");
                           var name = scopeGet ("path") + "_text_" + gen (); scopeAdd ("path", name); 
                          var _1 = __1._glue ();
var _2 = __2._glue ();
var ws = _ws._glue ().join ('');
var attributes = _attributes._glue ().join ('');
var _5 = __5._glue ();
var _6 = __6._glue ().join ('');
var elements = _elements._glue ().join ('');
var text = _text._glue ().join ('');
var _9 = __9._glue ();
var _10 = __10._glue ();
var _11 = __11._glue ();
var _12 = __12._glue ().join ('');
                          _ruleExit ("textElement");
                          return ` 
       text(${name},"").
       ${attributes}
       ${elements}
       string(${name}, "${text}"). `; 
                        },
            
               basicElement : function (__1,__2,_ws,_attributes,__5,__6,_elements,_text,__9,__10,__11,__12) { 
                          _ruleEnter ("basicElement");
                          
                          var _1 = __1._glue ();
var _2 = __2._glue ();
var ws = _ws._glue ().join ('');
var attributes = _attributes._glue ().join ('');
var _5 = __5._glue ();
var _6 = __6._glue ().join ('');
var elements = _elements._glue ().join ('');
var text = _text._glue ().join ('');
var _9 = __9._glue ();
var _10 = __10._glue ();
var _11 = __11._glue ();
var _12 = __12._glue ().join ('');
                          _ruleExit ("basicElement");
                          return `${_1}${_2}${ws}${attributes}${_5}${_6}${elements}${text}${_9}${_10}${_11}${_12}`; 
                        },
            
               attribute : function (_a) { 
                          _ruleEnter ("attribute");
                          
                          var a = _a._glue ();
                          _ruleExit ("attribute");
                          return `${a}`; 
                        },
            
               widthAttribute : function (__,__eq,_str,__ws) { 
                          _ruleEnter ("widthAttribute");
                          
                          var _ = __._glue ();
var _eq = __eq._glue ();
var str = _str._glue ();
var _ws = __ws._glue ().join ('');
                          _ruleExit ("widthAttribute");
                          return `width(${scopeGet ("path")},${str}).\n`; 
                        },
            
               heightAttribute : function (__,__eq,_str,__ws) { 
                          _ruleEnter ("heightAttribute");
                          
                          var _ = __._glue ();
var _eq = __eq._glue ();
var str = _str._glue ();
var _ws = __ws._glue ().join ('');
                          _ruleExit ("heightAttribute");
                          return `height(${scopeGet ("path")},${str}).\n`; 
                        },
            
               xAttribute : function (__,__eq,_str,__ws) { 
                          _ruleEnter ("xAttribute");
                          
                          var _ = __._glue ();
var _eq = __eq._glue ();
var str = _str._glue ();
var _ws = __ws._glue ().join ('');
                          _ruleExit ("xAttribute");
                          return `x(${scopeGet ("path")},${str}).\n`; 
                        },
            
               yAttribute : function (__,__eq,_str,__ws) { 
                          _ruleEnter ("yAttribute");
                          
                          var _ = __._glue ();
var _eq = __eq._glue ();
var str = _str._glue ();
var _ws = __ws._glue ().join ('');
                          _ruleExit ("yAttribute");
                          return `y(${scopeGet ("path")},${str}).\n`; 
                        },
            
               fillAttribute : function (__,__eq,_str,__ws) { 
                          _ruleEnter ("fillAttribute");
                          
                          var _ = __._glue ();
var _eq = __eq._glue ();
var str = _str._glue ();
var _ws = __ws._glue ().join ('');
                          _ruleExit ("fillAttribute");
                          return `fill(${scopeGet ("path")},${str}).\n`; 
                        },
            
               genericAttribute : function (__,__eq,_str,__ws) { 
                          _ruleEnter ("genericAttribute");
                          
                          var _ = __._glue ();
var _eq = __eq._glue ();
var str = _str._glue ();
var _ws = __ws._glue ().join ('');
                          _ruleExit ("genericAttribute");
                          return `%\n`; 
                        },
            
               text : function (_x) { 
                          _ruleEnter ("text");
                          
                          var x = _x._glue ();
                          _ruleExit ("text");
                          return `${x}`; 
                        },
            
               name : function (_c,_cs) { 
                          _ruleEnter ("name");
                          
                          var c = _c._glue ();
var cs = _cs._glue ().join ('');
                          _ruleExit ("name");
                          return `${c}${cs}`; 
                        },
            
               name1st : function (_c) { 
                          _ruleEnter ("name1st");
                          
                          var c = _c._glue ();
                          _ruleExit ("name1st");
                          return `${c}`; 
                        },
            
               nameFollow : function (_c) { 
                          _ruleEnter ("nameFollow");
                          
                          var c = _c._glue ();
                          _ruleExit ("nameFollow");
                          return `${c}`; 
                        },
            
               stuff : function (_c) { 
                          _ruleEnter ("stuff");
                          
                          var c = _c._glue ();
                          _ruleExit ("stuff");
                          return `${c}`; 
                        },
            
               string : function (__1,_cs,__2) { 
                          _ruleEnter ("string");
                          
                          var _1 = __1._glue ();
var cs = _cs._glue ().join ('');
var _2 = __2._glue ();
                          _ruleExit ("string");
                          return `"${cs}"`; 
                        },
            
               notQ : function (_c) { 
                          _ruleEnter ("notQ");
                          
                          var c = _c._glue ();
                          _ruleExit ("notQ");
                          return `${c}`; 
                        },
            
               ws : function (_c) { 
                          _ruleEnter ("ws");
                          
                          var c = _c._glue ();
                          _ruleExit ("ws");
                          return `${c}`; 
                        },
            
_terminal: function () { return this.primitiveValue; }
}); 
}




function main () {
    // usage: svg2p.js <file
    // reads grammar from "svg.ohm" 
    _ruleInit ();
    var text = getNamedFile ("-");
    var grammar = getNamedFile ("svg.ohm");
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
process.stdout.write(resultString);
'use strict';
// empty

function gen () {
    var i = scopeGet ("counter");
    scopeModify ("counter", i + 1);
    return i.toString ();
}
