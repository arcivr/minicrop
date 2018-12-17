const build = (root) => {
  // .minicrop
  //   image
  //   .crop // overlay: hidden
  //     image
  //
  //
  // Container (background)
  //   Full Size Image
  //   Crop Box + Fade Overlay
  //     Visible Image
  //     Bleed
  //     Design Overlay

  // Build image
  let image = root.dataset.image
  let zoom  = root.dataset.zoom || "100%"
  let ratio = root.dataset.ratio || 1

  // root.style.paddingTop = `${ ratio * 100 }%`
  root.innerHTML = `
    <img src="${ image }" class="image" height="${ zoom }" />
    <div class="crop">
      <!-- <img src="${ image }" class="image-preview" height="${ zoom }" /> -->
    </div>
  `

  // <div class="minicrop test-background default">
  //   <img class="image" src="./tests/fixtures/landscape.jpg" height="520" alt="">
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
