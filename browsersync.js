let browserSync = require('browser-sync').create()
let sass = require('sass')

/**
 * Run the middleware on files that contain .scss
 */
function sassMiddleware(req, res, next) {
  var parsed = require('url').parse(req.url)
  if (parsed.pathname.match(/\.scss$/)) {
    let rendered = scss(parsed.pathname)

    res.end(rendered.css)
  }
  next()
}

/**
 * Compile scss
 */
function scss(src) {
  return sass.renderSync({
    file: "src" + src
  })
}

browserSync.init({
  watch: true,
  server: './',
  open: false,
  logFileChanges: false,
  middleware: sassMiddleware
})
