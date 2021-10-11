import { ApiFisheye } from "../api-fisheye.js";
import { MediaFactory } from "../medias-factory.js";
/**
 * DOM
 */
const lightbox = document.querySelector(".lightbox");
const lightboxContainer = document.querySelector(".lightbox-container");

export class Lightbox {
  constructor(media) {
    this.id = media.id;
    this.title = media.title;
    this.image = media.image;
    this.video = media.video;
    this.alt = media.alt;
  }

  // get source of media clicked
  static sourceMedia(media) {
    const src = media.getAttribute("src");
    return src;
  }
  // return media clicked
  static async findMediaClicked(source) {
    // Array for médias by photographer
    const photographerId = await ApiFisheye.getPhotographerId();
    const galleryMedias = photographerId.initializeLightboxMedias();
    console.log(galleryMedias);
    const media = galleryMedias.find((media) => media.image == source);
    console.log(media);
    return media;
  }
  // launch lightbox
  static openLightbox(media) {
    const lightbox = document.querySelector(".lightbox");
    lightbox.style.cssText += ";display:flex !important;";
    lightbox.ariaModal = "true";
    console.log(media);
    lightboxContainer.innerHTML = MediaFactory.createLightboxHtml(media);
  }

  // Next media
  static next() {
    console.log("Média suivant");
  }

  // Previous media
  static previous() {
    console.log("Média précédent");
  }

  // Close Lightbox
  static closeLightbox() {
    lightbox.style.cssText += ";display:none !important;";
  }

  // close, next and previous lightbox with press touch on keyboard
  static keyboardTouchLightbox(e) {
    if (lightbox.ariaModal === "true" && e.key === "Escape") {
      Lightbox.closeLightbox();
    } else if (lightbox.ariaModal === "true" && e.key === "ArrowRight") {
      Lightbox.next();
    } else if (lightbox.ariaModal === "true" && e.key === "ArrowLeft") {
      Lightbox.previous();
    }
  }
}
