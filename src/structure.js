const build = (root) => {
  // .minicrop
  //   image
  //   .overlay
  //   .crop // overlay: hidden
  //     image
  //
  //
  //
  // given an image
  // build a cropper
  //
  // Container (background)
  //   Full Size Image
  //   Fade Overlay
  //   Crop Box
  //     Visible Image
  //     Bleed
  //     Design Overlay

  // Build image
  let image = root.dataset.image
  let zoom  = root.dataset.zoom
  let structure = `
    <img src="${ image }" class="image" height="${ zoom }" />
    <div class="crop">
      <img src="${ image }" class="image-preview" height="${ zoom }" />
    </div>
  `

  root.innerHTML = structure

  // <div class="minicrop test-background default">
  //   <img class="image" src="./tests/fixtures/landscape.jpg" height="520" alt="">
  //   <!-- <div class="overlay"></div> -->
  //   <div class="crop">
  //     <img class="image-preview" src="./tests/fixtures/landscape.jpg" height="520" alt="">
  //     <!-- Bleed -->
  //     <!-- Design Overlay -->
  //   </div>
  // </div>

  return root
}

export default {
  build
}
