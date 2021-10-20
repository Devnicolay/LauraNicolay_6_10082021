import { ApiFisheye } from "../api-fisheye.js";
import { TagsFilter } from "./tags-filters.js";
/**
 * DOM
 */
// Dom in home page
const containerPhotographers = document.querySelector(".Photographers");

export class HomePage {
  /**
   * Display photographer on home page
   */
  static async initHomePage() {
    let photographers = await ApiFisheye.getPhotographers();

    containerPhotographers.innerHTML = "";
    photographers.forEach((photographer) => {
      containerPhotographers.innerHTML += photographer.createTemplateIndex();
    });
    /**
     * Apply filters tags
     */
    new TagsFilter(photographers);
  }
}

/**
 * loading home page
 */
window.onload = HomePage.initHomePage();
