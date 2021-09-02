//Sort Medias
class Photographer {
  constructor(photographer, media) {
    this.IdPhotographer = photographer.id;
    this.name = photographer.name;
    this.city = photographer.city;
    this.country = photographer.country;
    this.tags = photographer.tags;
    this.tagline = photographer.tagline;
    this.price = photographer.price;
    this.portrait = photographer.portrait;
  }
}

// Display photographer ID
window.onload = loadIdPhotographers();
async function loadIdPhotographers() {
  const photographerData = await fetchPhotographers();
  const dataMedias = photographerData.media;
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get("id");
  console.log(myParam);
  const medias = dataMedias.filter((media) => {
    return media.photographerId == myParam;
  });
  console.log(medias);
  const dataPhotographers = photographerData.photographers;
  const photographer = dataPhotographers.find((photograph) => {
    return photograph.id == myParam;
  });
  const photographerConstructor = new Photographer(photographer);
  console.log(photographerConstructor);
}
