const imageState = (image, canvas) => {
  let portrait = image.offsetHeight > image.offsetWidth;

  // TODO: handle this
  // if (category == "Phone Cases") {
  //   portrait = this.rotated
  // }

  var longSide = 'offsetWidth';
  var shortSide = 'offsetHeight';

  if (portrait) {
    longSide = 'offsetHeight';
    shortSide = 'offsetWidth';
  }

  return {
    portrait,
    padded: image[shortSide] <= canvas[shortSide],
    fitted: image[longSide] <= canvas[longSide] + 5
  }
};

const move = (image, canvas, movement) => {
  // Restrict top
  if (movement.y > 0) {
    movement.y = 0;
  }

  // Restrict bottom
  let bottom = canvas.offsetHeight - image.offsetHeight;
  if (movement.y < bottom) {
    movement.y = bottom;
  }

  // Restrict left
  if (movement.x > 0) {
    movement.x = 0;
  }

  // Restrict right
  let right = canvas.offsetWidth - image.offsetWidth;
  if (movement.x < right) {
    movement.x = right;
  }

  // Don't allow dragging photo sides into cropbox, centering short side
  let state = imageState(image, canvas);
  if (state.padded) {
    if (state.portrait) {
      // Set left to half of margin
      movement.x = 0 + (canvas.offsetWidth - image.offsetWidth) / 2;
    } else {
      // Set top to half of margin
      movement.y = 0 + (canvas.offsetHeight - image.offsetHeight) / 2;
    }
  }

  return movement
};

var Constrain = {
  move,
  imageState
};

const IN_BROWSER = typeof window !== 'undefined';
const WINDOW = IN_BROWSER ? window : {};
const EVENT_POINTER_DOWN = WINDOW.PointerEvent ? 'pointerdown' : 'touchstart mousedown';
const EVENT_POINTER_MOVE = WINDOW.PointerEvent ? 'pointermove' : 'touchmove mousemove';
const EVENT_POINTER_UP = WINDOW.PointerEvent ? 'pointerup pointercancel' : 'touchend touchcancel mouseup mouseout';

// // Mime types
// export const MIME_TYPE_JPEG = 'image/jpeg'
//
// // RegExps
// export const REGEXP_ACTIONS = /^(?:e|w|s|n|se|sw|ne|nw|all|crop|move|zoom)$/
// export const REGEXP_DATA_URL = /^data:/
// export const REGEXP_DATA_URL_JPEG = /^data:image\/jpegbase64,/
// export const REGEXP_TAG_NAME = /^(?:img|canvas)$/i

class Minicrop {
  constructor(element) {
    if (!element) {
      throw new Error('The first argument is required and must be an <img> or <canvas> element.');
    }

    // TODO:
    // - Build our HTML
    // - Handle zooming
    // - return crop info
this.name = "I MEAN REALLY";
    this.element = element;
    this.cropper = element.getElementsByClassName('image')[0];

    // this.options = assign({}, DEFAULTS, isPlainObject(options) && options);
    // this.cropped = false;
    // this.disabled = false;
    this.crop = {};
    this.ready = false;
    // this.reloading = false;
    // this.replaced = false;
    // this.sized = false;
    // this.sizing = false;

    this.moving = false;

    this.start = {
      x: 0,
      y: 0
    };

    this.offset = {
      x: 0,
      y: 0
    };


    this.init();
  }

  init() {
    const { cropper } = this;
    // events.bind(element)
    // this.load(url);

    this.position();

    EVENT_POINTER_DOWN.split(" ").forEach(type => {
      cropper.addEventListener(type, event => {
        this.moving = true;

        let pointer = (event.targetTouches || event.changedTouches || [event])[0];
        this.start.x = pointer['clientX'] - this.offset.x;
        this.start.y = pointer['clientY'] - this.offset.y;

        console.log("Touch start", event);
        event.preventDefault();
      });
    });

    EVENT_POINTER_MOVE.split(" ").forEach(type => {
      cropper.addEventListener(type, event => {
        if (!this.moving) {
          return
        }

        let pointer = (event.targetTouches || event.changedTouches || [event])[0];
        this.offset.x = pointer['clientX'] - this.start.x;
        this.offset.y = pointer['clientY'] - this.start.y;

// console.log(this.offset.x, this.offset.y)

        this.position();
        event.preventDefault();
      });
    });

    EVENT_POINTER_UP.split(" ").forEach(type => {
      cropper.addEventListener(type, event => {
        this.moving = false;

        console.log("Touch end", event);

        this.position();
        event.preventDefault();
      });
    });
  }

  position() {
    const { element, cropper } = this;

    this.offset = Constrain.move(cropper, element, this.offset);

    cropper.style.top  = `${ this.offset.y }px`;
    cropper.style.left = `${ this.offset.x }px`;
  }
}

export default Minicrop;
