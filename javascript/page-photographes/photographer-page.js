import { ApiFisheye } from "../api-fisheye.js";
/**
 * DOM
 */
// Dom in photographer page
const pagePhotographer = document.querySelector(".page-photographer");
const pagePhotographerMedia = document.querySelector(".medias");

/**
 * loading photographer page
 */
window.onload = loadPagePhotographer();
function loadPagePhotographer() {
  showPhotographerAndMedias();
}

/**
 *
 * @returns
 */
async function showPhotographerAndMedias() {
  const urlParams = new URLSearchParams(window.location.search);
  const photographerId = urlParams.get("id");
  console.log(photographerId);
  const photographers = await ApiFisheye.getPhotographers();
  console.log(photographers);
  const photographer = photographers.find((photographer) => {
    return photographer.IdPhotographer == photographerId;
  });
  console.log(photographer);
  pagePhotographer.innerHTML = "";
  pagePhotographer.innerHTML = photographer.createTemplatePhotographer();
  pagePhotographerMedia.innerHTML = photographer.initializeMedia();
}
