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
    this._namestack = [];
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
        console.log (this._namestack);
        console.log (this._getIndex ());
	throw "scope: key [" + key.toString () +  "] not found";
    };
    this.push = function (name) { this._topindex += 1; this._namestack.push (name); this._stack.push ([]); };
    this.pop = function () { /*console.log ("pop " + this._namestack.toString ());*/ this._stack.pop (); this._namestack.pop (); this._topindex -= 1;};
};
var _glueDynamicScope = new scope ();


function addSemantics (sem) { 
  sem.addOperation (
'_glue', 
{

               htmlsvg : function (_ws,_docH,_htmlH,_bodyH,_elements,_bodyE,_htmlE) { 
                          _glueDynamicScope.push ("htmlsvg");
                          
                          var ws = _ws._glue ().join ('');
var docH = _docH._glue ();
var htmlH = _htmlH._glue ();
var bodyH = _bodyH._glue ();
var elements = _elements._glue ().join ('');
var bodyE = _bodyE._glue ();
var htmlE = _htmlE._glue ();
                          _glueDynamicScope.pop ();
                          return `${elements}`; 
                        },
            
               htmlHeader : function (__,_ws) { 
                          _glueDynamicScope.push ("htmlHeader");
                          
                          var _ = __._glue ();
var ws = _ws._glue ().join ('');
                          _glueDynamicScope.pop ();
                          return `${_}${ws}`; 
                        },
            
               htmlEnd : function (__,_ws) { 
                          _glueDynamicScope.push ("htmlEnd");
                          
                          var _ = __._glue ();
var ws = _ws._glue ().join ('');
                          _glueDynamicScope.pop ();
                          return `${_}${ws}`; 
                        },
            
               bodyHeader : function (__,_ws) { 
                          _glueDynamicScope.push ("bodyHeader");
                          
                          var _ = __._glue ();
var ws = _ws._glue ().join ('');
                          _glueDynamicScope.pop ();
                          return `${_}${ws}`; 
                        },
            
               bodyEnd : function (__,_ws) { 
                          _glueDynamicScope.push ("bodyEnd");
                          
                          var _ = __._glue ();
var ws = _ws._glue ().join ('');
                          _glueDynamicScope.pop ();
                          return `${_}${ws}`; 
                        },
            
               docTypeHeader : function (__1,_stuff,__2,_ws) { 
                          _glueDynamicScope.push ("docTypeHeader");
                          
                          var _1 = __1._glue ();
var stuff = _stuff._glue ().join ('');
var _2 = __2._glue ();
var ws = _ws._glue ().join ('');
                          _glueDynamicScope.pop ();
                          return `${_1}${stuff}${_2}${ws}`; 
                        },
            
               element : function (_e) { 
                          _glueDynamicScope.push ("element");
                          
                          var e = _e._glue ();
                          _glueDynamicScope.pop ();
                          return `${e}`; 
                        },
            
               svgElement : function (__1,__2,_ws,_attributes,__5,__6,_elements,_text,__9,__10,__11,__12) { 
                          _glueDynamicScope.push ("svgElement");
                           var name = genid (); 
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
                          _glueDynamicScope.pop ();
                          return ` svgbox(${name},"").
	     ${attributes}
	     ${elements}`; 
                        },
            
               rectElement : function (__1,__2,_ws,_attributes,__5,__6,_elements,_text,__9,__10,__11,__12) { 
                          _glueDynamicScope.push ("rectElement");
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
                          _glueDynamicScope.pop ();
                          return `
     rect(${id ()},"").
     ${attributes}
     ${elements} `; 
                        },
            
               textElement : function (__1,__2,_ws,_attributes,__5,__6,_elements,_text,__9,__10,__11,__12) { 
                          _glueDynamicScope.push ("textElement");
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
                          _glueDynamicScope.pop ();
                          return ` 
       text(${id ()},"").
       ${attributes}
       ${elements}
       text(${id ()}, "${text}"). `; 
                        },
            
               basicElement : function (__1,__2,_ws,_attributes,__5,__6,_elements,_text,__9,__10,__11,__12) { 
                          _glueDynamicScope.push ("basicElement");
                          
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
                          _glueDynamicScope.pop ();
                          return `${_1}${_2}${ws}${attributes}${_5}${_6}${elements}${text}${_9}${_10}${_11}${_12}`; 
                        },
            
               attribute : function (_a) { 
                          _glueDynamicScope.push ("attribute");
                          
                          var a = _a._glue ();
                          _glueDynamicScope.pop ();
                          return `${a}`; 
                        },
            
               widthAttribute : function (__,__eq,_str,__ws) { 
                          _glueDynamicScope.push ("widthAttribute");
                          
                          var _ = __._glue ();
var _eq = __eq._glue ();
var str = _str._glue ();
var _ws = __ws._glue ().join ('');
                          _glueDynamicScope.pop ();
                          return `width(${id ()},${str}).\n`; 
                        },
            
               heightAttribute : function (__,__eq,_str,__ws) { 
                          _glueDynamicScope.push ("heightAttribute");
                          
                          var _ = __._glue ();
var _eq = __eq._glue ();
var str = _str._glue ();
var _ws = __ws._glue ().join ('');
                          _glueDynamicScope.pop ();
                          return `height(${id ()},${str}).\n`; 
                        },
            
               xAttribute : function (__,__eq,_str,__ws) { 
                          _glueDynamicScope.push ("xAttribute");
                          
                          var _ = __._glue ();
var _eq = __eq._glue ();
var str = _str._glue ();
var _ws = __ws._glue ().join ('');
                          _glueDynamicScope.pop ();
                          return `x(${id ()},${str}).\n`; 
                        },
            
               yAttribute : function (__,__eq,_str,__ws) { 
                          _glueDynamicScope.push ("yAttribute");
                          
                          var _ = __._glue ();
var _eq = __eq._glue ();
var str = _str._glue ();
var _ws = __ws._glue ().join ('');
                          _glueDynamicScope.pop ();
                          return `y(${id ()},${str}).\n`; 
                        },
            
               fillAttribute : function (__,__eq,_str,__ws) { 
                          _glueDynamicScope.push ("fillAttribute");
                          
                          var _ = __._glue ();
var _eq = __eq._glue ();
var str = _str._glue ();
var _ws = __ws._glue ().join ('');
                          _glueDynamicScope.pop ();
                          return `fill(${id ()},${str}).\n`; 
                        },
            
               genericAttribute : function (__,__eq,_str,__ws) { 
                          _glueDynamicScope.push ("genericAttribute");
                          
                          var _ = __._glue ();
var _eq = __eq._glue ();
var str = _str._glue ();
var _ws = __ws._glue ().join ('');
                          _glueDynamicScope.pop ();
                          return `%\n`; 
                        },
            
               text : function (_x) { 
                          _glueDynamicScope.push ("text");
                          
                          var x = _x._glue ();
                          _glueDynamicScope.pop ();
                          return `${x}`; 
                        },
            
               name : function (_c,_cs) { 
                          _glueDynamicScope.push ("name");
                          
                          var c = _c._glue ();
var cs = _cs._glue ().join ('');
                          _glueDynamicScope.pop ();
                          return `${c}${cs}`; 
                        },
            
               name1st : function (_c) { 
                          _glueDynamicScope.push ("name1st");
                          
                          var c = _c._glue ();
                          _glueDynamicScope.pop ();
                          return `${c}`; 
                        },
            
               nameFollow : function (_c) { 
                          _glueDynamicScope.push ("nameFollow");
                          
                          var c = _c._glue ();
                          _glueDynamicScope.pop ();
                          return `${c}`; 
                        },
            
               stuff : function (_c) { 
                          _glueDynamicScope.push ("stuff");
                          
                          var c = _c._glue ();
                          _glueDynamicScope.pop ();
                          return `${c}`; 
                        },
            
               string : function (__1,_cs,__2) { 
                          _glueDynamicScope.push ("string");
                          
                          var _1 = __1._glue ();
var cs = _cs._glue ().join ('');
var _2 = __2._glue ();
                          _glueDynamicScope.pop ();
                          return `"${cs}"`; 
                        },
            
               notQ : function (_c) { 
                          _glueDynamicScope.push ("notQ");
                          
                          var c = _c._glue ();
                          _glueDynamicScope.pop ();
                          return `${c}`; 
                        },
            
               ws : function (_c) { 
                          _glueDynamicScope.push ("ws");
                          
                          var c = _c._glue ();
                          _glueDynamicScope.pop ();
                          return `${c}`; 
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
    _glueDynamicScope.put ("id", "id" + _id.toString ());
    return "";
}

function id () {
    init_id ();
    return _glueDynamicScope.get ("id");
}
