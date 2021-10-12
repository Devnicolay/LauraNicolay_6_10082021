import { ApiFisheye } from "../api-fisheye.js";

/**
 * DOM
 */
const lightbox = document.querySelector(".lightbox");
const lightboxContainer = document.querySelector(".lightbox-container");
const crossLightbox = document.querySelector(".lightbox-close i");
const chevronRight = document.querySelector(".fa-chevron-right");
const chevronLeft = document.querySelector(".fa-chevron-left");

export class Lightbox {
  constructor(medias) {
    this.medias = medias;
    this.currentMediaIndex = 0;
    this.initListeners();
  }

  // return media clicked
  static async findMediaClicked(source) {
    // Array for médias by photographer
    const photographer = await ApiFisheye.getPhotographerById();
    const medias = photographer.medias;
    const media = medias.find((media) => media.source == source);
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
    this.currentMediaIndex++;
    const lastMedia = this.medias.length;
    if (this.currentMediaIndex == lastMedia) {
      this.currentMediaIndex = 0;
    }
    lightboxContainer.innerHTML =
      this.medias[this.currentMediaIndex].createLightboxHtml();
  }

  // Previous media
  previous() {
    this.currentMediaIndex--;
    if (this.currentMediaIndex < 0) {
      const lastMedia = this.medias.length;
      this.currentMediaIndex = lastMedia - 1;
    }
    lightboxContainer.innerHTML =
      this.medias[this.currentMediaIndex].createLightboxHtml();
  }

  // Close Lightbox
  closeLightbox() {
    lightbox.style.cssText += ";display:none !important;";
  }

  initListeners() {
    // close, next and previous lightbox with press touch on keyboard
    window.addEventListener("keydown", (event) => {
      if (lightbox.ariaModal === "true" && event.key === "Escape") {
        this.closeLightbox();
      } else if (lightbox.ariaModal === "true" && event.key === "ArrowRight") {
        this.next();
      } else if (lightbox.ariaModal === "true" && event.key === "ArrowLeft") {
        this.previous();
      }
    });
    // close, next and previous lightbox with mouse click
    crossLightbox.addEventListener("click", () => {
      this.closeLightbox();
    });
    chevronRight.addEventListener("click", () => {
      this.next();
    });
    chevronLeft.addEventListener("click", () => {
      this.previous();
    });

    const allMedias = Array.from(document.querySelectorAll(".media-img-video"));
    allMedias.forEach((media) => {
      media.addEventListener("click", async () => {
        const source = media.getAttribute("src"); // get source of media clicked
        const mediaClicked = await Lightbox.findMediaClicked(source); // return media clicked
        this.openLightbox(mediaClicked);
      });
    });
  }
}
