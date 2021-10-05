// Identity Photographer
const containerPhotographers = document.querySelector(".Photographers");
const pagePhotographer = document.querySelector(".page-photographer");
// for photographer ID
window.onload = loadIdPhotographers();
async function loadIdPhotographers() {
  // Display medias for photographer
  let medias = await mediasByIdPhotographer();
  medias = medias.map((media) => {
    const medias = MediaFactory.createMedia(media);
    return medias;
  });
  // Display identity for photographer
  const photographer = await photographerById();
  const photographerConstructor = new Photographer(photographer, medias);
  pagePhotographer.innerHTML =
    photographerConstructor.createTemplatePhotographer();
  // Display medias for photographer
  pagePhotographerMedia.innerHTML = photographerConstructor.initializeMedia();
  photographerConstructor.datasPhotographer();
  // Open form modal
  const contactBtn = document.querySelector(".contact");
  contactBtn.onclick = function () {
    openModal();
  };
  // Lightbox : src for all medias
  const allMedias = Array.from(document.querySelectorAll(".media-img-video"));
  const srcMedias = allMedias.map((media) => {
    return media.getAttribute("src");
  });
  // Lightbox : search src for media
  allMedias.forEach((media) => {
    media.addEventListener("click", (event) => {
      const src = event.currentTarget.getAttribute("src");
      console.log(src);
      // Open lightbox
      openLightbox(src);
      // position for media in all medias
      const indexSrc = srcMedias.indexOf(src);

      // Lightbox : next media
      const chevronRight = document.querySelector(".fa-chevron-right");
      chevronRight.addEventListener("click", next);
      function next() {
        console.log("next");
        const resultPosition = positionNextMedia(); // media next
        resultPosition.createHtmlLightbox(resultPosition); // create Html for next media
      }
      function positionNextMedia() {
        // Lightbox : position next media
        const indexNextMedia = indexSrc + 1;
        console.log(indexNextMedia);
        // Lightbox : media next
        const nextMedia = photographerConstructor.medias[indexNextMedia];
        console.log(nextMedia);
        return nextMedia;
      }

      // Lightbox : previous media
      const chevronLeft = document.querySelector(".fa-chevron-left");
      chevronLeft.addEventListener("click", previous);
      function previous() {
        console.log("previous");
        const resultPosition = positionpreviousMedia(); // media previous
        resultPosition.createHtmlLightbox(resultPosition); // create Html for previous media
      }
      function positionpreviousMedia() {
        // Lightbox : position previous media
        const indexPreviousMedia = indexSrc - 1;
        console.log(indexPreviousMedia);
        // Lightbox : media previous
        const previousMedia =
          photographerConstructor.medias[indexPreviousMedia];
        console.log(previousMedia);
        return previousMedia;
      }

      // Lightbox : close, next and previous lightbox with press touch on keyboard
      window.addEventListener("keydown", keyboardTouch);
      function keyboardTouch(e) {
        if (lightbox.ariaModal === "true" && e.key === "Escape") {
          closeLightbox();
        } else if (lightbox.ariaModal === "true" && e.key === "ArrowRight") {
          next();
        } else if (lightbox.ariaModal === "true" && e.key === "ArrowLeft") {
          previous();
        }
      }
    });
  });
  // Likes : increment and display likes at the bottom of the photographer's page
  likeAndPrice();
  const likes = document.querySelectorAll(".heart");
  likes.forEach((like) => {
    like.addEventListener("click", calculationLikeClicked);
    like.addEventListener("click", likeMedia);
    like.addEventListener("click", incrementTotalLikes);
  });
}
