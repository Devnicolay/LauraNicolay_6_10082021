// Template photographers page: Part media
export class MediaFactory {
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
  createHtml() {
    return (
      "<article class=block-media><img class=media-img-video src=" +
      this.image +
      "><div class=title-and-likes><p class=title>" +
      this.title +
      "</p><div class=number-heart><p class=like data-likes=" +
      this.likes +
      ">" +
      this.likes +
      "</p><p class='heart' data-clicked='false'><i class='far fa-heart' aria-label='likes'></i></p></div></div></article>"
    );
  }
}

class Video extends Media {
  createHtml() {
    return (
      "<article class=block-media><video controls class=media-img-video src=" +
      this.mediaVideo +
      "></video><div class=title-and-likes><p class=title>" +
      this.title +
      "</p><div class=number-heart><p class=like data-likes=" +
      this.likes +
      ">" +
      this.likes +
      "</p><p class='heart' data-clicked='false'><i class='far fa-heart' aria-label='likes'></i></p></div></div></article>"
    );
  }
  showLike() {
    console.log(this.likes);
    return this.likes;
  }
}
