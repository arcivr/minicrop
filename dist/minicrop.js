/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/minicrop.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/*! exports provided: IN_BROWSER, WINDOW, EVENT_CROP, EVENT_CROP_END, EVENT_CROP_MOVE, EVENT_CROP_START, EVENT_DBLCLICK, EVENT_POINTER_DOWN, EVENT_POINTER_MOVE, EVENT_POINTER_UP, EVENT_READY, EVENT_RESIZE, EVENT_WHEEL, EVENT_ZOOM */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"IN_BROWSER\", function() { return IN_BROWSER; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"WINDOW\", function() { return WINDOW; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EVENT_CROP\", function() { return EVENT_CROP; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EVENT_CROP_END\", function() { return EVENT_CROP_END; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EVENT_CROP_MOVE\", function() { return EVENT_CROP_MOVE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EVENT_CROP_START\", function() { return EVENT_CROP_START; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EVENT_DBLCLICK\", function() { return EVENT_DBLCLICK; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EVENT_POINTER_DOWN\", function() { return EVENT_POINTER_DOWN; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EVENT_POINTER_MOVE\", function() { return EVENT_POINTER_MOVE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EVENT_POINTER_UP\", function() { return EVENT_POINTER_UP; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EVENT_READY\", function() { return EVENT_READY; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EVENT_RESIZE\", function() { return EVENT_RESIZE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EVENT_WHEEL\", function() { return EVENT_WHEEL; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EVENT_ZOOM\", function() { return EVENT_ZOOM; });\nvar IN_BROWSER = typeof window !== 'undefined';\nvar WINDOW = IN_BROWSER ? window : {};\n// export const NAMESPACE = 'minicrop'\n//\n// // Actions\n// export const ACTION_ALL = 'all'\n// export const ACTION_CROP = 'crop'\n// export const ACTION_MOVE = 'move'\n// export const ACTION_ZOOM = 'zoom'\n// export const ACTION_EAST = 'e'\n// export const ACTION_WEST = 'w'\n// export const ACTION_SOUTH = 's'\n// export const ACTION_NORTH = 'n'\n// export const ACTION_NORTH_EAST = 'ne'\n// export const ACTION_NORTH_WEST = 'nw'\n// export const ACTION_SOUTH_EAST = 'se'\n// export const ACTION_SOUTH_WEST = 'sw'\n//\n// // Classes\n// export const CLASS_CROP = `${NAMESPACE}-crop`\n// export const CLASS_DISABLED = `${NAMESPACE}-disabled`\n// export const CLASS_HIDDEN = `${NAMESPACE}-hidden`\n// export const CLASS_HIDE = `${NAMESPACE}-hide`\n// export const CLASS_INVISIBLE = `${NAMESPACE}-invisible`\n// export const CLASS_MODAL = `${NAMESPACE}-modal`\n// export const CLASS_MOVE = `${NAMESPACE}-move`\n//\n// // Data keys\n// export const DATA_ACTION = `${NAMESPACE}Action`\n// export const DATA_PREVIEW = `${NAMESPACE}Preview`\n\n// // Drag modes\n// export const DRAG_MODE_CROP = 'crop'\n// export const DRAG_MODE_MOVE = 'move'\n// export const DRAG_MODE_NONE = 'none'\n\n// Events\nvar EVENT_CROP = 'crop';\nvar EVENT_CROP_END = 'cropend';\nvar EVENT_CROP_MOVE = 'cropmove';\nvar EVENT_CROP_START = 'cropstart';\nvar EVENT_DBLCLICK = 'dblclick';\nvar EVENT_POINTER_DOWN = WINDOW.PointerEvent ? 'pointerdown' : 'touchstart mousedown';\nvar EVENT_POINTER_MOVE = WINDOW.PointerEvent ? 'pointermove' : 'touchmove mousemove';\nvar EVENT_POINTER_UP = WINDOW.PointerEvent ? 'pointerup pointercancel' : 'touchend touchcancel mouseup mouseout';\nvar EVENT_READY = 'ready';\nvar EVENT_RESIZE = 'resize';\nvar EVENT_WHEEL = 'wheel mousewheel DOMMouseScroll';\nvar EVENT_ZOOM = 'zoom';\n\n// // Mime types\n// export const MIME_TYPE_JPEG = 'image/jpeg'\n//\n// // RegExps\n// export const REGEXP_ACTIONS = /^(?:e|w|s|n|se|sw|ne|nw|all|crop|move|zoom)$/\n// export const REGEXP_DATA_URL = /^data:/\n// export const REGEXP_DATA_URL_JPEG = /^data:image\\/jpegbase64,/\n// export const REGEXP_TAG_NAME = /^(?:img|canvas)$/i\n\n//# sourceURL=webpack:///./src/constants.js?");

/***/ }),

/***/ "./src/constrain.js":
/*!**************************!*\
  !*** ./src/constrain.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar imageState = function imageState(image, canvas) {\n  var portrait = image.offsetHeight > image.offsetWidth;\n\n  // TODO: handle this\n  // if (category == \"Phone Cases\") {\n  //   portrait = this.rotated\n  // }\n\n  var longSide = 'offsetWidth';\n  var shortSide = 'offsetHeight';\n\n  if (portrait) {\n    longSide = 'offsetHeight';\n    shortSide = 'offsetWidth';\n  }\n\n  return {\n    portrait: portrait,\n    padded: image[shortSide] <= canvas[shortSide],\n    fitted: image[longSide] <= canvas[longSide] + 5\n  };\n};\n\nvar move = function move(image, canvas, movement) {\n  // Restrict top\n  if (movement.y > 0) {\n    movement.y = 0;\n  }\n\n  // Restrict bottom\n  var bottom = canvas.offsetHeight - image.offsetHeight;\n  if (movement.y < bottom) {\n    movement.y = bottom;\n  }\n\n  // Restrict left\n  if (movement.x > 0) {\n    movement.x = 0;\n  }\n\n  // Restrict right\n  var right = canvas.offsetWidth - image.offsetWidth;\n  if (movement.x < right) {\n    movement.x = right;\n  }\n\n  // Don't allow dragging photo sides into cropbox, centering short side\n  var state = imageState(image, canvas);\n  if (state.padded) {\n    if (state.portrait) {\n      // Set left to half of margin\n      movement.x = 0 + (canvas.offsetWidth - image.offsetWidth) / 2;\n    } else {\n      // Set top to half of margin\n      movement.y = 0 + (canvas.offsetHeight - image.offsetHeight) / 2;\n    }\n  }\n\n  return movement;\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  move: move,\n  imageState: imageState\n});\n\n//# sourceURL=webpack:///./src/constrain.js?");

/***/ }),

/***/ "./src/minicrop.js":
/*!*************************!*\
  !*** ./src/minicrop.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _constrain_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constrain.js */ \"./src/constrain.js\");\n/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants.js */ \"./src/constants.js\");\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n\n// import events from './events.js'\n\n\nvar Minicrop = function () {\n  function Minicrop(element) {\n    _classCallCheck(this, Minicrop);\n\n    if (!element) {\n      throw new Error('The first argument is required and must be an <img> or <canvas> element.');\n    }\n\n    // TODO:\n    // - Build our HTML\n    // - Handle zooming\n    // - return crop info\n    this.name = \"I MEAN REALLY\";\n    this.element = element;\n    this.cropper = element.getElementsByClassName('image')[0];\n\n    // this.options = assign({}, DEFAULTS, isPlainObject(options) && options);\n    // this.cropped = false;\n    // this.disabled = false;\n    this.crop = {};\n    this.ready = false;\n    // this.reloading = false;\n    // this.replaced = false;\n    // this.sized = false;\n    // this.sizing = false;\n\n    this.moving = false;\n\n    this.start = {\n      x: 0,\n      y: 0\n    };\n\n    this.offset = {\n      x: 0,\n      y: 0\n    };\n\n    this.init();\n  }\n\n  _createClass(Minicrop, [{\n    key: 'init',\n    value: function init() {\n      var _this = this;\n\n      var cropper = this.cropper;\n      // events.bind(element)\n      // this.load(url);\n\n      this.position();\n\n      _constants_js__WEBPACK_IMPORTED_MODULE_1__[\"EVENT_POINTER_DOWN\"].split(\" \").forEach(function (type) {\n        cropper.addEventListener(type, function (event) {\n          _this.moving = true;\n\n          var pointer = (event.targetTouches || event.changedTouches || [event])[0];\n          _this.start.x = pointer['clientX'] - _this.offset.x;\n          _this.start.y = pointer['clientY'] - _this.offset.y;\n\n          console.log(\"Touch start\", event);\n          event.preventDefault();\n        });\n      });\n\n      _constants_js__WEBPACK_IMPORTED_MODULE_1__[\"EVENT_POINTER_MOVE\"].split(\" \").forEach(function (type) {\n        cropper.addEventListener(type, function (event) {\n          if (!_this.moving) {\n            return;\n          }\n\n          var pointer = (event.targetTouches || event.changedTouches || [event])[0];\n          _this.offset.x = pointer['clientX'] - _this.start.x;\n          _this.offset.y = pointer['clientY'] - _this.start.y;\n\n          // console.log(this.offset.x, this.offset.y)\n\n          _this.position();\n          event.preventDefault();\n        });\n      });\n\n      _constants_js__WEBPACK_IMPORTED_MODULE_1__[\"EVENT_POINTER_UP\"].split(\" \").forEach(function (type) {\n        cropper.addEventListener(type, function (event) {\n          _this.moving = false;\n\n          console.log(\"Touch end\", event);\n\n          _this.position();\n          event.preventDefault();\n        });\n      });\n    }\n  }, {\n    key: 'position',\n    value: function position() {\n      var element = this.element,\n          cropper = this.cropper;\n\n\n      this.offset = _constrain_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].move(cropper, element, this.offset);\n\n      cropper.style.top = this.offset.y + 'px';\n      cropper.style.left = this.offset.x + 'px';\n    }\n  }]);\n\n  return Minicrop;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Minicrop);\n\n//# sourceURL=webpack:///./src/minicrop.js?");

/***/ })

/******/ });