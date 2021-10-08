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

  static currentIndex() {
    const allMedias = Array.from(document.querySelectorAll(".media-img-video"));
    allMedias.forEach((media) => {
      const index = media.addEventListener("click", (event) => {
        const src = event.currentTarget.getAttribute("src");
        console.log(src);
        const srcMedias = allMedias.map((media) => {
          return media.getAttribute("src");
        });
        const indexSrc = srcMedias.indexOf(src);
        console.log(indexSrc);
        return indexSrc;
      });
      return index;
    });
  }

  //create html Test
  static createHtmlTest() {
    lightboxContainer.innerHTML =
      "<img src=" + this.image + "><p>" + this.title + "</p>";
  }

  // create html lightbox
  static createHtmlLightbox(media) {
    console.log(this.image);
    if (media.endsWith(".jpg")) {
      lightboxContainer.innerHTML =
        "<img src=" + this.image + "><p>" + this.title + "</p>";
    } else if (media.endsWith(".mp4")) {
      lightboxContainer.innerHTML =
        "<video controls src=" +
        this.video +
        "></video<p>" +
        this.title +
        "</p>";
    }
  }

  // launch lightbox
  static openLightbox(media) {
    const lightbox = document.querySelector(".lightbox");
    lightbox.style.cssText += ";display:flex !important;";
    lightbox.ariaModal = "true";
    console.log(media);
    Lightbox.createHtmlLightbox();
  }

  // Close Lightbox
  static closeLightbox() {
    lightbox.style.cssText += ";display:none !important;";
  }

  // Close lightbox with mouse click
  static closeLightboxClick() {
    const crossLightbox = document.querySelector(".lightbox-close");
    crossLightbox.addEventListener("click", Lightbox.closeLightbox);
  }
}
