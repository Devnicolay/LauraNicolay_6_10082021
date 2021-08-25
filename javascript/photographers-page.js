// Template photographers page: Part Identity
const pagePhotographer = document.querySelector(".page-photographer");
const pagePhotographerMedia = document.querySelector(".medias");

async function createTemplate(photographers) {
  const portraitPhotographer = photographers.portrait;
  const namePhotographer = photographers.name;
  const cityPhotographer = photographers.city;
  const taglinePhotographer = photographers.tagline;
  const tagsPhotographer = photographers.tags;

  pagePhotographer.innerHTML =
    "<section class=header-main><article class=header-left><div class=name-and-contact><h1 class=h1-page-photographer>" +
    namePhotographer +
    "</h1><button>Contactez-moi</button></div><p class=city>" +
    cityPhotographer +
    "</p><p class=slogan>" +
    taglinePhotographer +
    "</p><ul class=tags><a href=#><li><span aria-hidden=true>#</span>" +
    tagsPhotographer.join(
      "</li></a><a href=#><li><span aria-hidden=true>#</span>"
    ) +
    "</li></a></ul></article><aside><a href=photographes.html><img src=" +
    portraitPhotographer +
    "></aside></section><section class=main-page-photographer>";
}

// Template photographers page: Part media
async function createTemplateMedias(media) {
  const medias = media.image;
  const title = media.title;
  const like = media.likes;

  pagePhotographerMedia.innerHTML =
    "<article><img src=" +
    medias +
    "><div class=title-and-likes><p class=title>" +
    title +
    "</p><div class=number-heart><p class=like>" +
    like +
    "</p><img src=./images/heart.png></div></div></article>";
}

// Display photographer info and medias
window.onload = displayPagePhotographer();
async function displayPagePhotographer() {
  const photographerData = await fetchPhotographers();
  const showAll = photographerData.photographers;
  const showAllMedias = photographerData.media;
  pagePhotographer.innerHTML = "";
  showAll.forEach((photographer) => {
    createTemplate(photographer);
  });
  showAllMedias.forEach((photographer) => {
    createTemplateMedias(photographer);
  });
}
