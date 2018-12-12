const Constrain = require('../constrain.js')

describe("move", () => {
  const { move } = Constrain.default

  const image = {
    offsetTop: 0,
    offsetLeft: 0,
    offsetHeight: 1000,
    offsetWidth: 2000,
    style: {}
  }

  const canvas = {
    offsetWidth: 100,
    offsetHeight: 100
  }

  describe("top", () => {
    // test('starting further down than canvas top returns canvas top', () => {
    //   expect(move({ offsetTop: 10 }, canvas, { }))
    //     .toEqual({ y: 0 })
    // })

    test('less than canvas top is fine', () => {
      expect(move(image, canvas, { y: -10 }))
        .toEqual({ y: -10 })
    })

    test('moving further down than canvas top returns canvas top', () => {
      expect(move(image, canvas, { y: 10 }))
        .toEqual({ y: 0 })
    })
  })


  describe("bottom", () => {
    test('less than canvas bottom is fine', () => {
      expect(move(image, canvas, { y: -800 }))
        .toEqual({ y: -800 })
    })

    test('further up than canvas bottom returns canvas bottom', () => {
      expect(move(image, canvas, { y: -1000 }))
        .toEqual({ y: -900 })
    })
  })


  describe("left", () => {
    test('less than canvas left is fine', () => {
      expect(move(image, canvas, { x: -10 }))
        .toEqual({ x: -10 })
    })

    test('further right than canvas left returns canvas left', () => {
      expect(move(image, canvas, { x: 10 }))
        .toEqual({ x: 0 })
    })
  })


  describe("right", () => {
    test('less than canvas right is fine', () => {
      expect(move(image, canvas, { x: -1800 }))
        .toEqual({ x: -1800 })
    })

    test('further right than canvas right returns canvas right', () => {
      expect(move(image, canvas, { x: -2000 }))
        .toEqual({ x: -1900 })
    })
  })
})

describe("imageState", () => {
  const { imageState } = Constrain.default

  test("portrait", () => {
    let state = imageState({ offsetHeight: 100, offsetWidth: 10 }, {})
    expect(state.portrait).toEqual(true)
  })

  test("not portrait", () => {
    let state = imageState({ offsetHeight: 10, offsetWidth: 100 }, {})
    expect(state.portrait).toEqual(false)
  })

  test("not padded", () => {
    let state = imageState({ offsetHeight: 10, offsetWidth: 10 }, { offsetHeight: 1, offsetWidth: 1})
    expect(state.padded).toEqual(false)
  })

  test("padded height", () => {
    let state = imageState({ offsetHeight: 10, offsetWidth: 10 }, { offsetHeight: 100, offsetWidth: 1})
    expect(state.padded).toEqual(true)
  })

  test("padded width", () => {
    let state = imageState({ offsetHeight: 100, offsetWidth: 10 }, { offsetHeight: 1, offsetWidth: 100})
    expect(state.padded).toEqual(true)
  })

  test("not fitted", () => {
    let state = imageState({ offsetHeight: 10, offsetWidth: 10 }, { offsetHeight: 1, offsetWidth: 1})
    expect(state.fitted).toEqual(false)
  })

  test("fitted", () => {
    let state = imageState({ offsetHeight: 10, offsetWidth: 10 }, { offsetHeight: 10, offsetWidth: 100})
    expect(state.fitted).toEqual(true)
  })
})
