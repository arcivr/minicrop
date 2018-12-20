import {
  EVENT_POINTER_DOWN,
  EVENT_POINTER_MOVE,
  EVENT_POINTER_UP,
  EVENT_RESIZE,
  EVENT_WHEEL,
  CLASS_ZOOMING,
  CLASS_MOVING
} from './constants.js'

import Constrain from './constrain.js'

class Events {
  constructor(minicrop) {
    this.minicrop = minicrop
    this.editingTimeout = null
    this.pointerOffset = 0
    this.maxZoomStep = 300

    this.bind()
  }

  bind() {
    let { element } = this.minicrop

    window.addEventListener(EVENT_RESIZE, this)

    Array(EVENT_WHEEL, EVENT_POINTER_DOWN, EVENT_POINTER_MOVE, EVENT_POINTER_UP).join(" ").split(" ")
      .forEach(type => {
        element.addEventListener(type, this)
      })
  }

  unbind() {
    let { element } = this.minicrop

    window.removeEventListener(EVENT_RESIZE, this)

    Array(EVENT_WHEEL, EVENT_POINTER_DOWN, EVENT_POINTER_MOVE, EVENT_POINTER_UP).join(" ").split(" ")
      .forEach(type => {
        element.removeEventListener(type, this)
      })
  }

  // Dragging

  dragStart(event) {
    event.preventDefault()

    let { start, offset } = this.minicrop

    if (this.minicrop.disabled) {
      return
    }

    let pointers = (event.targetTouches || event.changedTouches || [event])
    if (pointers.length > 1) {
      this.pointerOffset = this.getPointerDistance(pointers)

      return
    }

    this.minicrop.editing(CLASS_MOVING)

    let pointer = pointers[0]
    start.x = pointer['clientX'] - offset.x
    start.y = pointer['clientY'] - offset.y
  }

  dragMove(event) {
    event.preventDefault()

    if (this.minicrop.disabled) {
      return
    }

    let { start, offset } = this.minicrop

    let pointers = (event.targetTouches || event.changedTouches || [event])
    if (pointers.length > 1) {
      this.pinch(pointers)

      return
    }

    if (!this.minicrop.moving) {
      return
    }

    let pointer = pointers[0]
    offset.x = pointer['clientX'] - start.x
    offset.y = pointer['clientY'] - start.y

    this.minicrop.position()
  }

  dragEnd(event) {
    this.minicrop.edited(CLASS_MOVING)
    this.minicrop.position()
    event.preventDefault()
  }

  // Zooming

  pinch(pointers, scale, center) {
    scale = scale || this.getPointerDistance(pointers)
    center = center || this.getPointersCenter(pointers)

    let zoomEvent = new CustomEvent("zoom")
    zoomEvent.deltaY = -1 * (scale - this.pointerOffset)

    this.zoom(zoomEvent, center)
    this.pointerOffset = scale
  }

  zoom(event, center) {
    event.preventDefault()
    let step = Math.min(Math.abs(event.deltaY), this.maxZoomStep)

    if (this.minicrop.disabled || step <= .1) {
      return
    }

    this.minicrop.editing(CLASS_ZOOMING)

    // Scrolling up zooms out, scrolling down zooms in
    var direction = event.deltaY > 0 ? -1 : 1
    var smoothing = this.maxZoomStep

    if (event.ctrlKey) {
      smoothing /= 3
    }

    if (!center) {
      center = { x: event.offsetX, y: event.offsetY }
    }

    let delta = direction * step / smoothing

    this.minicrop.zoom(delta, center)

    if (this.editingTimeout) {
      clearTimeout(this.editingTimeout)
    }

    this.editingTimeout = setTimeout(() => {
      this.minicrop.edited(CLASS_ZOOMING)
    }, 200)
  }

  // Utilities

  getPointerDistance(pointers) {
    let { clientX: x1, clientY: y1 } = pointers[0]
    let { clientX: x2, clientY: y2 } = pointers[1]

    let distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
    return distance * 2
  }

  getPointersCenter(pointers) {
    let { image } = this.minicrop
    
    let x = 0
    let y = 0
    let count = 0

    Array.from(pointers).forEach((pointer) => {
      let { clientX, clientY } = Constrain.coordinates(pointer, image)

      x += clientX
      y += clientY
      count += 1
    })

    x /= count
    y /= count

    return {
      x,
      y
    }
  }

  handleEvent(event) {
    if (EVENT_RESIZE.includes(event.type)) {
      this.minicrop.resize(event)
    }

    if (EVENT_WHEEL.includes(event.type)) {
      this.zoom(event)
    }

    if (EVENT_POINTER_DOWN.includes(event.type)) {
      this.dragStart(event)
    }

    if (EVENT_POINTER_MOVE.includes(event.type)) {
      this.dragMove(event)
    }

    if (EVENT_POINTER_UP.includes(event.type)) {
      this.dragEnd(event)
    }
  }
}

export default Events
