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
   * Find the media that was clicked
   *
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
   * Launch lightbox
   *
   * @param {string} clickedMedia Media clicked for open lightbox
   */
  openLightbox(clickedMedia) {
    const lightbox = document.querySelector(".lightbox");
    lightbox.style.cssText += ";display:flex !important;";
    lightbox.ariaHidden = "false";
    lightbox.ariaModal = "true";
    crossLightbox.focus();
    this.lightboxFocus();
    this.currentMediaIndex = this.medias.indexOf(clickedMedia);
    lightboxMediaContainer.innerHTML = clickedMedia.createLightboxHtml();
  }

  /**
   * Keep the focus in the lightbox
   */
  lightboxFocus() {
    const focusableElements =
      'button, .lightbox-container, [tabindex]:not([tabindex="-1"])';
    const firstFocusableElement =
      lightbox.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
    const focusableContent = lightbox.querySelectorAll(focusableElements);
    const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal

    document.addEventListener("keydown", function (e) {
      let isTabPressed = e.key === "Tab";

      if (!isTabPressed) {
        return;
      }

      if (e.shiftKey) {
        // if shift key pressed for shift + tab combination
        if (document.activeElement === firstFocusableElement) {
          // if focused is to first focusable element, focus on the last focusable element after pressing shift + tab
          lastFocusableElement.focus(); // add focus for the last focusable element
          e.preventDefault();
        }
      } else {
        // if tab key is pressed
        if (document.activeElement === lastFocusableElement) {
          // if focused is to last focusable element, focus on the first focusable element after pressing tab
          firstFocusableElement.focus(); // add focus for the first focusable element
          e.preventDefault();
        }
      }
    });
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
    lightbox.ariaHidden = "true";
    lightbox.ariaModal = "false";
    const firstMedia = document.querySelector(".media-img-video");
    firstMedia.focus();
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
    // close, next and previous lightbox with press Enter touch on icon button
    crossLightbox.addEventListener("Enter", () => {
      this.closeLightbox();
    });
    chevronRight.addEventListener("Enter", () => {
      this.next();
    });
    chevronLeft.addEventListener("Enter", () => {
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
