import { ApiFisheye } from "../api-fisheye.js";
import { MediaFactory } from "../medias-factory.js";

/**
 * DOM
 */
const dropdownMenu = document.querySelector(".dropdown-select");
const dropdownLink = document.querySelector(".dropdown");
const arrowDown = document.querySelector(".arrow-down");
const arrowUp = document.querySelector(".arrow-up");
const sortPopularity = document.querySelector(
  ".dropdown-select-content, .sort-popularity"
);
const sortDate = document.querySelector(".sort-date");
const sortTitle = document.querySelector(".sort-title");
const btnSort = document.querySelector("button");
const pagePhotographerMedia = document.querySelector(".medias");

export class DropdownSelect {
  constructor() {
    this.initListeners();
  }
  /**
   * Open dropdown when click arrow
   */
  displayDropdown() {
    const isExpanded = dropdownMenu.getAttribute("aria-expanded");
    if (isExpanded === "true") {
      dropdownLink.style.display = "none";
      dropdownMenu.setAttribute("aria-expanded", "false");
      arrowDown.innerHTML = "<i class='fas fa-chevron-down'></i>";
    } else {
      dropdownLink.style.display = "block";
      btnSort.style.display = "none";
      dropdownMenu.setAttribute("aria-expanded", "true");
    }
  }

  /**
   * Sort medias with popularity
   */
  async popularitySort() {
    btnSort.style.display = "block";
    btnSort.innerHTML =
      'Popularité<span class="arrow"><i class="fas fa-chevron-down"></i></span>';
    dropdownLink.style.display = "none";

    const photographer = await ApiFisheye.getPhotographerById();
    const medias = photographer.medias;
    const sortedMedias = medias.sort((a, b) => {
      return b.likes - a.likes;
    });
    pagePhotographerMedia.innerHTML = "";
    sortedMedias.map((media) => {
      pagePhotographerMedia.innerHTML += media.createHtml();
    });
  }

  /**
   * Sort medias with date
   */
  async dateSort() {
    btnSort.style.display = "block";
    btnSort.innerHTML =
      'Date<span class="arrow"><i class="fas fa-chevron-down"></i></span>';
    dropdownLink.style.display = "none";

    const photographer = await ApiFisheye.getPhotographerById();
    const medias = photographer.medias;
    const sortedMedias = medias.sort((a, b) => {
      return a.date - b.date;
    });
    pagePhotographerMedia.innerHTML = "";
    sortedMedias.map((media) => {
      pagePhotographerMedia.innerHTML += media.createHtml();
    });
  }

  /** Sort medias with title */
  async titleSort() {
    btnSort.style.display = "block";
    btnSort.innerHTML =
      'Titre<span class="arrow"><i class="fas fa-chevron-down"></i></span>';
    dropdownLink.style.display = "none";

    const photographer = await ApiFisheye.getPhotographerById();
    const medias = photographer.medias;
    const sortedMedias = medias.sort(function (a, b) {
      let x = a.title.toLowerCase();
      let y = b.title.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });
    pagePhotographerMedia.innerHTML = "";
    sortedMedias.map((media) => {
      pagePhotographerMedia.innerHTML += media.createHtml();
    });
  }

  /**
   * Listeners
   */
  initListeners() {
    dropdownMenu.addEventListener("click", this.displayDropdown);
    sortPopularity.addEventListener("click", this.popularitySort);
    sortDate.addEventListener("click", this.dateSort);
    sortTitle.addEventListener("click", this.titleSort);
  }
}
