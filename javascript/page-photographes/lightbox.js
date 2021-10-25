import { ApiFisheye } from "../api-fisheye.js";

/**
 * DOM
 */
const lightbox = document.querySelector(".lightbox");
const lightboxMediaContainer = document.querySelector(".lightbox-container");
const crossLightbox = document.querySelector(".lightbox-close");
const chevronRight = document.querySelector(".fa-chevron-right");
const chevronLeft = document.querySelector(".fa-chevron-left");

export class Lightbox {
  constructor(medias) {
    this.medias = medias;
    this.currentMediaIndex = 0;
    this.initListeners();
  }

  /**
   *
   * Find the media that was clicked
   * @param {string} source of media clicked
   * @returns media that was clicked
   */
  static async findMediaClicked(source) {
    // Array for médias by photographer
    const photographer = await ApiFisheye.getPhotographerById();
    const medias = photographer.medias;
    const media = medias.find((media) => media.source == source);
    return media;
  }
  /**
   *
   * Launch lightbox
   * @param {string} clickedMedia Media clicked for open lightbox
   */
  openLightbox(clickedMedia) {
    const lightbox = document.querySelector(".lightbox");
    lightbox.style.cssText += ";display:flex !important;";
    lightbox.ariaModal = "true";
    this.currentMediaIndex = this.medias.indexOf(clickedMedia);
    lightboxMediaContainer.innerHTML = clickedMedia.createLightboxHtml();
  }

  /**
   * Next media
   */
  next() {
    this.currentMediaIndex++;
    const lastMedia = this.medias.length;
    if (this.currentMediaIndex == lastMedia) {
      this.currentMediaIndex = 0;
    }
    lightboxMediaContainer.innerHTML =
      this.medias[this.currentMediaIndex].createLightboxHtml();
  }

  /**
   * Previous media
   */
  previous() {
    this.currentMediaIndex--;
    if (this.currentMediaIndex < 0) {
      const lastMedia = this.medias.length;
      this.currentMediaIndex = lastMedia - 1;
    }
    lightboxMediaContainer.innerHTML =
      this.medias[this.currentMediaIndex].createLightboxHtml();
  }

  /**
   * Close Lightbox
   */
  closeLightbox() {
    lightbox.style.cssText += ";display:none !important;";
  }

  /**
   * Listeners
   */
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
        this.openMediaWithSource(media);
      });
      media.addEventListener("keyup", async (event) => {
        if (event.key === "Enter") {
          this.openMediaWithSource(media);
        }
      });
    });
  }
  /**
   * Open media in lightbox when click or press enter on media
   *
   * @param {string} media
   */
  async openMediaWithSource(media) {
    const source = media.getAttribute("src"); // get source of media clicked
    const mediaClicked = await Lightbox.findMediaClicked(source); // return media clicked
    this.openLightbox(mediaClicked);
  }
}
