const Minicrop = require('../minicrop.js')

describe("Minicrop", () => {
  var root
  var cropper

  beforeEach(() => {
    document.body.innerHTML = "<div class='minicrop' data-image='image'></div>"
    root = document.getElementsByClassName('minicrop')[0]
    cropper = new Minicrop.default(root)
  })

  test("result", () => {
    expect(cropper.element)
      .toMatchSnapshot()
  })

  describe("crop", () => {
    test("response", () => {
      expect(cropper.crop())
        .toMatchSnapshot()
    })
  })
})
