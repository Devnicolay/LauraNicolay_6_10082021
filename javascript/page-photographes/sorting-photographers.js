// Identity Photographer
const pagePhotographer = document.querySelector(".page-photographer");
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
    this.medias = media;
  }
  createTemplatePhotographer() {
    return (
      "<section class=header-main><article class=header-left><div class=name-and-contact><h1 class=h1-page-photographer>" +
      this.name +
      "</h1><button>Contactez-moi</button></div><p class=city>" +
      this.city +
      "</p><p class=slogan>" +
      this.tagline +
      "</p><ul class=tags><a class=tag href=#><li><span aria-hidden=true>#</span>" +
      this.tags.join("</li></a><a href=#><li><span aria-hidden=true>#</span>") +
      "</li></a></ul></article><aside><a href=photographes.html><img src=" +
      this.portrait +
      "></aside></section>"
    );
  }
}

// Display medias for photographer ID
window.onload = loadIdPhotographers();
async function loadIdPhotographers() {
  // Display medias for photographer
  const medias = await mediasByIdPhotographer();
  medias.map((media) => {
    const medias = MediaFactory.createMedia(media);
    pagePhotographerMedia.innerHTML += medias.createHtml();
  });
  // Display identity for photographer
  const photographer = await photographerById();
  const photographerConstructor = new Photographer(photographer, medias);
  console.log(photographerConstructor);
  pagePhotographer.innerHTML =
    photographerConstructor.createTemplatePhotographer();
}
