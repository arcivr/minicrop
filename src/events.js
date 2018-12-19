import {
  EVENT_POINTER_DOWN,
  EVENT_POINTER_MOVE,
  EVENT_POINTER_UP,
  EVENT_RESIZE,
  EVENT_WHEEL,
  CLASS_ZOOMING,
  CLASS_MOVING
} from './constants.js'

// var editingTimeout
// var lastStep = 0

class Events {
  constructor(minicrop) {
    // let {
    //   image,
    //   start,
    //   offset
    // } = minicrop
    this.minicrop = minicrop
    this.editingTimeout = null
    this.pointerDistance = 0
    this.gesturing = false

    this.init()
  }

  init() {
    let { image } = this.minicrop

    // image.addEventListener("gesturestart", event => {
    //   if (this.gesturing) {
    //     return
    //   }
    //
    //   this.gesturing = true
    //
    //   console.log("Gesture start", event)
    //   event.preventDefault()
    // })
    //
    // image.addEventListener("gesturechange", event => {
    //   if (!this.gesturing) {
    //     return
    //   }
    //
    //   console.log("Gesture change", event)
    //   event.preventDefault()
    // })
    //
    // image.addEventListener("gestureend", event => {
    //   this.gesturing = false
    //
    //   console.log("Gesture end", event)
    //   event.preventDefault()
    // });

    // if (options.responsive) {
    //   window.addEventListener(EVENT_RESIZE, (this.onResize = this.resize.bind(this)))
    // }


    ;[EVENT_WHEEL, EVENT_POINTER_DOWN, EVENT_POINTER_MOVE, EVENT_POINTER_UP].join(" ").split(" ")
      .forEach(type => {
        image.addEventListener(type, this)
      })
  }

  cropStart(event) {
    event.preventDefault()

    let {
      start,
      offset
    } = this.minicrop

    if (this.minicrop.disabled) {
      return
    }

    let pointers = (event.targetTouches || event.changedTouches || [event])
    if (pointers.length > 1) {
      this.pointerDistance = this.getPointerDistance(pointers)

      return
    }

    this.minicrop.editing(CLASS_MOVING)

    let pointer = pointers[0]
    start.x = pointer['clientX'] - offset.x
    start.y = pointer['clientY'] - offset.y
  }

  cropMove(event) {
    event.preventDefault()

    let {
      start,
      offset
    } = this.minicrop

    let pointers = (event.targetTouches || event.changedTouches || [event])
    if (pointers.length > 1) {
      this.pinch(pointers)

      return
    }

    if (this.minicrop.disabled || !this.minicrop.moving) {
      return
    }

    let pointer = pointers[0]
    offset.x = pointer['clientX'] - start.x
    offset.y = pointer['clientY'] - start.y

    this.minicrop.position()
  }

  cropEnd(event) {
    this.minicrop.edited(CLASS_MOVING)
    this.minicrop.position()
    event.preventDefault()
  }

  pinch(pointers) {
    let zoomEvent = new CustomEvent("zoom")
    let distance = this.getPointerDistance(pointers)
    let center = this.getPointersCenter(pointers)

    zoomEvent.deltaY = distance - this.pointerDistance

    this.zoom(zoomEvent, center)
    this.pointerDistance = distance
  }

  zoom(event, location) {
    event.preventDefault()

    if (this.minicrop.disabled || Math.abs(event.deltaY) == 0) {
      return
    }

    this.minicrop.editing(CLASS_ZOOMING)

    // Scrolling up zooms out, scrolling down zooms in
    var direction = event.deltaY > 0 ? -1 : 1
    var smoothing = 50

    if (event.ctrlKey) {
      smoothing = 15
    }

    if (!location) {
      location = { x: event.offsetX, y: event.offsetY }
    }

    let delta = direction * Math.log(Math.abs(event.deltaY)) / smoothing
    let scale = this.minicrop.scale + delta

    this.minicrop.zoom(scale, location)

    if (this.editingTimeout) {
      clearTimeout(this.editingTimeout)
    }

    this.editingTimeout = setTimeout(() => {
      this.minicrop.edited(CLASS_ZOOMING)
    }, 200)
  }

  getPointerDistance(pointers) {
    let { clientX: x1, clientY: y1 } = pointers[0]
    let { clientX: x2, clientY: y2 } = pointers[1]

    let distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
    return distance
  }

  getPointersCenter(pointers) {
    let x = 0
    let y = 0
    let count = 0

    pointers.forEach(({ clientX, clientY }) => {
      x += clientX
      y += clientY
      count += 1
    })

    x /= count
    y /= count

    return {
      x,
      y,
    }
  }

  handleEvent(event) {
    if (EVENT_WHEEL.includes(event.type)) {
      this.zoom(event)
    }

    if (EVENT_POINTER_DOWN.includes(event.type)) {
      this.cropStart(event)
    }

    if (EVENT_POINTER_MOVE.includes(event.type)) {
      this.cropMove(event)
    }

    if (EVENT_POINTER_UP.includes(event.type)) {
      this.cropEnd(event)
    }
  }

  // unbind(element) {
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
  // }
}

export default Events
