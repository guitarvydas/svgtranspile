var _id = 0;

function gennew () {
    _id += 1;
    return "";
}

function id () {
    return "id" + _id;
}
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

function addSemantics (sem) { 
  sem.addOperation (
'_glue', 
{

               htmlsvg : function (_ws,_docH,_htmlH,_bodyH,_elements,_bodyE,_htmlE) { 
                          
                          var ws = _ws._glue ().join ('');
var docH = _docH._glue ();
var htmlH = _htmlH._glue ();
var bodyH = _bodyH._glue ();
var elements = _elements._glue ().join ('');
var bodyE = _bodyE._glue ();
var htmlE = _htmlE._glue ();
                          return `${elements}`; 
                        },
            
               htmlHeader : function (__,_ws) { 
                          
                          var _ = __._glue ();
var ws = _ws._glue ().join ('');
                          return `${_}${ws}`; 
                        },
            
               htmlEnd : function (__,_ws) { 
                          
                          var _ = __._glue ();
var ws = _ws._glue ().join ('');
                          return `${_}${ws}`; 
                        },
            
               bodyHeader : function (__,_ws) { 
                          
                          var _ = __._glue ();
var ws = _ws._glue ().join ('');
                          return `${_}${ws}`; 
                        },
            
               bodyEnd : function (__,_ws) { 
                          
                          var _ = __._glue ();
var ws = _ws._glue ().join ('');
                          return `${_}${ws}`; 
                        },
            
               docTypeHeader : function (__1,_stuff,__2,_ws) { 
                          
                          var _1 = __1._glue ();
var stuff = _stuff._glue ().join ('');
var _2 = __2._glue ();
var ws = _ws._glue ().join ('');
                          return `${_1}${stuff}${_2}${ws}`; 
                        },
            
               element : function (_e) { 
                          
                          var e = _e._glue ();
                          return `${e}`; 
                        },
            
               svgElement : function (__1,__2,_ws,_attributes,__5,__6,_elements,_text,__9,__10,__11,__12) { 
                           gennew (); 
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
                          return `${attributes}${elements}`; 
                        },
            
               rectElement : function (__1,__2,_ws,_attributes,__5,__6,_elements,_text,__9,__10,__11,__12) { 
                           gennew (); 
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
                        },
            
               textElement : function (__1,__2,_ws,_attributes,__5,__6,_elements,_text,__9,__10,__11,__12) { 
                           gennew (); 
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
                        },
            
               basicElement : function (__1,__2,_ws,_attributes,__5,__6,_elements,_text,__9,__10,__11,__12) { 
                          
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
                        },
            
               attribute : function (_a) { 
                          
                          var a = _a._glue ();
                          return `${a}`; 
                        },
            
               widthAttribute : function (__,__eq,_str,__ws) { 
                          
                          var _ = __._glue ();
var _eq = __eq._glue ();
var str = _str._glue ();
var _ws = __ws._glue ().join ('');
                          return `width(${id ()},${str}).\n`; 
                        },
            
               heightAttribute : function (__,__eq,_str,__ws) { 
                          
                          var _ = __._glue ();
var _eq = __eq._glue ();
var str = _str._glue ();
var _ws = __ws._glue ().join ('');
                          return `height(${id ()},${str}).\n`; 
                        },
            
               xAttribute : function (__,__eq,_str,__ws) { 
                          
                          var _ = __._glue ();
var _eq = __eq._glue ();
var str = _str._glue ();
var _ws = __ws._glue ().join ('');
                          return `x(${id ()},${str}).\n`; 
                        },
            
               yAttribute : function (__,__eq,_str,__ws) { 
                          
                          var _ = __._glue ();
var _eq = __eq._glue ();
var str = _str._glue ();
var _ws = __ws._glue ().join ('');
                          return `y(${id ()},${str}).\n`; 
                        },
            
               fillAttribute : function (__,__eq,_str,__ws) { 
                          
                          var _ = __._glue ();
var _eq = __eq._glue ();
var str = _str._glue ();
var _ws = __ws._glue ().join ('');
                          return `fill(${id ()},${str}).\n`; 
                        },
            
               genericAttribute : function (__,__eq,_str,__ws) { 
                          
                          var _ = __._glue ();
var _eq = __eq._glue ();
var str = _str._glue ();
var _ws = __ws._glue ().join ('');
                          return `%\n`; 
                        },
            
               text : function (_x) { 
                          
                          var x = _x._glue ();
                          return `${x}`; 
                        },
            
               name : function (_c,_cs) { 
                          
                          var c = _c._glue ();
var cs = _cs._glue ().join ('');
                          return `${c}${cs}`; 
                        },
            
               name1st : function (_c) { 
                          
                          var c = _c._glue ();
                          return `${c}`; 
                        },
            
               nameFollow : function (_c) { 
                          
                          var c = _c._glue ();
                          return `${c}`; 
                        },
            
               stuff : function (_c) { 
                          
                          var c = _c._glue ();
                          return `${c}`; 
                        },
            
               string : function (__1,_cs,__2) { 
                          
                          var _1 = __1._glue ();
var cs = _cs._glue ().join ('');
var _2 = __2._glue ();
                          return `"${cs}"`; 
                        },
            
               notQ : function (_c) { 
                          
                          var c = _c._glue ();
                          return `${c}`; 
                        },
            
               ws : function (_c) { 
                          
                          var c = _c._glue ();
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
