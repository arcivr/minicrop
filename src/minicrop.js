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

    Events.bind(this)
    // TODO: run position after loading image
    this.position()
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

  zoom(scale) {
    let { image, element } = this

    this.scale = scale
    this.scale = Constrain.zoom(this)

    image.style.width  = `${ image.originalWidth  * this.scale }px`
    image.style.height = `${ image.originalHeight * this.scale }px`

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
