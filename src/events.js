import {
  EVENT_CROP,
  EVENT_CROP_END,
  EVENT_CROP_MOVE,
  EVENT_CROP_START,
  EVENT_DBLCLICK,
  EVENT_POINTER_DOWN,
  EVENT_POINTER_MOVE,
  EVENT_POINTER_UP,
  EVENT_RESIZE,
  EVENT_WHEEL,
  EVENT_ZOOM,
} from './constants.js'

import {
  addListener,
  isFunction,
  removeListener,
} from './utilities.js'

import _ from '../node_modules/lodash-es/lodash.default.js'

export default {
  bind(element) {


    // canvas.addEventListener("gestureStart", event => {
    //   event.preventDefault()
    // })

    let cropper = element.getElementsByClassName('image')[0]

    // cropper.addEventListener("gesturestart", event => {
    //   console.log("Gesture start", event)
    //   event.preventDefault()
    // })
    //
    // cropper.addEventListener("gesturechange", event => {
    //   console.log("Gesture change", event)
    //   event.preventDefault()
    // })
    //
    // cropper.addEventListener("gestureend", event => {
    //   console.log("Gesture end", event)
    //   event.preventDefault()
    // })
console.log("DEBUG", EVENT_POINTER_DOWN, cropper)

    EVENT_POINTER_DOWN.split(" ").forEach(type => {
      cropper.addEventListener(type, event => {
        console.log("Touch start", event)
        event.preventDefault()
      })
    })

    EVENT_POINTER_MOVE.split(" ").forEach(type => {
      cropper.addEventListener(type, event => {
        console.log("Touch change", event)
        event.preventDefault()
      })
    })

    EVENT_POINTER_UP.split(" ").forEach(type => {
      cropper.addEventListener(type, event => {
        console.log("Touch end", event)
        event.preventDefault()
      })
    })



    // if (isFunction(options.cropstart)) {
    //   element.addEventListener(EVENT_CROP_START, options.cropstart)
    // }
    //
    // if (isFunction(options.cropmove)) {
    //   element.addEventListener(EVENT_CROP_MOVE, options.cropmove)
    // }
    //
    // if (isFunction(options.cropend)) {
    //   element.addEventListener(EVENT_CROP_END, options.cropend)
    // }
    //
    // if (isFunction(options.crop)) {
    //   element.addEventListener(EVENT_CROP, options.crop)
    // }
    //
    // if (isFunction(options.zoom)) {
    //   element.addEventListener(EVENT_ZOOM, options.zoom)
    // }

    // cropper.addEventListener(EVENT_WHEEL, (this.onWheel = this.wheel.bind(this)))
    // cropper.addEventListener(EVENT_POINTER_DOWN, (this.onCropStart = this.cropStart.bind(this)))
    // element.addEventListener(EVENT_POINTER_MOVE, (this.onCropMove = this.cropMove.bind(this)))
    // element.addEventListener(EVENT_POINTER_UP, (this.onCropEnd = this.cropEnd.bind(this)))
    //
    // if (options.responsive) {
    //   window.addEventListener(EVENT_RESIZE, (this.onResize = this.resize.bind(this)))
    // }
  },

  unbind(element) {
    // if (isFunction(options.cropstart)) {
    //   element.removeEventListener(EVENT_CROP_START, options.cropstart)
    // }
    //
    // if (isFunction(options.cropmove)) {
    //   element.removeEventListener(EVENT_CROP_MOVE, options.cropmove)
    // }
    //
    // if (isFunction(options.cropend)) {
    //   element.removeEventListener(EVENT_CROP_END, options.cropend)
    // }
    //
    // if (isFunction(options.crop)) {
    //   element.removeEventListener(EVENT_CROP, options.crop)
    // }
    //
    // if (isFunction(options.zoom)) {
    //   element.removeEventListener(EVENT_ZOOM, options.zoom)
    // }

    cropper.removeEventListener(EVENT_WHEEL, this.onWheel)
    cropper.removeEventListener(EVENT_POINTER_DOWN, this.onCropStart)
    element.removeEventListener(EVENT_POINTER_MOVE, this.onCropMove)
    element.removeEventListener(EVENT_POINTER_UP, this.onCropEnd)

    if (options.responsive) {
      window.removeEventListener(EVENT_RESIZE, this.onResize)
    }
  },
}
