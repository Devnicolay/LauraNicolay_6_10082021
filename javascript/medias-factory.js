// Template photographers page: Part media
export class MediaFactory {
  static createMedia(data) {
    let mediaType;

    if (Object.prototype.hasOwnProperty.call(data, "image")) {
      mediaType = new Image(data);
    } else if (Object.prototype.hasOwnProperty.call(data, "video")) {
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
    this.alt = media.alt;
    this.tags = media.tags;
    this.likes = media.likes;
    this.date = media.date;
    this.price = media.price;
    this.clicked = false;
  }

  createLikeHtml() {
    let iconName = "far";
    if (this.clicked) {
      iconName = "fas";
    }
    return `<p class="like">${this.likes}</p>
    <p class="heart" data-id="${this.id}" data-clicked="false">
        <i class="${iconName} fa-heart" aria-label="likes"></i>
    </p>`;
  }
}

class Image extends Media {
  constructor(media) {
    super(media);
    this.source = media.image;
  }
  createHtml() {
    return (
      "<article class=block-media><img class=media-img-video src=" +
      this.source +
      "><div class=title-and-likes><p class=title>" +
      this.title +
      "</p><div class=number-heart data-id='" +
      this.id +
      "'>" +
      this.createLikeHtml() +
      "</div></div></article>"
    );
  }
  createLightboxHtml() {
    return "<img src=" + this.source + "><p>" + this.title + "</p>";
  }
}

class Video extends Media {
  constructor(media) {
    super(media);
    this.source = media.video;
  }
  createHtml() {
    return (
      "<article class=block-media><video controls class=media-img-video src=" +
      this.source +
      "></video><div class=title-and-likes><p class=title>" +
      this.title +
      "</p><div class=number-heart>" +
      this.createLikeHtml() +
      "</div></div></article>"
    );
  }
  createLightboxHtml() {
    return (
      "<video controls src=" +
      this.source +
      "><p>" +
      this.title +
      "</p></video>"
    );
  }
}
