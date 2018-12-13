const Structure = require('../structure.js')

describe("build", () => {
  const { build } = Structure.default

  test('less than canvas top is fine', () => {
    expect(build())
      .toEqual({ y: -10 })
  })
})
