const pkg = require('./package')
import babel from 'rollup-plugin-babel'

export default ({
  input: 'src/minicrop.js',
  plugins: [
    babel({
      babelrc: false,
      presets: [['env', { modules: false }]],
      exclude: 'node_modules/**'
    })
  ],
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
})
