const imageState = (image, canvas) => {
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

  return {
    portrait,
    padded: image[shortSide] <= canvas[shortSide],
    fitted: image[longSide] <= canvas[longSide] + 5
  }
}

const move = (image, canvas, movement) => {
  // Restrict top
  if (movement.y > canvas.offsetTop) {
    movement.y = canvas.offsetTop
  }

  // Restrict bottom
  let bottom = canvas.offsetTop + canvas.offsetHeight - image.offsetHeight
  if (movement.y < bottom) {
    movement.y = bottom
  }

  // Restrict left
  if (movement.x > canvas.offsetLeft) {
    movement.x = canvas.offsetLeft
  }

  // Restrict right
  let right = canvas.offsetLeft + canvas.offsetWidth - image.offsetWidth
  if (movement.x < right) {
    movement.x = right
  }

  // Don't allow dragging photo sides into cropbox, centering short side
  let state = imageState(image, canvas)
  if (state.padded) {
    if (state.portrait) {
      // Set left to half of margin
      movement.x = canvas.offsetLeft + ((canvas.offsetWidth - image.offsetWidth) / 2)
    } else {
      // Set top to half of margin
      movement.y = canvas.offsetTop + ((canvas.offsetHeight - image.offsetHeight) / 2)
    }
  }

  // movement.y += canvas.offsetTop
  // movement.x += canvas.offsetLeft

  return movement
}

export default {
  move,
  imageState
}
