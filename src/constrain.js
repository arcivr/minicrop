import {
  ZOOM_MAXIMUM
} from './constants.js'

const imageState = (minicrop, scale) => {
  scale = Math.max(scale || minicrop.scale || 1, 0.000001)
  let { cropper } = minicrop

  let natural = {
    offsetWidth: minicrop.image.naturalWidth,
    offsetHeight: minicrop.image.naturalHeight
  }

  let image = {
    offsetWidth: natural.offsetWidth * scale,
    offsetHeight: natural.offsetHeight * scale
  }

  let portrait = image.offsetHeight > image.offsetWidth

  let heightRatio = image.offsetHeight / cropper.offsetHeight
  let widthRatio = image.offsetWidth / cropper.offsetWidth
  let minHeightRatio = cropper.offsetHeight / natural.offsetHeight
  let minWidthRatio = cropper.offsetWidth / natural.offsetWidth

  let ratioPortrait =  heightRatio > widthRatio

  let padRatio = heightRatio
  let fitRatio = widthRatio
  let minPadRatio = minHeightRatio
  let minFitRatio = minWidthRatio

  if (ratioPortrait) {
    padRatio = widthRatio
    fitRatio = heightRatio
    minPadRatio = minWidthRatio
    minFitRatio = minHeightRatio
  }

  return {
    scale,
    portrait,
    padRatio,
    fitRatio,
    minPadRatio,
    minFitRatio,
    ratioPortrait,
    padded: padRatio <= 1,
    fitted: fitRatio <= 1
  }
}

const move = (minicrop) => {
  let { image, cropper, offset: movement } = minicrop

  let scale = minicrop.scale || 1
  let imageHeight = image.naturalHeight * scale
  let imageWidth  = image.naturalWidth * scale

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
    if (state.ratioPortrait) {
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
  var scale = minicrop.scale || 1
  let state = imageState(minicrop, scale)

  scale = Math.min(scale, ZOOM_MAXIMUM)

  // Only allow zoom out until fitting the longest size, centering.
  if (state.fitted) {
    scale = state.minFitRatio
  }

  return scale
}

const coordinates = ({ clientX, clientY }, element) => {
  let { top, left } = element.getBoundingClientRect()

  return {
    clientX: Math.max(clientX - left, 0),
    clientY: Math.max(clientY - top, 0)
  }
}

export default {
  move,
  zoom,
  imageState,
  coordinates
}
