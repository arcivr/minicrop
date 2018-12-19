const Structure = require('../structure.js')

describe("build", () => {
  const { build } = Structure.default
  var root

  beforeEach(() => {
    document.body.innerHTML = "<div class='minicrop' data-image='image'></div>"
    root = document.getElementsByClassName('minicrop')[0]
  })

  test('snapshot', () => {
    expect(build(root))
      .toMatchSnapshot()
  })

  test('includes image', () => {
    expect(build(root).innerHTML)
      .toMatch('src="image"')
  })

  describe("zoom", () => {
    test('defaults to 100% zoom', () => {
      expect(build(root).innerHTML)
        .toMatch('height="100%"')
    })

    test('includes zoom level', () => {
      root.dataset.zoom = "50%"

      expect(build(root).innerHTML)
        .toMatch('height="50%"')
    })
  })
})
