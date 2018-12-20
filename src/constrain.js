import {
  ZOOM_MAXIMUM
} from './constants.js'

const imageState = (minicrop, scale) => {
  let ratio = scale || minicrop.scale || 1
  let { cropper } = minicrop

  let original = {
    offsetWidth: minicrop.image.originalWidth,
    offsetHeight: minicrop.image.originalHeight
  }

  let image = {
    offsetWidth: original.offsetWidth * ratio,
    offsetHeight: original.offsetHeight * ratio
  }

  let portrait = image.offsetHeight > image.offsetWidth

  // TODO: handle this
  // if (category == "Phone Cases") {
  //   portrait = this.rotated
  // }

  var longSide = 'offsetWidth'
  var shortSide = 'offsetHeight'

  if (portrait) {
    longSide = 'offsetHeight'
    shortSide = 'offsetWidth'
  }

  let padRatio = image[shortSide] / cropper[shortSide]
  let fitRatio = image[longSide] / cropper[longSide]

  return {
    scale: ratio,
    portrait,
    padRatio,
    fitRatio,
    minPadRatio: cropper[shortSide] / original[shortSide],
    minFitRatio: cropper[longSide] / original[longSide],
    padded: padRatio <= 1,
    fitted: fitRatio <= 1
  }
}

const move = (minicrop) => {
  let { image, cropper, offset: movement } = minicrop

  let scale = minicrop.scale || 1
  let imageHeight = image.originalHeight * scale
  let imageWidth  = image.originalWidth * scale


  // Restrict top
  if (movement.y > cropper.offsetTop) {
    movement.y = cropper.offsetTop
  }

  // Restrict bottom
  let bottom = cropper.offsetTop + cropper.offsetHeight - imageHeight
  if (movement.y < bottom) {
    movement.y = bottom
  }

  // Restrict left
  if (movement.x > cropper.offsetLeft) {
    movement.x = cropper.offsetLeft
  }

  // Restrict right
  let right = cropper.offsetLeft + cropper.offsetWidth - imageWidth
  if (movement.x < right) {
    movement.x = right
  }

  // Don't allow dragging photo sides into cropbox, centering short side
  let state = imageState(minicrop)
  if (state.padded) {
    if (state.portrait) {
      // Set left to half of margin
      movement.x = cropper.offsetLeft + ((cropper.offsetWidth - imageWidth) / 2)
    } else {
      // Set top to half of margin
      movement.y = cropper.offsetTop + ((cropper.offsetHeight - imageHeight) / 2)
    }
  }

  return movement
}

const zoom = (minicrop) => {
  var scale = Math.abs(minicrop.scale || 1)
  let state = imageState(minicrop, scale)

  scale = Math.min(scale, ZOOM_MAXIMUM)
  
  // Only allow zoom out until fitting the longest size, centering.
  if (state.fitted) {
    scale = state.minFitRatio
  }

  return scale
}

export default {
  move,
  zoom,
  imageState
}
