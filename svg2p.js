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

function scope () {
    this._stack = [];
    this._topindex = -1;
    this._getIndex = function () { 
      if (this._topindex != (this._stack.length - 1)) {
        throw "glue: internal index error";
      };
      return this._topindex; 
    };
    this.put = function (key, val) {
	var i = this._getIndex ();
	this._stack[i][key] = val;
    };
    this.get = function (key) {
	var i = this._getIndex ();
	while (i >= 0) {
	    if (this._stack[i][key]) {
		return this._stack[i][key];
	    };
	    i -= 1;
	};
        console.log (this._stack);
        console.log (this._getIndex ());
	throw "scope: key [" + key.toString () +  "] not found";
    };
    this.push = function () { this._topindex += 1; this._stack.push ([]); };
    this.pop = function () { this._stack.pop (); this._topindex -= 1;};
};
var _gluescope = new scope ();


function addSemantics (sem) { 
  sem.addOperation (
'_glue', 
{

               htmlsvg : function (_ws,_docH,_htmlH,_bodyH,_elements,_bodyE,_htmlE) { 
                          _gluescope.push ();
                          
                          var ws = _ws._glue ().join ('');
var docH = _docH._glue ();
var htmlH = _htmlH._glue ();
var bodyH = _bodyH._glue ();
var elements = _elements._glue ().join ('');
var bodyE = _bodyE._glue ();
var htmlE = _htmlE._glue ();
                          return `${elements}`; 
                          _gluescope.pop ();
                        },
            
               htmlHeader : function (__,_ws) { 
                          _gluescope.push ();
                          
                          var _ = __._glue ();
var ws = _ws._glue ().join ('');
                          return `${_}${ws}`; 
                          _gluescope.pop ();
                        },
            
               htmlEnd : function (__,_ws) { 
                          _gluescope.push ();
                          
                          var _ = __._glue ();
var ws = _ws._glue ().join ('');
                          return `${_}${ws}`; 
                          _gluescope.pop ();
                        },
            
               bodyHeader : function (__,_ws) { 
                          _gluescope.push ();
                          
                          var _ = __._glue ();
var ws = _ws._glue ().join ('');
                          return `${_}${ws}`; 
                          _gluescope.pop ();
                        },
            
               bodyEnd : function (__,_ws) { 
                          _gluescope.push ();
                          
                          var _ = __._glue ();
var ws = _ws._glue ().join ('');
                          return `${_}${ws}`; 
                          _gluescope.pop ();
                        },
            
               docTypeHeader : function (__1,_stuff,__2,_ws) { 
                          _gluescope.push ();
                          
                          var _1 = __1._glue ();
var stuff = _stuff._glue ().join ('');
var _2 = __2._glue ();
var ws = _ws._glue ().join ('');
                          return `${_1}${stuff}${_2}${ws}`; 
                          _gluescope.pop ();
                        },
            
               element : function (_e) { 
                          _gluescope.push ();
                          
                          var e = _e._glue ();
                          return `${e}`; 
                          _gluescope.pop ();
                        },
            
               svgElement : function (__1,__2,_ws,_attributes,__5,__6,_elements,_text,__9,__10,__11,__12) { 
                          _gluescope.push ();
                           genid (); 
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
                          return ` svgbox(${id ()},"").
	     ${attributes}
	     ${elements}`; 
                          _gluescope.pop ();
                        },
            
               rectElement : function (__1,__2,_ws,_attributes,__5,__6,_elements,_text,__9,__10,__11,__12) { 
                          _gluescope.push ();
                           genid (); 
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
                          return `
     rect(${id ()},"").
     ${attributes}
     ${elements} `; 
                          _gluescope.pop ();
                        },
            
               textElement : function (__1,__2,_ws,_attributes,__5,__6,_elements,_text,__9,__10,__11,__12) { 
                          _gluescope.push ();
                           genid (); 
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
                          return ` 
       text(${id ()},"").
       ${attributes}
       ${elements}
       text(${id ()}, "${text}"). `; 
                          _gluescope.pop ();
                        },
            
               basicElement : function (__1,__2,_ws,_attributes,__5,__6,_elements,_text,__9,__10,__11,__12) { 
                          _gluescope.push ();
                          
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
                          return `${_1}${_2}${ws}${attributes}${_5}${_6}${elements}${text}${_9}${_10}${_11}${_12}`; 
                          _gluescope.pop ();
                        },
            
               attribute : function (_a) { 
                          _gluescope.push ();
                          
                          var a = _a._glue ();
                          return `${a}`; 
                          _gluescope.pop ();
                        },
            
               widthAttribute : function (__,__eq,_str,__ws) { 
                          _gluescope.push ();
                          
                          var _ = __._glue ();
var _eq = __eq._glue ();
var str = _str._glue ();
var _ws = __ws._glue ().join ('');
                          return `width(${id ()},${str}).\n`; 
                          _gluescope.pop ();
                        },
            
               heightAttribute : function (__,__eq,_str,__ws) { 
                          _gluescope.push ();
                          
                          var _ = __._glue ();
var _eq = __eq._glue ();
var str = _str._glue ();
var _ws = __ws._glue ().join ('');
                          return `height(${id ()},${str}).\n`; 
                          _gluescope.pop ();
                        },
            
               xAttribute : function (__,__eq,_str,__ws) { 
                          _gluescope.push ();
                          
                          var _ = __._glue ();
var _eq = __eq._glue ();
var str = _str._glue ();
var _ws = __ws._glue ().join ('');
                          return `x(${id ()},${str}).\n`; 
                          _gluescope.pop ();
                        },
            
               yAttribute : function (__,__eq,_str,__ws) { 
                          _gluescope.push ();
                          
                          var _ = __._glue ();
var _eq = __eq._glue ();
var str = _str._glue ();
var _ws = __ws._glue ().join ('');
                          return `y(${id ()},${str}).\n`; 
                          _gluescope.pop ();
                        },
            
               fillAttribute : function (__,__eq,_str,__ws) { 
                          _gluescope.push ();
                          
                          var _ = __._glue ();
var _eq = __eq._glue ();
var str = _str._glue ();
var _ws = __ws._glue ().join ('');
                          return `fill(${id ()},${str}).\n`; 
                          _gluescope.pop ();
                        },
            
               genericAttribute : function (__,__eq,_str,__ws) { 
                          _gluescope.push ();
                          
                          var _ = __._glue ();
var _eq = __eq._glue ();
var str = _str._glue ();
var _ws = __ws._glue ().join ('');
                          return `%\n`; 
                          _gluescope.pop ();
                        },
            
               text : function (_x) { 
                          _gluescope.push ();
                          
                          var x = _x._glue ();
                          return `${x}`; 
                          _gluescope.pop ();
                        },
            
               name : function (_c,_cs) { 
                          _gluescope.push ();
                          
                          var c = _c._glue ();
var cs = _cs._glue ().join ('');
                          return `${c}${cs}`; 
                          _gluescope.pop ();
                        },
            
               name1st : function (_c) { 
                          _gluescope.push ();
                          
                          var c = _c._glue ();
                          return `${c}`; 
                          _gluescope.pop ();
                        },
            
               nameFollow : function (_c) { 
                          _gluescope.push ();
                          
                          var c = _c._glue ();
                          return `${c}`; 
                          _gluescope.pop ();
                        },
            
               stuff : function (_c) { 
                          _gluescope.push ();
                          
                          var c = _c._glue ();
                          return `${c}`; 
                          _gluescope.pop ();
                        },
            
               string : function (__1,_cs,__2) { 
                          _gluescope.push ();
                          
                          var _1 = __1._glue ();
var cs = _cs._glue ().join ('');
var _2 = __2._glue ();
                          return `"${cs}"`; 
                          _gluescope.pop ();
                        },
            
               notQ : function (_c) { 
                          _gluescope.push ();
                          
                          var c = _c._glue ();
                          return `${c}`; 
                          _gluescope.pop ();
                        },
            
               ws : function (_c) { 
                          _gluescope.push ();
                          
                          var c = _c._glue ();
                          return `${c}`; 
                          _gluescope.pop ();
                        },
            
_terminal: function () { return this.primitiveValue; }
}); 
}




function main () {
    // usage: svg2p.js <file
    // reads grammar from "svg.ohm" 
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
