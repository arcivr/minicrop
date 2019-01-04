const Constrain = require('../constrain.js')

describe("move", () => {
  const { move } = Constrain.default

  const image = {
    offsetTop: 0,
    offsetLeft: 0,
    offsetHeight: 1000,
    offsetWidth: 2000,
    naturalHeight: 1000,
    naturalWidth: 2000,
    style: {}
  }

  const cropper = {
    offsetTop: 0,
    offsetLeft: 0,
    offsetWidth: 100,
    offsetHeight: 100
  }

  describe("top", () => {
    test('less than canvas top is fine', () => {
      expect(move({ image, cropper, offset: { y: -10 } }))
        .toEqual({ y: -10 })
    })

    test('moving further down than canvas top returns canvas top', () => {
      expect(move({ image, cropper, offset: { y: 10 } }))
        .toEqual({ y: 0 })
    })
  })


  describe("bottom", () => {
    test('less than canvas bottom is fine', () => {
      expect(move({ image, cropper, offset: { y: -800 } }))
        .toEqual({ y: -800 })
    })

    test('further up than canvas bottom returns canvas bottom', () => {
      expect(move({ image, cropper, offset: { y: -1000 } }))
        .toEqual({ y: -900 })
    })
  })


  describe("left", () => {
    test('less than canvas left is fine', () => {
      expect(move({ image, cropper, offset: { x: -10 } }))
        .toEqual({ x: -10 })
    })

    test('further right than canvas left returns canvas left', () => {
      expect(move({ image, cropper, offset: { x: 10 } }))
        .toEqual({ x: 0 })
    })
  })


  describe("right", () => {
    test('less than canvas right is fine', () => {
      expect(move({ image, cropper, offset: { x: -1800 } }))
        .toEqual({ x: -1800 })
    })

    test('further right than canvas right returns canvas right', () => {
      expect(move({ image, cropper, offset: { x: -2000 } }))
        .toEqual({ x: -1900 })
    })
  })
})

describe("zoom", () => {
  const { zoom } = Constrain.default

  const image = {
    offsetTop: 0,
    offsetLeft: 0,
    naturalHeight: 1000,
    naturalWidth: 2000,
    style: {}
  }

  const cropper = {
    offsetWidth: 500,
    offsetHeight: 500
  }

  describe("regular", () => {
    test('a reasonable value returns that value', () => {
      expect(zoom({ image, cropper, scale: 1 }))
        .toEqual(1)
    })

    test('a missing value returns 1', () => {
      expect(zoom({ image, cropper, scale: null }))
        .toEqual(1)

      expect(zoom({ image, cropper }))
        .toEqual(1)
    })

    test('larger than maximum value returns maximum', () => {
      expect(zoom({ image, cropper, scale: 10 }))
        .toEqual(5)
    })
  })

  describe("padded", () => {
    test("if zoom larger than padded, return same value", () => {
      expect(zoom({ image, cropper, scale: 0.75 }))
        .toEqual(0.75)
    })

    test("if zoom smaller than padded, return same value", () => {
      expect(zoom({ image, cropper, scale: 0.4 }))
        .toEqual(0.4)
    })
  })

  describe("fitted", () => {
    test("if zoom larger than fitted, return same value", () => {
      expect(zoom({ image, cropper, scale: 0.5 }))
        .toEqual(0.5)
    })

    test("if zoom smaller than fitted, return minimum fitted scale", () => {
      expect(zoom({ image, cropper, scale: 0.01 }))
        .toEqual(0.25)
    })

    test('negative numbers returns the minimum', () => {
      expect(zoom({ image, cropper, scale: -0.1 }))
        .toEqual(0.25)
    })
  })
})

describe("imageState", () => {
  const { imageState } = Constrain.default

  let image = { naturalHeight: 1000, naturalWidth: 1000 }
  let cropper = {}

  describe("portrait", () => {
    test("portrait", () => {
      let state = imageState({ image: { naturalHeight: 100, naturalWidth: 10 }, cropper })
      expect(state.portrait).toEqual(true)
    })

    test("not portrait", () => {
      let state = imageState({ image: { naturalHeight: 10, naturalWidth: 100 }, cropper })
      expect(state.portrait).toEqual(false)
    })
  })

  describe("padded", () => {
    test("not padded", () => {
      let state = imageState({ image, cropper: { offsetWidth: 100 } })
      expect(state.padded).toEqual(false)
    })

    test("padded height", () => {
      let state = imageState({ image, cropper: { offsetHeight: 2000 }})
      expect(state.padded).toEqual(true)
    })

    test("padded width", () => {
      let state = imageState({ image: { naturalHeight: 1000, naturalWidth: 10 }, cropper: { offsetWidth: 2000 } })
      expect(state.padded).toEqual(true)
    })
  })

  describe("fitted", () => {
    test("not fitted", () => {
      let state = imageState({ image, cropper: { offsetWidth: 100 } })
      expect(state.fitted).toEqual(false)
    })

    test("fitted", () => {
      let state = imageState({ image, cropper: { offsetWidth: 2000 } })
      expect(state.fitted).toEqual(true)
    })
  })

  describe("padRatio", () => {
    test("not padded", () => {
      let state = imageState({ image, cropper: { offsetHeight: 100 } })
      expect(state.padRatio).toEqual(10)
    })

    test("padded height", () => {
      let state = imageState({ image, cropper: { offsetHeight: 2000 }})
      expect(state.padRatio).toEqual(0.5)
    })

    test("padded width", () => {
      let state = imageState({ image: { naturalHeight: 2000, naturalWidth: 1000 }, cropper: { offsetWidth: 2000 } })
      expect(state.padRatio).toEqual(0.5)
    })
  })

  describe("fitRatio", () => {
    test("not fitted", () => {
      let state = imageState({ image, cropper: { offsetWidth: 500 } })
      expect(state.fitRatio).toEqual(2)
    })

    test("fitted", () => {
      let state = imageState({ image, cropper: { offsetWidth: 2000 } })
      expect(state.fitRatio).toEqual(0.5)
    })
  })

})
