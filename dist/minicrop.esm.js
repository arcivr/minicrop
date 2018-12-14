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
  if (movement.y > canvas.offsetTop) {
    movement.y = canvas.offsetTop;
  }

  // Restrict bottom
  let bottom = canvas.offsetTop + canvas.offsetHeight - image.offsetHeight;
  if (movement.y < bottom) {
    movement.y = bottom;
  }

  // Restrict left
  if (movement.x > canvas.offsetLeft) {
    movement.x = canvas.offsetLeft;
  }

  // Restrict right
  let right = canvas.offsetLeft + canvas.offsetWidth - image.offsetWidth;
  if (movement.x < right) {
    movement.x = right;
  }

  // Don't allow dragging photo sides into cropbox, centering short side
  let state = imageState(image, canvas);
  if (state.padded) {
    if (state.portrait) {
      // Set left to half of margin
      movement.x = canvas.offsetLeft + ((canvas.offsetWidth - image.offsetWidth) / 2);
    } else {
      // Set top to half of margin
      movement.y = canvas.offsetTop + ((canvas.offsetHeight - image.offsetHeight) / 2);
    }
  }

  // movement.y += canvas.offsetTop
  // movement.x += canvas.offsetLeft

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

    this.element = element;
    this.image = element.getElementsByClassName('image')[0];
    this.cropper = element.getElementsByClassName('crop')[0];
    this.preview = element.getElementsByClassName('image-preview')[0];

    // this.options = assign({}, DEFAULTS, isPlainObject(options) && options);
    // this.cropped = false;
    // this.disabled = false;
    this.crop = {};
    this.ready = false;

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
    const { image } = this;
    // events.bind(element)
    // this.load(url);

    this.position();

    this.element.addEventListener("mouseover", () => {
      this.element.classList.remove("preview");
    });


    EVENT_POINTER_DOWN.split(" ").forEach(type => {
      image.addEventListener(type, event => {
        this.moving = true;
        this.element.classList.remove("preview");

        let pointer = (event.targetTouches || event.changedTouches || [event])[0];
        this.start.x = pointer['clientX'] - this.offset.x;
        this.start.y = pointer['clientY'] - this.offset.y;

        console.log("Touch start", event);
        event.preventDefault();
      });
    });

    EVENT_POINTER_MOVE.split(" ").forEach(type => {
      image.addEventListener(type, event => {
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
      image.addEventListener(type, event => {
        this.moving = false;
        this.element.classList.add("preview");

        console.log("Touch end", event);

        this.position();
        event.preventDefault();
      });
    });
  }

  position() {
    const { cropper, image, preview } = this;

    this.offset = Constrain.move(image, cropper, this.offset);

    image.style.top  = `${ this.offset.y }px`;
    image.style.left = `${ this.offset.x }px`;

    if (preview) {
      preview.style.top  = `${ this.offset.y - 42 }px`;
      preview.style.left = `${ this.offset.x - 42 }px`;
    }
  }
}

export default Minicrop;
