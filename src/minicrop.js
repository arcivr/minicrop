import Constrain from './constrain.js'
import Structure from './structure.js'
import Events from './events.js'

import {
  MARGIN,
  EVENT_CROP,
  EVENT_ZOOM,
  EVENT_READY,
  ACTION_CLASSES,
} from './constants.js'

class Minicrop {
  constructor(element) {
    if (!element) {
      // TODO: actually check element type
      throw new Error('The first argument is required and must be an <img> element.')
    }

    this.element = Structure.build(element)

    this.cropper = this.element.getElementsByClassName('crop')[0]
    this.image   = this.element.getElementsByClassName('image')[0]

    this.disabled = false
    this.ready = false
    this.moving = false
    this.zooming = false

    this.offset = { x: 0, y: 0 }
    this.scale = 1
    this.ratio = this.element.dataset.ratio || 1

    this.init()
  }

  init() {
    this.image.addEventListener("load", () => {
      this.scale = this.image.offsetWidth / this.image.naturalWidth || 1

      this.ready = true
      this.element.dispatchEvent(new CustomEvent(EVENT_READY))

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
    scale = 1 + scale
    this.zoomTo(this.scale * scale, location)
  }

  zoomTo(scale, location) {
    let { image, element, cropper, ready } = this

    if (!ready) {
      return
    }

    this.scale = scale
    this.scale = Constrain.zoom(this)

    let newWidth  = image.naturalWidth  * this.scale
    let newHeight = image.naturalHeight * this.scale

    if (!location) {
      location = {
        x: (-1 * image.offsetLeft) + (cropper.offsetWidth / 2) + MARGIN + 2,
        y: (-1 * image.offsetTop) + (cropper.offsetHeight / 2) + MARGIN + 2
      }
      console.log("no location", location)
    } else {
      console.log("location!", location)
    }

    this.offset.x -= (newWidth - image.offsetWidth)   * (location.x / image.offsetWidth)
    this.offset.y -= (newHeight - image.offsetHeight) * (location.y / image.offsetHeight)

    image.style.width  = `${ newWidth  }px`
    image.style.height = `${ newHeight }px`

    let zoomEvent = new CustomEvent(EVENT_ZOOM, { detail: { zoom: this.scale } })
    element.dispatchEvent(zoomEvent)

    this.position()
  }

  zoomToPadded() {
    let { minPadRatio } = Constrain.imageState(this)

    this.zoomTo(minPadRatio)
  }

  zoomToFitted() {
    let { minFitRatio } = Constrain.imageState(this)

    this.zoomTo(minFitRatio)
  }

  resize(ratio) {
    if (typeof ratio === "number") {
      this.ratio = ratio
    }

    this.ratio = this.ratio || 1

    let { element, cropper } = this
    const startWidth = cropper.offsetWidth

    element.style.width = `auto`

    let width = cropper.offsetWidth
    let height = (width * this.ratio) + MARGIN * 2
    element.style.height = `${ height }px`

    height = cropper.offsetHeight
    width = (height / this.ratio) + MARGIN * 2
    element.style.width = `${ width }px`

    let zoom = cropper.offsetWidth / startWidth
    this.zoom(zoom - 1)
  }

  setCrop(input) {
    let {
      x,
      y,
      height,
      width,
      scale
    } = input

    this.resize(height / width)

    let zoom = this.cropper.offsetHeight / height || scale
    this.zoomTo(zoom)

    let ratio = (this.image.naturalWidth / this.image.offsetWidth) || 1
    this.offset = {
      x: (x / ratio) + MARGIN,
      y: (y / ratio) + MARGIN
    }

    this.position()
  }

  crop() {
    const { image, cropper } = this

    let ratio = (image.naturalWidth / image.offsetWidth) || 1

    return {
      x: (image.offsetLeft - MARGIN) * ratio,
      y: (image.offsetTop - MARGIN) * ratio,
      width: cropper.offsetWidth * ratio,
      height: cropper.offsetHeight * ratio,
      scale: this.scale
    }
  }
}

export default Minicrop
