import {
  EVENT_POINTER_DOWN,
  EVENT_POINTER_MOVE,
  EVENT_POINTER_UP,
  EVENT_RESIZE,
  EVENT_WHEEL,
} from './constants.js'

export default {
  bind(minicrop) {
    let {
      image,
      element,
      start,
      offset
    } = minicrop

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


    // cropper.addEventListener(EVENT_WHEEL, (this.onWheel = this.wheel.bind(this)))

    // if (options.responsive) {
    //   window.addEventListener(EVENT_RESIZE, (this.onResize = this.resize.bind(this)))
    // }


    EVENT_POINTER_DOWN.split(" ").forEach(type => {
      image.addEventListener(type, event => {
        if (minicrop.disabled) {
          return
        }

        minicrop.moving = true
        element.classList.add("edit")

        let pointer = (event.targetTouches || event.changedTouches || [event])[0]
        start.x = pointer['clientX'] - offset.x
        start.y = pointer['clientY'] - offset.y

        event.preventDefault()
      })
    })

    EVENT_POINTER_MOVE.split(" ").forEach(type => {
      image.addEventListener(type, event => {
        if (minicrop.disabled || !minicrop.moving) {
          return
        }

        let pointer = (event.targetTouches || event.changedTouches || [event])[0]
        offset.x = pointer['clientX'] - start.x
        offset.y = pointer['clientY'] - start.y

        minicrop.position()
        event.preventDefault()
      })
    })

    EVENT_POINTER_UP.split(" ").forEach(type => {
      image.addEventListener(type, event => {
        minicrop.moving = false
        element.classList.remove("edit")

        minicrop.position()
        event.preventDefault()
      })
    })
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

    // cropper.removeEventListener(EVENT_WHEEL, this.onWheel)
    // cropper.removeEventListener(EVENT_POINTER_DOWN, this.onCropStart)
    // element.removeEventListener(EVENT_POINTER_MOVE, this.onCropMove)
    // element.removeEventListener(EVENT_POINTER_UP, this.onCropEnd)
    //
    // if (options.responsive) {
    //   window.removeEventListener(EVENT_RESIZE, this.onResize)
    // }
  }
}
