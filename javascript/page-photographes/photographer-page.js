import { ApiFisheye } from "../api-fisheye.js";
import { Form } from "./form-modal.js";
import { Lightbox } from "./lightbox.js";
/**
 * DOM
 */
// Dom in photographer page
const pagePhotographer = document.querySelector(".page-photographer");
const pagePhotographerMedia = document.querySelector(".medias");

// Dom for form

export class PagePhotographer {
  /**
   *
   * Display photographer and their medias
   */
  static async showPhotographerAndMedias() {
    const photographer = await ApiFisheye.getPhotographerById();
    /**
     * Part photographer
     */
    // Create Html for photographer identity
    pagePhotographer.innerHTML = "";
    pagePhotographer.innerHTML = photographer.createTemplatePhotographer();

    /**
     * Part medias
     */
    pagePhotographerMedia.innerHTML = photographer.initializeMedia();
    /**
     * Lightbox
     */
    new Lightbox(photographer.medias);

    new Form(photographer);

    /**
     * Likes
     */
    // Likes : increment and display likes at the bottom of the photographer's page

    photographer.createTemplateLikes();
    const likes = document.querySelectorAll(".heart");
    likes.forEach((like) => {
      const mediaId = like.getAttribute("data-id");
      like.addEventListener("click", () => {
        photographer.likeMedia(mediaId);
      });
    });
  }
}

/**
 * loading photographer page
 */
window.onload = loadPagePhotographer();
function loadPagePhotographer() {
  PagePhotographer.showPhotographerAndMedias();
}
