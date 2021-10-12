import { ApiFisheye } from "../api-fisheye.js";
import { MediaFactory } from "../medias-factory.js";

/**
 * DOM
 */
const dropdownMenu = document.querySelector("button");
const dropdownLink = document.querySelector(".dropdown");
const arrow = document.querySelector(".arrow");
const sortPopularity = document.querySelector(
  ".dropdown-select-content, .sort-popularity"
);
const sortDate = document.querySelector(".sort-date");
const sortTitle = document.querySelector(".sort-title");
const btnSort = document.querySelector("button");
const pagePhotographerMedia = document.querySelector(".medias");

dropdownMenu.addEventListener("click", displayDropdown);

function displayDropdown() {
  const isExpanded = dropdownMenu.getAttribute("aria-expanded");
  if (isExpanded === "true") {
    dropdownLink.style.display = "none";
    dropdownMenu.setAttribute("aria-expanded", "false");
    arrow.innerHTML = "<i class='fas fa-chevron-down'></i>";
  } else {
    dropdownLink.style.display = "block";
    dropdownMenu.setAttribute("aria-expanded", "true");
    arrow.innerHTML = "<i class='fas fa-chevron-up'></i>";
  }
}

// Sort medias with popularity
sortPopularity.addEventListener("click", async () => {
  dropdownLink.style.display = "none";

  const photographer = await ApiFisheye.getPhotographerId();
  const medias = photographer.medias;
  console.log(medias);
  const sortedMedias = medias.sort((a, b) => {
    return b.likes - a.likes;
  });
  pagePhotographerMedia.innerHTML = "";
  sortedMedias.map((media) => {
    const medias = MediaFactory.createMedia(media);
    pagePhotographerMedia.innerHTML += medias.createHtml();
  });
});

//Sort medias with date
sortDate.addEventListener("click", async () => {
  btnSort.innerHTML = `Date<div class="arrow">
  <i class="fas fa-chevron-down"></i>
</div>`;
  dropdownLink.innerHTML =
    '<li><a class ="sort-popularity" href="#">Popularité</a></li><li><a class="sort-title" href="#">Titre</a></li>';
  dropdownLink.style.display = "none";

  const photographer = await ApiFisheye.getPhotographerId();
  const medias = photographer.medias;
  const sortedMedias = medias.sort((a, b) => {
    return a.date - b.date;
  });
  console.log(sortedMedias);
  pagePhotographerMedia.innerHTML = "";
  sortedMedias.map((media) => {
    const medias = MediaFactory.createMedia(media);
    pagePhotographerMedia.innerHTML += medias.createHtml();
  });
});

//Sort medias with title
sortTitle.addEventListener("click", async () => {
  btnSort.innerHTML = `Titre<div class="arrow">
  <i class="fas fa-chevron-down"></i>
</div>`;
  dropdownLink.innerHTML =
    '<li><a class ="sort-date" href="#">Date</a></li><li><a class="sort-popularity" href="#">Popularité</a></li>';
  dropdownLink.style.display = "none";

  const photographer = await ApiFisheye.getPhotographerId();
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
    const medias = MediaFactory.createMedia(media);
    pagePhotographerMedia.innerHTML += medias.createHtml();
  });
});
