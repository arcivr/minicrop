import Constrain from './constrain.js'
// import events from './events.js'
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

class Minicrop {

  constructor(id) {
    if (!id) {
      throw new Error('The first argument is required and must be an <img> or <canvas> id.');
    }

    // TODO:
    // - Build our HTML
    // - Handle zooming
    // - return crop info

    this.element = document.getElementById(id)
    // this.options = assign({}, DEFAULTS, isPlainObject(options) && options);
    // this.cropped = false;
    // this.disabled = false;
    this.crop = {}
    this.ready = false
    // this.reloading = false;
    // this.replaced = false;
    // this.sized = false;
    // this.sizing = false;

    this.moving = false

    this.start = {
      x: 0,
      y: 0
    }

    this.offset = {
      x: 0,
      y: 0
    }


    this.init()
  }

  init() {
    const { element } = this
    // events.bind(element)

    // this.load(url);

    let cropper = element.getElementsByClassName('image')[0]

    EVENT_POINTER_DOWN.split(" ").forEach(type => {
      cropper.addEventListener(type, event => {
        this.moving = true

        let pointer = (event.targetTouches || event.changedTouches || [event])[0]
        this.start.x = pointer['clientX'] - this.offset.x
        this.start.y = pointer['clientY'] - this.offset.y


        this.offset = Constrain.move(cropper, element, this.offset)


                console.log("before", this.offset.y, cropper.style.top)
        cropper.style.top  = `${ this.offset.y }px`
        cropper.style.left = `${ this.offset.x }px`

                console.log("after", this.offset.y, cropper.style.top)

        console.log("Touch start", event)
        event.preventDefault()
      })
    })

    EVENT_POINTER_MOVE.split(" ").forEach(type => {
      cropper.addEventListener(type, event => {
        if (!this.moving) {
          return
        }

        let pointer = (event.targetTouches || event.changedTouches || [event])[0]
        this.offset.x = pointer['clientX'] - this.start.x
        this.offset.y = pointer['clientY'] - this.start.y

// console.log(this.offset.x, this.offset.y)

        this.offset = Constrain.move(cropper, element, this.offset)

        cropper.style.top  = `${ this.offset.y }px`
        cropper.style.left = `${ this.offset.x }px`

        // console.log("Touch change", event)
        event.preventDefault()
      })
    })

    EVENT_POINTER_UP.split(" ").forEach(type => {
      cropper.addEventListener(type, event => {
        this.moving = false

        console.log("Touch end", event)

        console.log("end", this.offset.y, cropper.style.top)

        this.offset = Constrain.move(cropper, element, this.offset)

        cropper.style.top  = `${ this.offset.y }px`
        cropper.style.left = `${ this.offset.x }px`

        event.preventDefault()
      })
    })
  }
}

export default Minicrop
