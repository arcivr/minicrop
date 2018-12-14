const Structure = require('../structure.js')

describe("build", () => {
  const { build } = Structure.default
  var root

  beforeEach(() => {
    document.body.innerHTML = "<div class='minicrop' data-image='image'></div>"
    root = document.getElementsByClassName('minicrop')[0]
  })

  test('less than canvas top is fine', () => {
    expect(build(root))
      .toMatchSnapshot()
  })
})
