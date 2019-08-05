require! {
  'livescript'
  'livescript/lib/lexer'
  'livescript-compiler/lib/livescript/Compiler'
}

compiler = Compiler.__default__.create livescript: livescript with {lexer}

do ->
  for i in <[
    implicit-async
    esm
    object-create
  ]>
    require(
      "livescript-transform-#{i}/lib/plugin"
    ).__default__.install(compiler)

module.exports = {
  process: (src, path) ~>
    try
      result = compiler.compile(
        src
        {
          bare: true,
          header: false,
          filename:path,
          const:false
        }
      )
    catch e
      err = ''
      unless (e.location?.first_column? or e.location?.first_line?)
        err += "Got an unexpected exception from the livescript compiler. The original exception was: #{e}"
      else
        const line = source.split('\n')[e.location.first_line]
        const {first_column, first_line} = e.location
        const offending-character = if first_column < codeLine.length then codeLine[first_column] else ''

        err += """
          #{e}
          L: #{first_line}: #{codeLine.substring(0)} #{first_column} #{offending-character} #{codeLine.substring e.location.first_column + 1}
          #{new Array first_column + 1}
        """

      throw new Error(err)
    return result
}
