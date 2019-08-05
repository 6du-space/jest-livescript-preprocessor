(function(){
  var livescript, lexer, Compiler, compiler, ref$;
  livescript = require('livescript');
  lexer = require('livescript/lib/lexer');
  Compiler = require('livescript-compiler/lib/livescript/Compiler');
  compiler = Compiler.__default__.create({
    livescript: (ref$ = clone$(livescript), ref$.lexer = lexer, ref$)
  });
  (function(){
    var i$, ref$, len$, i, results$ = [];
    for (i$ = 0, len$ = (ref$ = ['implicit-async', 'esm', 'object-create']).length; i$ < len$; ++i$) {
      i = ref$[i$];
      results$.push(require("livescript-transform-" + i + "/lib/plugin").__default__.install(compiler));
    }
    return results$;
  })();
  module.exports = {
    process: function(src, path){
      var result, e, err, ref$, ref1$, line, ref2$, first_column, first_line, offendingCharacter;
      try {
        result = compiler.compile(src, {
          bare: true,
          header: false,
          filename: path,
          'const': false
        });
      } catch (e$) {
        e = e$;
        err = '';
        if (!(((ref$ = e.location) != null ? ref$.first_column : void 8) != null || ((ref1$ = e.location) != null ? ref1$.first_line : void 8) != null)) {
          err += "Got an unexpected exception from the livescript compiler. The original exception was: " + e;
        } else {
          line = source.split('\n')[e.location.first_line];
          ref2$ = e.location, first_column = ref2$.first_column, first_line = ref2$.first_line;
          offendingCharacter = first_column < codeLine.length ? codeLine[first_column] : '';
          err += "" + e + "\nL: " + first_line + ": " + codeLine.substring(0) + " " + first_column + " " + offendingCharacter + " " + codeLine.substring(e.location.first_column + 1) + "\n" + new Array(first_column + 1);
        }
        throw new Error(err);
      }
      return result;
    }
  };
  function clone$(it){
    function fun(){} fun.prototype = it;
    return new fun;
  }
}).call(this);
