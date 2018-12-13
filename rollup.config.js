const pkg = require('./package')

module.exports = {
  input: 'src/minicrop.js',
  output: [
    {
      name: pkg.name,
      file: `dist/${pkg.name}.js`,
      format: 'umd',
    },
    {
      file: `dist/${pkg.name}.esm.js`,
      format: 'esm',
    }
  ]
}
