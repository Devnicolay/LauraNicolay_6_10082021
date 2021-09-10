// Template photographers page: Part Identity
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
async function displayPagePhotographer() {
  const photographerData = await fetchPhotographers();
  const showAll = photographerData.photographers;
  pagePhotographer.innerHTML = "";
  showAll.forEach((photographer) => {
    createTemplate(photographer);
  });
}

// Template photographers page: Part media
class MediaFactory {
  static createMedia(data) {
    let mediaType;

    if (data.hasOwnProperty("image")) {
      mediaType = new Image(data);
    } else if (data.hasOwnProperty("video")) {
      mediaType = new Video(data);
    }
    return mediaType;
  }
}
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
  }
}

class Image extends Media {
  say() {
    console.log("I am a Image", this);
  }
  createHtml() {
    return (
      "<article class=block-media><img class=media-img-video src=" +
      this.image +
      "><div class=title-and-likes><p class=title>" +
      this.title +
      "</p><div class=number-heart><p class=like>" +
      this.likes +
      "</p><i class='fas fa-heart' aria-label='likes'></i></div></div></article>"
    );
  }
}

class Video extends Media {
  say() {
    console.log("I am a Video", this);
  }
  createHtml() {
    return (
      "<article class=block-media><video controls class=media-img-video><src=" +
      this.mediaVideo +
      "></video><div class=title-and-likes><p class=title>" +
      this.title +
      "</p><div class=number-heart><p class=like>" +
      this.likes +
      "</p><i class='fas fa-heart' aria-label='likes'></i></div></div></article>"
    );
  }
}

// Display photographer medias
async function loadMediaPhotographers() {
  const photographerData = await fetchPhotographers();
  const showAllMedias = photographerData.media;
  const mediasInstances = showAllMedias.map((media) => {
    const medias = MediaFactory.createMedia(media);
    pagePhotographerMedia.innerHTML += medias.createHtml();
    medias.say();
  });
}
