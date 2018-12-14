let browserSync = require('browser-sync').create()
let sass = require('sass')
var fs = require('fs')

/**
 * Run the middleware on files that contain .scss
 */
function sassMiddleware(req, res, next) {
  var parsed = require('url').parse(req.url)

  if (parsed.pathname.match(/\.css$/)) {
    let rendered = scss(parsed.pathname)

    res.end(rendered.css)
  }
  next()
}

/**
 * Compile scss
 */
function scss(src) {
  let file = src.split('/').pop()
  let result = sass.renderSync({
    file: "src/" + file.replace(/\.css$/, '.scss'),
    outFile: "dist/" + file
  })

  fs.writeFile("dist/" + file, result.css, function() {})

  return result
}

browserSync.init({
  watch: true,
  server: './',
  open: false,
  logFileChanges: false,
  middleware: sassMiddleware
})
