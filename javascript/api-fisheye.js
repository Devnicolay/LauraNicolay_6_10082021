import { MediaFactory } from "./medias-factory.js";
import { Photographer } from "./photographers.js";
export class ApiFisheye {
  static photographers = [];

  // Fetch data
  static async fetchPhotographers() {
    try {
      const dataPath = await fetch("./data-photographers/photographers.json");
      const data = await dataPath.json();
      const dataPhotographers = data.photographers;
      const dataMedias = data.media;

      const photographes = [];
      dataPhotographers.forEach((photographer) => {
        const mediasByPhotographer = [];
        dataMedias.forEach((media) => {
          if (media.photographerId == photographer.id) {
            mediasByPhotographer.push(MediaFactory.createMedia(media));
          }
        });
        photographes.push(new Photographer(photographer, mediasByPhotographer));
        console.log(photographer);
      });
      ApiFisheye.photographers = photographes;
    } catch (exception) {
      console.log("attention an error has been encountered");
    }
  }

  static async getPhotographers() {
    if (ApiFisheye.photographers.length === 0) {
      await ApiFisheye.fetchPhotographers();
    }
    return ApiFisheye.photographers;
  }

  static async getPhotographer(id) {
    const photographers = await ApiFisheye.getPhotographers();
    if (photographers.find((photographer) => photographer.id === "930")) {
      console.log(photographer.name);
    }
  }
}
