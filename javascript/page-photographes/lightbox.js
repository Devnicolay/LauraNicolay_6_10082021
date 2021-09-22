const lightbox = document.querySelector(".lightbox");

// launch lightbox
const container = document.querySelector(".medias");
container.addEventListener("click", launchLightbox);

function launchLightbox(e) {
  const medias = document.querySelectorAll(".media-img-video");
  if (e.target != medias) {
    lightbox.style.cssText += ";display:flex !important;";
    lightbox.ariaModal = "true";
  }
}

// close lightbox with click on cross
const lightboxCloseMouse = document.querySelector(".lightbox-close");
lightboxCloseMouse.addEventListener("click", closeLightbox);

function closeLightbox() {
  lightbox.style.cssText += ";display:none !important;";
}

// close lightbox with press escape on keyboard
window.addEventListener("keydown", escapeKey);
function escapeKey(e) {
  if (lightbox.ariaModal === "true" && e.key === "Escape") {
    closeLightbox();
  }
}

// previous media
const chevronLeft = document.querySelector(".fa-chevron-left");
chevronLeft.addEventListener("click", previous);

function previous() {
  //affiche media précédent
  console.log("previous");
}

// next media
const chevronRight = document.querySelector(".fa-chevron-right");
chevronRight.addEventListener("click", next);

function next() {
  //affiche media suivant
  console.log("next");
}
