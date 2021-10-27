import { ApiFisheye } from "../api-fisheye.js";
import "../photographers.js";
import "../medias-factory.js";
import { DropdownSelect } from "./dropdown-select.js";
import { Form } from "./form-modal.js";
import { Lightbox } from "./lightbox.js";
import "../page-index/tags-filters.js";

/**
 * DOM
 */
// Dom in photographer page
const pagePhotographerPartPhotographer =
  document.querySelector(".page-photographer");
const pagePhotographerPartMedia = document.querySelector(".medias");

export class PagePhotographer {
  static async initPhotographerPage() {
    const photographer = await ApiFisheye.getPhotographerById();
    /**
     * Part photographer
     */
    // Create Html for photographer identity
    pagePhotographerPartPhotographer.innerHTML = "";
    pagePhotographerPartPhotographer.innerHTML =
      photographer.createTemplatePhotographer();

    // Filter tags: redirect on home page with filtered photographers
    photographer.redirectFilteredPhotographers();

    /**
     * Part medias
     */
    pagePhotographerPartMedia.innerHTML = photographer.initializeMedia();

    /**
     * Lightbox
     */
    new Lightbox(photographer.medias);

    /**
     * Form
     */
    new Form(photographer);

    /**
     * Dropdown select
     */
    new DropdownSelect(photographer);

    /**
     * Likes
     */
    // Likes : increment and display likes at the bottom of the photographer's page

    photographer.createTemplateCounterLikes(); // create counter like bottom the page

    photographer.initListenersForLikesButtons(); // init listerners for likes: Increment and color heart's icon
  }
}

/**
 * loading photographer page
 */
window.onload = PagePhotographer.initPhotographerPage();
