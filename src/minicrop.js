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

    this.disabled = false
    this.ready = false
    this.moving = false
    this.zooming = false

    this.start  = { x: 0, y: 0 }
    this.offset = { x: 0, y: 0 }
    this.scale = 1
    this.ratio = this.element.dataset.ratio || 1

    this.init()
  }

  init() {
    this.image.addEventListener("load", () => {
      this.image.originalWidth  = this.image.offsetWidth
      this.image.originalHeight = this.image.offsetHeight

      this.ready = true

      this.position()
      this.resize()
    })

    this.events = new Events(this)
  }

  editing(type) {
    if (!this.ready) {
      return
    }

    this[type] = true
    this.element.classList.add("edit", type)
  }

  edited(type) {
    this[type] = false
    this.element.classList.remove("edit", type, ACTION_CLASSES)
  }

  position() {
    let { image, element, ready } = this

    if (!ready) {
      return
    }

    this.offset = Constrain.move(this)

    image.style.top  = `${ this.offset.y }px`
    image.style.left = `${ this.offset.x }px`

    let cropEvent = new CustomEvent(EVENT_CROP, { detail: this.crop() })
    element.dispatchEvent(cropEvent)
  }

  zoom(scale, location) {
    this.zoomTo(this.scale + scale, location)
  }

  zoomTo(scale, location) {
    let { image, element, ready } = this

    if (!ready) {
      return
    }

    this.scale = scale
    this.scale = Constrain.zoom(this)

    let newWidth  = image.originalWidth  * this.scale
    let newHeight = image.originalHeight * this.scale

    if (location) {
      this.offset.x -= (newWidth - image.offsetWidth)   * (location.x / image.offsetWidth)
      this.offset.y -= (newHeight - image.offsetHeight) * (location.y / image.offsetHeight)
    } else {
      this.offset.x -= (newWidth - image.offsetWidth)   / 2
      this.offset.y -= (newHeight - image.offsetHeight) / 2
    }

    image.style.width  = `${ newWidth  }px`
    image.style.height = `${ newHeight }px`

    let zoomEvent = new CustomEvent(EVENT_ZOOM, { detail: { zoom: this.scale } })
    element.dispatchEvent(zoomEvent)

    this.position()
  }

  resize(ratio) {
    this.ratio = ratio || this.ratio || 1

    let { element } = this

    element.style.height = `${ element.offsetWidth * this.ratio }px`

    this.position()
  }

  crop() {
    const { image, cropper } = this

    return {
      x: image.offsetLeft - MARGIN,
      y: image.offsetTop - MARGIN,
      width: cropper.offsetWidth,
      height: cropper.offsetHeight,
      ratio: (image.naturalWidth / image.offsetWidth) || 1
    }
  }
}

export default Minicrop
