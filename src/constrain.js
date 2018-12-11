const move = (image, canvas, movement) => {
  let cropBox = canvas || {
    width: 750,
    height: 750
  }

  let hit = {
    top: image.offsetTop >= 0,
    bottom: image.offsetTop + image.height <= cropBox.height,
    left: image.offsetLeft >= 0,
    right: image.offsetLeft + image.width <= cropBox.width
  }

  // Restrict top
  // if (hit.top) {
  // if (hit.top && movement.y > 0) {
  if (movement.y > 0) {
    movement.y = 0
  }

  // Restrict bottom
  // if (hit.bottom) {
    let bottom = cropBox.height - image.height

    if (movement.y < bottom) {
      movement.y = bottom
    }
  // }

  // Restrict left
  // if (hit.left && movement.x > 0) {
  if (movement.x > 0) {
    movement.x = 0
  }

  // Restrict right
  // if (hit.right) {
    let right = cropBox.width - image.width

    if (movement.x < right) {
      movement.x = right
    }
  // }

  // Don't allow dragging photo sides into cropbox, centering short side
  // if (this.padded) {
  //   if (portrait) {
  //     cropUpdate.left = 0 + (cropBox.width - image.width) / 2
  //   } else {
  //     cropUpdate.top = 0 + (cropBox.height - image.height) / 2
  //   }
  // }

  return movement
}

export default {
  move
}
