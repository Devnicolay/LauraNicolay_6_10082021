import { ApiFisheye } from "../api-fisheye.js";
import { TagsFilter } from "./tags-filters.js";
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
  getUrlFilter();
}

/**
 * Display photographer on home page
 */
async function displayPhotographer() {
  let photographers = await ApiFisheye.getPhotographers();
  containerPhotographers.innerHTML = "";
  photographers.forEach((photographer) => {
    containerPhotographers.innerHTML += photographer.createTemplateIndex();
  });
}

/**
 * Apply filters tags
 */
const tags = document.querySelectorAll(".tag");
tags.forEach((tag) => {
  const tagValue = tag.getAttribute("data-filter");
  tag.addEventListener("click", () => {
    TagsFilter.displayPhotographersFiltered(tagValue);
  });
});

/**
 * When click tag on photographer page, redirect on home page with filtered photographers with tag clicked
 */
function getUrlFilter() {
  const ancre = window.location.hash;
  const deleteHashtag = ancre.substring(1, 13);
  if (ancre == "") {
    console.log("none");
  } else {
    TagsFilter.displayPhotographersFiltered(deleteHashtag);
  }
}
