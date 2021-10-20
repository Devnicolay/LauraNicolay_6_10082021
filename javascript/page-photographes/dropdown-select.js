import { Lightbox } from "./lightbox.js";

/**
 * DOM
 */
const dropdownButton = document.querySelector(".dropdown-select");
const dropdownLinkUl = document.querySelector(".dropdown");
const arrowDown = document.querySelector(".arrow-down");
const sortPopularity = document.querySelector(
  ".dropdown-select-content, .sort-popularity"
);
const sortDate = document.querySelector(".sort-date");
const sortTitle = document.querySelector(".sort-title");
const btnSort = document.querySelector("#sort");
const mediasOfPagePhotographer = document.querySelector(".medias");

export class DropdownSelect {
  constructor(photographer) {
    this.photographer = photographer;
    this.initListeners();
  }
  /**
   * Open dropdown when click arrow-down
   */
  initializeDropdown() {
    const isExpanded = dropdownButton.getAttribute("aria-expanded");
    if (isExpanded === "true") {
      dropdownLinkUl.style.display = "none";
      dropdownButton.setAttribute("aria-expanded", "false");
      arrowDown.innerHTML = "<i class='fas fa-chevron-up'></i>";
    } else {
      dropdownLinkUl.style.display = "block";
      btnSort.style.display = "none";
      dropdownButton.setAttribute("aria-expanded", "true");
    }
  }

  /**
   * Sort medias with popularity
   */
  popularitySort() {
    this.photographer.medias = this.photographer.medias.sort((a, b) => {
      return b.likes - a.likes;
    });
    this.displaySortedMedias("popularité");
  }

  /**
   * Sort medias with date
   */
  dateSort() {
    this.photographer.medias = this.photographer.medias.sort((a, b) => {
      return a.date - b.date;
    });
    this.displaySortedMedias("Date");
  }

  /**
   * Sort medias with title
   */
  titleSort() {
    this.photographer.medias = this.photographer.medias.sort(function (a, b) {
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
    this.displaySortedMedias("Titre");
  }

  /**
   * Display "Popularité", "Date" or "Titre" on dropdown select
   *
   * @param {string} title of sort
   */
  displaySortedMedias(title) {
    btnSort.style.display = "block";
    btnSort.innerHTML = `${title}<span class="arrow"><i class="fas fa-chevron-down"></i></span>`;
    dropdownLinkUl.style.display = "none";
    dropdownButton.setAttribute("aria-expanded", "false");

    mediasOfPagePhotographer.innerHTML = "";
    this.photographer.medias.map((media) => {
      mediasOfPagePhotographer.innerHTML += media.createHtml();
    });
    new Lightbox(this.photographer.medias); // init listeners for lightbox
    this.photographer.initListenersforLikesButtons(); // init listerners for likes: Increment and color heart's icon
  }

  /**
   * Listeners
   */
  initListeners() {
    dropdownButton.addEventListener("click", () => this.initializeDropdown());
    sortPopularity.addEventListener("click", () => this.popularitySort());
    sortDate.addEventListener("click", () => this.dateSort());
    sortTitle.addEventListener("click", () => this.titleSort());
  }
}
