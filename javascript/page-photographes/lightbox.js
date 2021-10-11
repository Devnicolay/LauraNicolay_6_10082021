import { ApiFisheye } from "../api-fisheye.js";
import { MediaFactory } from "../medias-factory.js";
/**
 * DOM
 */
const lightbox = document.querySelector(".lightbox");
const lightboxContainer = document.querySelector(".lightbox-container");

export class Lightbox {
  constructor(medias) {
    this.medias = medias;
    this.currentMediaIndex = 0;
    this.initListeners();
  }

  // get source of media clicked
  static sourceMedia(media) {
    const src = media.getAttribute("src");
    return src;
  }
  // return media clicked
  static async findMediaClicked(source) {
    // Array for médias by photographer
    const photographer = await ApiFisheye.getPhotographerId();
    const medias = photographer.medias;
    const media = medias.find((media) => media.image == source);
    console.log(media);
    return media;
  }
  // launch lightbox
  openLightbox(clickedMedia) {
    const lightbox = document.querySelector(".lightbox");
    lightbox.style.cssText += ";display:flex !important;";
    lightbox.ariaModal = "true";
    this.currentMediaIndex = this.medias.indexOf(clickedMedia);
    lightboxContainer.innerHTML = clickedMedia.createLightboxHtml();
  }

  // Next media
  next() {
    this.currentMediaIndex++; // @todo gérer le cas où on est déjà au début du tableau
    const lastMedia = this.medias.length;
    if (this.currentMediaIndex == lastMedia) {
      this.currentMediaIndex = 0;
      lightboxContainer.innerHTML =
        this.medias[this.currentMediaIndex].createLightboxHtml();
    } else {
      lightboxContainer.innerHTML =
        this.medias[this.currentMediaIndex].createLightboxHtml();
    }
  }

  // Previous media
  previous() {
    this.currentMediaIndex--;
    if (this.currentMediaIndex < 0) {
      const lastMedia = this.medias.length;
      this.currentMediaIndex = lastMedia - 1;
      lightboxContainer.innerHTML =
        this.medias[this.currentMediaIndex].createLightboxHtml();
    } else {
      lightboxContainer.innerHTML =
        this.medias[this.currentMediaIndex].createLightboxHtml();
    }
  }

  // Close Lightbox
  closeLightbox() {
    lightbox.style.cssText += ";display:none !important;";
  }

  // close, next and previous lightbox with press touch on keyboard
  initListeners(e) {
    window.addEventListener("keydown", (event) => {
      if (lightbox.ariaModal === "true" && event.key === "Escape") {
        this.closeLightbox();
      } else if (lightbox.ariaModal === "true" && event.key === "ArrowRight") {
        this.next();
      } else if (lightbox.ariaModal === "true" && event.key === "ArrowLeft") {
        this.previous();
      }
    });
  }
}
