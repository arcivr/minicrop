const Events = require('../events.js')

describe("Events", () => {
  const cropper = {
    element: {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn()
    }
  }

  var events

  beforeEach(() => {
    events = new Events.default(cropper)
  })

  test("calls add event listener", () => {
    let listeners = cropper.element.addEventListener.mock.calls

    expect(listeners.length)
      .toEqual(13)
  })

  test("calls add event listener", () => {
    events.unbind()
    let listeners = cropper.element.removeEventListener.mock.calls

    expect(listeners.length)
      .toEqual(13)
  })
})
