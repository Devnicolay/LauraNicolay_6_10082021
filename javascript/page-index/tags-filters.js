import { ApiFisheye } from "../api-fisheye.js";
import { Photographer } from "../photographers.js";

const containerPhotographers = document.querySelector(".Photographers");

// Apply filters tags
const tags = document.querySelectorAll(".tag");
tags.forEach((tag) => {
  const tagValue = tag.getAttribute("data");
  tag.addEventListener("click", () => {
    displayFilter(tagValue);
  });
});

async function displayFilter(tagValue) {
  const photographers = await ApiFisheye.getPhotographers();
  const filteredPhotographers = photographers.filter((photographer) => {
    return photographer.tags.includes(tagValue);
  });
  containerPhotographers.innerHTML = "";
  filteredPhotographers.forEach((photographer) => {
    const photographerConstructor = new Photographer(photographer);
    containerPhotographers.innerHTML +=
      photographerConstructor.createTemplateIndex();
  });
}
