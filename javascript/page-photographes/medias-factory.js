const pagePhotographerMedia = document.querySelector(".medias");

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
      "<article class=block-media><img class=media-img-video onclick=launchLightbox() src=" +
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
      "<article class=block-media><video controls class=media-img-video onclick=launchLightbox()><source src=" +
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
