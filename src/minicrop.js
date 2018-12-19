import Constrain from './constrain.js'
import Structure from './structure.js'
import Events from './events.js'

import {
  MARGIN,
  EVENT_CROP,
  EVENT_ZOOM,
  ACTION_CLASSES,
} from './constants.js'

class Minicrop {
  constructor(element) {
    if (!element) {
      // TODO: actually check element type
      throw new Error('The first argument is required and must be an <img> element.');
    }

    this.element = Structure.build(element)

    this.cropper = element.getElementsByClassName('crop')[0]
    this.image   = element.getElementsByClassName('image')[0]
    this.image.originalWidth  = this.image.offsetWidth
    this.image.originalHeight = this.image.offsetHeight

    this.rotated = false
    // this.options = assign({}, DEFAULTS, isPlainObject(options) && options);
    this.disabled = false
    this.ready = false
    this.moving = false
    this.zooming = false

    this.start  = { x: 0, y: 0 }
    this.offset = { x: 0, y: 0 }

    this.init()
  }

  init() {
    // this.load(url);

    // Events.bind(this)
    new Events(this)
    // TODO: run position after loading image
    this.position()

    let dot = document.createElement("div")
    dot.classList.add("debug-dot")
    this.cropper.appendChild(dot)
  }

  editing(type) {
    this[type] = true
    this.element.classList.add("edit", type)
  }

  edited(type) {
    this[type] = false
    this.element.classList.remove("edit", type, ACTION_CLASSES)
  }

  position() {
    let { image, element } = this

    this.offset = Constrain.move(this)

    image.style.top  = `${ this.offset.y }px`
    image.style.left = `${ this.offset.x }px`

    let cropEvent = new CustomEvent(EVENT_CROP, { detail: this.crop() })
    element.dispatchEvent(cropEvent)
  }

  zoom(scale, location) {
    let { image, element } = this

    this.scale = scale
    this.scale = Constrain.zoom(this)

    let newWidth  = image.originalWidth  * this.scale
    let newHeight = image.originalHeight * this.scale

    if (location) {
      this.offset.x -= (newWidth - image.offsetWidth)   * (location.x / image.offsetWidth)
      this.offset.y -= (newHeight - image.offsetHeight) * (location.y / image.offsetHeight)
    } else {
      this.offset.y -= (newHeight - image.offsetHeight) / 2
      this.offset.x -= (newWidth - image.offsetWidth)   / 2
    }

    image.style.width  = `${ newWidth  }px`
    image.style.height = `${ newHeight }px`

    let zoomEvent = new CustomEvent(EVENT_ZOOM, { detail: { zoom: this.scale } })
    element.dispatchEvent(zoomEvent)

    this.position()
  }

  crop() {
    const { image, cropper, rotated } = this

    return {
      x: image.offsetLeft - MARGIN,
      y: image.offsetTop - MARGIN,
      width: cropper.offsetWidth,
      height: cropper.offsetHeight,
      ratio: (image.naturalWidth / image.offsetWidth) || 1,
      rotated
    }
  }
}

export default Minicrop
