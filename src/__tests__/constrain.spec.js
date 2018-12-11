const Constrain = require('../constrain.js')

describe("move", () => {
  const { move } = Constrain.default

  const image = {
    offsetTop: 0,
    offsetLeft: 0,
    height: 1000,
    width: 2000,
    style: {}
  }

  const canvas = {
    width: 100,
    height: 100
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
