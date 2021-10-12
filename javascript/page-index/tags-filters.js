import { ApiFisheye } from "../api-fisheye.js";
import { Photographer } from "../photographers.js";

export class TagsFilter {
  static async displayFilter(tagValue) {
    const photographers = await ApiFisheye.getPhotographers();
    const filteredPhotographers = photographers.filter((photographer) => {
      return photographer.tags.includes(tagValue);
    });
    const containerPhotographers = document.querySelector(".Photographers");
    containerPhotographers.innerHTML = "";
    filteredPhotographers.forEach((photographer) => {
      const photographerConstructor = new Photographer(photographer);
      containerPhotographers.innerHTML +=
        photographerConstructor.createTemplateIndex();
    });
  }
}
