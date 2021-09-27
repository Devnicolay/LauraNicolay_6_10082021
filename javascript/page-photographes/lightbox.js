const lightbox = document.querySelector(".lightbox");

// launch lightbox
function openLightbox(source) {
  lightbox.style.cssText += ";display:flex !important;";
  lightbox.ariaModal = "true";
  lightboxContainer.innerHTML = "<img src=" + source + "><p>Arc-en-ciel</p>";
}

// close, next and previous lightbox with press touch on keyboard
const lightboxCloseMouse = document.querySelector(".lightbox-close");
lightboxCloseMouse.addEventListener("click", closeLightbox);

function closeLightbox() {
  lightbox.style.cssText += ";display:none !important;";
}

function previous() {
  //affiche media précédent
  console.log("previous");
}
