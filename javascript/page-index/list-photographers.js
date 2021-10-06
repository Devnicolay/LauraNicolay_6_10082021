import { ApiFisheye } from "../api-fisheye.js";
/**
 * DOM
 */
// Dom in home page
const containerPhotographers = document.querySelector(".Photographers");

/**
 * loading home page
 */
window.onload = loadIndex();
function loadIndex() {
  displayPhotographer();
}

// Display photographer on home page
async function displayPhotographer() {
  let photographers = await ApiFisheye.getPhotographers();
  containerPhotographers.innerHTML = "";
  photographers.forEach((photographer) => {
    containerPhotographers.innerHTML += photographer.createTemplateIndex();
  });
  photographers = await ApiFisheye.getPhotographers();
}
