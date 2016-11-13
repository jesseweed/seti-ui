/*

  HIGHLIGHTING: https://github.com/atom/language-javascript/blob/master/grammars/javascript.cson
  FILE TYPES:  'js', 'htc', '_js', 'es', 'es6', 'jsm', 'pac', 'pjs', 'xsjs', 'xsjslib'
  WRAPPER: source.js

*/


/*

  COMMENTS
  --------
  CLASS: punctuation.definition.comment.js
  TRIGGERS: js single line or comment blocks

*/



/*

  DOCBLOCK
  --------
  CLASS: storage.type.class.jsdoc

  TRIGGERS: abstract, access, alias, augments, author, async, attribute, arg, argument, beta, borrows, bubbes, callback, class, classdesc, config, const, constant, constructs, constructor, copyright, chainable, default, defaultvalue, deprecated, desc, description, enum, emits, event, example, exports, external, extends, extension, extensionfor, extension_for, for, file, fileoverview, fires, final, function, global, host, ignore, implements, inheritdoc, inner, instance, interface, kind, lends, license, listens, main, member, memberof, method, mixex, mixin(?:s, ), module, name, namespace, override, overview, param, private, prop, property, protected, readonly, readOnly, requires, required, return, returns, see, since, static, summary, submodule, this, throws, todo, tutorial, type, typedef, var, variation, version, virtual, uses, writeOnce

*/

class Bread {

  constructor(slices) {
    this.slices = 12;

    if ( slices > this.slices ) {
      console.log('not enough bread');
    } else {
      console.log(slices);
    }

  }

}

class Sandwich extends Bread {

  constructor(slices) {
    this.bread = super(slices);
    this.toppings = [];
  }

  toppings( ingredients ) {
    ingredients.forEach(function(value, index) {
      this.toppings.push( value );
    });
  }

}

var Club = new Sandwich(3).toppings(['roast beef', 'turkey']);


/*

  INTERPOLATED JS
  --------
  CLASS: punctuation.definition.comment.js
  TRIGGERS: punctuation.section.embedded.js
  NOTE: This class doesn't currently seem to actually get applied

*/

  var myName = 'Slim Shady',
      template = 'Hello, my name is ${myName}';

/*

  FUNCTION PARAMS
  --------
  TRIGGER: ()           CLASS: meta.brace.round.js
  TRIGGER: []           CLASS: meta.brace.square.js
  TRIGGER: {}           CLASS: meta.brace.curly.js
  TRIGGER: ,            CLASS: meta.object.delimiter.js
  TRIGGER: =            CLASS: keyword.operator.js
  TRIGGER: parameters   CLASS: variable.parameter.function.js

*/


function testFunction(string,arr,obj) {
// DO SOMETHING
}

testFunction('one', 'two', [1,2,3], {key: 'value'} );


/*

  METHODS
  --------
  CLASS: meta.method.js

  TRIGGER: break, case, catch, continue, do, else, export, finally, for, function, if, import, package, return, switch, throw, try, while, with

*/

import { ham as turkey } from 'mySandwich.js';

var isFunction;

switch ( typeof testFunction ) {

  case 'function':
    isFunction = true;
    break;
  default:
    isFunction = false;

}

try {
  testFunction();
} catch (e) {
  throw 'Whoopsadaisy!';
} finally {
  console.log('i think we\'re done here!');
}
