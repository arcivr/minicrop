import Constrain from './constrain.js'
import Structure from './structure.js'

import {
  MARGIN,
  EVENT_CROP,
  // EVENT_CROP_END,
  // EVENT_CROP_MOVE,
  // EVENT_CROP_START,
  EVENT_POINTER_DOWN,
  EVENT_POINTER_MOVE,
  EVENT_POINTER_UP,
  // EVENT_RESIZE,
  // EVENT_WHEEL,
  // EVENT_ZOOM,
} from './constants.js'

class Minicrop {
  constructor(element) {
    if (!element) {
      throw new Error('The first argument is required and must be an <img> element.');
    }

    // TODO:
    // - Build our HTML
    // - Handle zooming
    // - return crop info

    this.element = Structure.build(element)
    this.image = element.getElementsByClassName('image')[0]
    this.cropper = element.getElementsByClassName('crop')[0]

    this.rotated = false
    // this.options = assign({}, DEFAULTS, isPlainObject(options) && options);
    this.disabled = false
    this.ready = false
    this.moving = false

    this.start  = { x: 0, y: 0 }
    this.offset = { x: 0, y: 0 }

    this.init()
  }

  init() {
    const { image } = this
    // events.bind(element)
    // this.load(url);

    this.position()

    this.element.addEventListener("mouseover", () => {
      this.element.classList.remove("preview")
    })


    EVENT_POINTER_DOWN.split(" ").forEach(type => {
      image.addEventListener(type, event => {
        if (this.disabled) {
          return
        }

        this.moving = true
        this.element.classList.add("edit")

        let pointer = (event.targetTouches || event.changedTouches || [event])[0]
        this.start.x = pointer['clientX'] - this.offset.x
        this.start.y = pointer['clientY'] - this.offset.y

        // console.log("Touch start", event, type)
        event.preventDefault()
      })
    })

    EVENT_POINTER_MOVE.split(" ").forEach(type => {
      image.addEventListener(type, event => {
        if (this.disabled || !this.moving) {
          return
        }

        // console.log("Touch Move", type)

        let pointer = (event.targetTouches || event.changedTouches || [event])[0]
        this.offset.x = pointer['clientX'] - this.start.x
        this.offset.y = pointer['clientY'] - this.start.y

        this.position()
        event.preventDefault()
      })
    })

    EVENT_POINTER_UP.split(" ").forEach(type => {
      image.addEventListener(type, event => {
        this.moving = false
        this.element.classList.remove("edit")

        // console.log("Touch end", type, event)

        this.position()
        event.preventDefault()
      })
    })
  }

  position() {
    const { cropper, image } = this

    this.offset = Constrain.move(image, cropper, this.offset)

    image.style.top  = `${ this.offset.y }px`
    image.style.left = `${ this.offset.x }px`

    let cropEvent = new CustomEvent(EVENT_CROP, { detail: this.crop() })
    this.element.dispatchEvent(cropEvent)
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
