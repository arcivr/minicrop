module.exports = {
  "parser": "babel-eslint",
  env: {
    browser: true
  },

  extends: [
    "eslint:recommended"
  ],

  rules: {
    indent: [
      'warn',
      2,
      {
        VariableDeclarator: {
          'var': 2,
          'let': 2,
          'const': 3
        }
      }
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    quotes: 'off',
    semi: [
      'warn',
      'never'
    ],
    'no-undef': 'off'
  }
}
