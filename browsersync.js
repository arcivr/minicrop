let browserSync = require('browser-sync').create()
let sass = require('sass')

/**
 * Run the middleware on files that contain .scss
 */
function sassMiddleware(req, res, next) {
  var parsed = require('url').parse(req.url)

  if (parsed.pathname.match(/\.scss$/)) {
    let rendered = scss(parsed.pathname)

    res.setHeader('Content-Type', 'text/css')
    res.end(rendered.css)
  }
  next()
}

/**
 * Compile scss
 */
function scss(src) {
  let file = src.split('/').pop()
  return  sass.renderSync({
    file: "src/" + file
  })
}

browserSync.init({
  watch: true,
  server: './',
  open: false,
  logFileChanges: false,
  middleware: sassMiddleware
})
