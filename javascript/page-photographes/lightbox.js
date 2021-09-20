const medias = document.querySelectorAll(".media-img-video");
const lightbox = document.querySelector(".lightbox");
const lightboxClose = document.querySelector(".lightbox-close");

// launch lightbox
medias.forEach((media) => {
  media.addEventListener("click", launchLightbox);
});

function launchLightbox() {
  lightbox.style.cssText += ";display:flex !important;";
}

// close lightbox with cross
lightboxClose.addEventListener("click", closeLightbox);

function closeLightbox() {
  lightbox.style.cssText += ";display:none !important;";
}
