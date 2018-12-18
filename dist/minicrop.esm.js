var MARGIN = 40;
var ZOOM_MAXIMUM = 5;

// Classes
var CLASS_MOVING = "moving";
var CLASS_ZOOMING = "zooming";
var ACTION_CLASSES = [CLASS_MOVING, CLASS_ZOOMING];

// Events
var EVENT_CROP = 'crop';
var EVENT_ZOOM = 'zoom';

var EVENT_POINTER_DOWN = 'touchstart mousedown';
var EVENT_POINTER_MOVE = 'touchmove mousemove';
var EVENT_POINTER_UP = 'touchend touchcancel mouseup mouseout';
var EVENT_RESIZE = 'resize';
var EVENT_WHEEL = 'wheel';

var imageState = function imageState(minicrop, scale) {
  var ratio = scale || minicrop.scale || 1;
  var cropper = minicrop.cropper;


  var original = {
    offsetWidth: minicrop.image.originalWidth,
    offsetHeight: minicrop.image.originalHeight
  };

  var image = {
    offsetWidth: original.offsetWidth * ratio,
    offsetHeight: original.offsetHeight * ratio
  };

  var portrait = image.offsetHeight > image.offsetWidth;

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

  var padRatio = image[shortSide] / cropper[shortSide];
  var fitRatio = image[longSide] / cropper[longSide];

  return {
    scale: ratio,
    portrait: portrait,
    padRatio: padRatio,
    fitRatio: fitRatio,
    minPadRatio: cropper[shortSide] / original[shortSide],
    minFitRatio: cropper[longSide] / original[longSide],
    padded: padRatio <= 1,
    fitted: fitRatio <= 1
  };
};

var move = function move(minicrop) {
  var image = minicrop.image,
      cropper = minicrop.cropper,
      movement = minicrop.offset;


  var scale = minicrop.scale || 1;
  var imageHeight = image.originalHeight * scale;
  var imageWidth = image.originalWidth * scale;

  // Restrict top
  if (movement.y > cropper.offsetTop) {
    movement.y = cropper.offsetTop;
  }

  // Restrict bottom
  var bottom = cropper.offsetTop + cropper.offsetHeight - imageHeight;
  if (movement.y < bottom) {
    movement.y = bottom;
  }

  // Restrict left
  if (movement.x > cropper.offsetLeft) {
    movement.x = cropper.offsetLeft;
  }

  // Restrict right
  var right = cropper.offsetLeft + cropper.offsetWidth - imageWidth;
  if (movement.x < right) {
    movement.x = right;
  }

  // Don't allow dragging photo sides into cropbox, centering short side
  var state = imageState(minicrop);
  if (state.padded) {
    if (state.portrait) {
      // Set left to half of margin
      movement.x = cropper.offsetLeft + (cropper.offsetWidth - imageWidth) / 2;
    } else {
      // Set top to half of margin
      movement.y = cropper.offsetTop + (cropper.offsetHeight - imageHeight) / 2;
    }
  }

  return movement;
};

var zoom = function zoom(minicrop) {
  var scale = Math.abs(minicrop.scale || 1);
  var state = imageState(minicrop, scale);

  scale = Math.min(scale, ZOOM_MAXIMUM);

  // Only allow zoom out until fitting the longest size, centering.
  if (state.fitted) {
    scale = state.minFitRatio;
  }

  return scale;
};

var coordinates = function coordinates(_ref, element) {
  var clientX = _ref.clientX,
      clientY = _ref.clientY;

  var _element$getBoundingC = element.getBoundingClientRect(),
      top = _element$getBoundingC.top,
      left = _element$getBoundingC.left;

  return {
    clientX: Math.max(clientX - left, 0),
    clientY: Math.max(clientY - top, 0)
  };
};

var Constrain = {
  move: move,
  zoom: zoom,
  imageState: imageState,
  coordinates: coordinates
};

var build = function build(root) {
  // Root Element
  //   Image
  //   Crop + Fade Overlay

  var image = root.dataset.image;
  var zoom = root.dataset.zoom || "100%";

  root.innerHTML = "\n    <img src=\"" + image + "\" class=\"image\" height=\"" + zoom + "\" />\n    <div class=\"crop\"></div>\n  ";

  return root;
};

var Structure = {
  build: build
};

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Events = function () {
  function Events(minicrop) {
    _classCallCheck(this, Events);

    this.minicrop = minicrop;
    this.editingTimeout = null;
    this.pointerOffset = 0;
    this.maxZoomStep = 300;

    this.bind();
  }

  _createClass(Events, [{
    key: 'bind',
    value: function bind() {
      var _this = this;

      var element = this.minicrop.element;


      window.addEventListener(EVENT_RESIZE, this);

      Array(EVENT_WHEEL, EVENT_POINTER_DOWN, EVENT_POINTER_MOVE, EVENT_POINTER_UP).join(" ").split(" ").forEach(function (type) {
        element.addEventListener(type, _this);
      });
    }
  }, {
    key: 'unbind',
    value: function unbind() {
      var _this2 = this;

      var element = this.minicrop.element;


      window.removeEventListener(EVENT_RESIZE, this);

      Array(EVENT_WHEEL, EVENT_POINTER_DOWN, EVENT_POINTER_MOVE, EVENT_POINTER_UP).join(" ").split(" ").forEach(function (type) {
        element.removeEventListener(type, _this2);
      });
    }

    // Dragging

  }, {
    key: 'dragStart',
    value: function dragStart(event) {
      event.preventDefault();

      var _minicrop = this.minicrop,
          start = _minicrop.start,
          offset = _minicrop.offset;


      if (this.minicrop.disabled) {
        return;
      }

      var pointers = event.targetTouches || event.changedTouches || [event];
      if (pointers.length > 1) {
        this.pointerOffset = this.getPointerDistance(pointers);

        return;
      }

      this.minicrop.editing(CLASS_MOVING);

      var pointer = pointers[0];
      start.x = pointer['clientX'] - offset.x;
      start.y = pointer['clientY'] - offset.y;
    }
  }, {
    key: 'dragMove',
    value: function dragMove(event) {
      event.preventDefault();

      if (this.minicrop.disabled) {
        return;
      }

      var _minicrop2 = this.minicrop,
          start = _minicrop2.start,
          offset = _minicrop2.offset;


      var pointers = event.targetTouches || event.changedTouches || [event];
      if (pointers.length > 1) {
        this.pinch(pointers);

        return;
      }

      if (!this.minicrop.moving) {
        return;
      }

      var pointer = pointers[0];
      offset.x = pointer['clientX'] - start.x;
      offset.y = pointer['clientY'] - start.y;

      this.minicrop.position();
    }
  }, {
    key: 'dragEnd',
    value: function dragEnd(event) {
      this.minicrop.edited(CLASS_MOVING);
      this.minicrop.position();
      event.preventDefault();
    }

    // Zooming

  }, {
    key: 'pinch',
    value: function pinch(pointers, scale, center) {
      scale = scale || this.getPointerDistance(pointers);
      center = center || this.getPointersCenter(pointers);

      var zoomEvent = new CustomEvent("zoom");
      zoomEvent.deltaY = -1 * (scale - this.pointerOffset);

      this.zoom(zoomEvent, center);
      this.pointerOffset = scale;
    }
  }, {
    key: 'zoom',
    value: function zoom(event, center) {
      var _this3 = this;

      event.preventDefault();
      var step = Math.min(Math.abs(event.deltaY), this.maxZoomStep);

      if (this.minicrop.disabled || step <= .1) {
        return;
      }

      this.minicrop.editing(CLASS_ZOOMING);

      // Scrolling up zooms out, scrolling down zooms in
      var direction = event.deltaY > 0 ? -1 : 1;
      var smoothing = this.maxZoomStep;

      if (event.ctrlKey) {
        smoothing /= 3;
      }

      if (!center) {
        center = { x: event.offsetX, y: event.offsetY };
      }

      var delta = direction * step / smoothing;

      this.minicrop.zoom(delta, center);

      if (this.editingTimeout) {
        clearTimeout(this.editingTimeout);
      }

      this.editingTimeout = setTimeout(function () {
        _this3.minicrop.edited(CLASS_ZOOMING);
      }, 200);
    }

    // Utilities

  }, {
    key: 'getPointerDistance',
    value: function getPointerDistance(pointers) {
      var _pointers$ = pointers[0],
          x1 = _pointers$.clientX,
          y1 = _pointers$.clientY;
      var _pointers$2 = pointers[1],
          x2 = _pointers$2.clientX,
          y2 = _pointers$2.clientY;


      var distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
      return distance * 2;
    }
  }, {
    key: 'getPointersCenter',
    value: function getPointersCenter(pointers) {
      var image = this.minicrop.image;


      var x = 0;
      var y = 0;
      var count = 0;

      Array.from(pointers).forEach(function (pointer) {
        var _Constrain$coordinate = Constrain.coordinates(pointer, image),
            clientX = _Constrain$coordinate.clientX,
            clientY = _Constrain$coordinate.clientY;

        x += clientX;
        y += clientY;
        count += 1;
      });

      x /= count;
      y /= count;

      return {
        x: x,
        y: y
      };
    }
  }, {
    key: 'handleEvent',
    value: function handleEvent(event) {
      if (EVENT_RESIZE.includes(event.type)) {
        this.minicrop.resize(event);
      }

      if (EVENT_WHEEL.includes(event.type)) {
        this.zoom(event);
      }

      if (EVENT_POINTER_DOWN.includes(event.type)) {
        this.dragStart(event);
      }

      if (EVENT_POINTER_MOVE.includes(event.type)) {
        this.dragMove(event);
      }

      if (EVENT_POINTER_UP.includes(event.type)) {
        this.dragEnd(event);
      }
    }
  }]);

  return Events;
}();

var _createClass$1 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Minicrop = function () {
  function Minicrop(element) {
    _classCallCheck$1(this, Minicrop);

    if (!element) {
      // TODO: actually check element type
      throw new Error('The first argument is required and must be an <img> element.');
    }

    this.element = Structure.build(element);

    this.cropper = element.getElementsByClassName('crop')[0];
    this.image = element.getElementsByClassName('image')[0];

    this.disabled = false;
    this.ready = false;
    this.moving = false;
    this.zooming = false;

    this.start = { x: 0, y: 0 };
    this.offset = { x: 0, y: 0 };
    this.scale = 1;
    this.ratio = this.element.dataset.ratio || 1;

    this.init();
  }

  _createClass$1(Minicrop, [{
    key: 'init',
    value: function init() {
      var _this = this;

      this.image.addEventListener("load", function () {
        _this.image.originalWidth = _this.image.offsetWidth;
        _this.image.originalHeight = _this.image.offsetHeight;

        _this.ready = true;

        _this.position();
        _this.resize();
      });

      this.events = new Events(this);
    }
  }, {
    key: 'editing',
    value: function editing(type) {
      if (!this.ready) {
        return;
      }

      this[type] = true;
      this.element.classList.add("edit", type);
    }
  }, {
    key: 'edited',
    value: function edited(type) {
      this[type] = false;
      this.element.classList.remove("edit", type, ACTION_CLASSES);
    }
  }, {
    key: 'position',
    value: function position() {
      var image = this.image,
          element = this.element,
          ready = this.ready;


      if (!ready) {
        return;
      }

      this.offset = Constrain.move(this);

      image.style.top = this.offset.y + 'px';
      image.style.left = this.offset.x + 'px';

      var cropEvent = new CustomEvent(EVENT_CROP, { detail: this.crop() });
      element.dispatchEvent(cropEvent);
    }
  }, {
    key: 'zoom',
    value: function zoom(scale, location) {
      this.zoomTo(this.scale + scale, location);
    }
  }, {
    key: 'zoomTo',
    value: function zoomTo(scale, location) {
      var image = this.image,
          element = this.element,
          ready = this.ready;


      if (!ready) {
        return;
      }

      this.scale = scale;
      this.scale = Constrain.zoom(this);

      var newWidth = image.originalWidth * this.scale;
      var newHeight = image.originalHeight * this.scale;

      if (location) {
        this.offset.x -= (newWidth - image.offsetWidth) * (location.x / image.offsetWidth);
        this.offset.y -= (newHeight - image.offsetHeight) * (location.y / image.offsetHeight);
      } else {
        this.offset.x -= (newWidth - image.offsetWidth) / 2;
        this.offset.y -= (newHeight - image.offsetHeight) / 2;
      }

      image.style.width = newWidth + 'px';
      image.style.height = newHeight + 'px';

      var zoomEvent = new CustomEvent(EVENT_ZOOM, { detail: { zoom: this.scale } });
      element.dispatchEvent(zoomEvent);

      this.position();
    }
  }, {
    key: 'resize',
    value: function resize(ratio) {
      this.ratio = ratio || this.ratio || 1;

      var element = this.element;


      element.style.height = element.offsetWidth * this.ratio + 'px';

      this.position();
    }
  }, {
    key: 'crop',
    value: function crop() {
      var image = this.image,
          cropper = this.cropper;


      return {
        x: image.offsetLeft - MARGIN,
        y: image.offsetTop - MARGIN,
        width: cropper.offsetWidth,
        height: cropper.offsetHeight,
        ratio: image.naturalWidth / image.offsetWidth || 1
      };
    }
  }]);

  return Minicrop;
}();

export default Minicrop;
