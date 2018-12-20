const build = (root) => {
  // Root Element
  //   Image
  //   Crop + Fade Overlay

  let image = root.dataset.image
  let zoom  = root.dataset.zoom || "100%"

  root.innerHTML = `
    <img src="${ image }" class="image" height="${ zoom }" />
    <div class="crop"></div>
  `

  return root
}

export default {
  build
}
