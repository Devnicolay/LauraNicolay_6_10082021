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
    "></aside></section>";
}

// Display photographer info
window.onload = displayPagePhotographer();
async function displayPagePhotographer() {
  const photographerData = await fetchPhotographers();
  const showAll = photographerData.photographers;
  pagePhotographer.innerHTML = "";
  showAll.forEach((photographer) => {
    createTemplate(photographer);
  });
}

// Template photographers page: Part media
class Media {
  constructor(media) {
    this.id = media.id;
    this.photographerId = media.photographerId;
    this.title = media.title;
    this.image = media.image;
    this.mediaVideo = media.video;
    this.alt = media.alt;
    this.tags = media.tags;
    this.likes = media.likes;
    this.date = media.date;
    this.price = media.price;
    this.createMedia = function () {
      var mediaType;

      if (media.hasOwnProperty("image")) {
        mediaType = new TemplateImage();
      } else if (media.hasOwnProperty("video")) {
        mediaType = new TemplateVideo();
      }
      console.log(mediaType);
      mediaType.media = media;

      mediaType.say = function () {
        this.createHtml();
      };

      return mediaType;
    };
  }
}

class TemplateImage {
  constructor() {
    console.log("Super image");
    this.createHtml = function () {
      pagePhotographerMedia.innerHTML +=
        "<article class=block-media><img class=media-img-video src=" +
        this.image +
        "><div class=title-and-likes><p class=title>" +
        this.title +
        "</p><div class=number-heart><p class=like>" +
        this.like +
        "</p><i class='fas fa-heart' aria-label='likes'></i></div></div></article>";
    };
  }
}

class TemplateVideo {
  constructor() {
    console.log("Super vidéo");
    this.createHtml = function () {
      pagePhotographerMedia.innerHTML +=
        "<article class=block-media><video controls class=media-img-video><src=" +
        this.mediaVideo +
        "></video><div class=title-and-likes><p class=title>" +
        this.title +
        "</p><div class=number-heart><p class=like>" +
        this.like +
        "</p><i class='fas fa-heart' aria-label='likes'></i></div></div></article>";
    };
  }
}

function run() {
  var mediaTypes = [];
  var Mediafactory = new Media();

  mediaTypes.push(Mediafactory.createMedia("image"));
  mediaTypes.push(Mediafactory.createMedia("video"));

  for (var i = 0, len = mediaTypes.length; i < len; i++) {
    mediaTypes[i].say();
  }
}

// Display photographer info
window.onload = essai2();
async function essai2() {
  const photographerData = await fetchPhotographers();
  const showAllMedias = photographerData.media;
  showAllMedias.forEach((media) => {
    const mediaClass = new Media(media);
    console.log(mediaClass);
    const mediaCreate = mediaClass.createMedia();
    mediaCreate.say();
    const mediaImage = new TemplateImage(media);
    console.log(mediaImage);
  });
}
