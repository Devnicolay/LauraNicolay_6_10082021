export class Photographer {
  constructor(photographer, medias) {
    this.IdPhotographer = photographer.id;
    this.name = photographer.name;
    this.city = photographer.city;
    this.country = photographer.country;
    this.tags = photographer.tags;
    this.tagline = photographer.tagline;
    this.price = photographer.price;
    this.portrait = photographer.portrait;
    this.medias = medias;
    this.initListeners();
  }
  /**
   * photographers template for home page
   */
  createTemplateIndex() {
    return (
      "<article><a href=photographes.html?id=" +
      this.IdPhotographer +
      "><img src=" +
      this.portrait +
      "><h2>" +
      this.name +
      "</h2></a><p class=city>" +
      this.city +
      "</p><p class=slogan>" +
      this.tagline +
      "</p><p class=prices>" +
      this.price +
      "€/jour</p><div aria-label=tag filter><ul class=tags>" +
      this.tags
        .map((tag) => {
          return `<a href=# data="${tag}"><li><span aria-hidden=true>#${tag}</span></li></a>`;
        })
        .join("") +
      "</ul></div></article>"
    );
  }
  /**
   *
   * @returns photographers template in header for photographers page
   */
  createTemplatePhotographer() {
    return (
      "<section class=header-main><article class=header-left><div class=name-and-contact><h1 class=h1-page-photographer>" +
      this.name +
      "</h1><button class=contact type=button aria-haspopup=dialog>Contactez-moi</button></div><p class=city>" +
      this.city +
      "</p><p class=slogan>" +
      this.tagline +
      "</p><ul class=tags>" +
      this.tags
        .map((tag) => {
          return `<a class=tag href=# data="${tag}"><li><span aria-hidden=true>#${tag}</span></li></a>`;
        })
        .join("") +
      "</ul></article><aside><a href=photographes.html><img src=" +
      this.portrait +
      "></aside></section>"
    );
  }
  /**
   *
   * @returns HTML media template for photographers page
   */
  initializeMedia() {
    return this.medias.map((media) => media.createHtml()).join("");
  }
  /**
   *
   * @returns counter template for the "likes" of the photographers page
   */
  createTemplateLikes() {
    const likesAndPrice = document.querySelector(".likes-and-price");
    likesAndPrice.innerHTML =
      "<p class='counter-like' aria-label='total of like'><span></span><i class='fas fa-heart'></i></p><p>" +
      this.price +
      "€ / jour</p>";
    this.updateTotalLikes();
  }

  initListeners() {
    const tags = document.querySelectorAll(".tag");
    tags.forEach((tag) => {
      const tagValue = tag.getAttribute("data");
      tag.addEventListener("click", () => {
        window.location.href = "index.html#" + tagValue;
      });
    });
  }

  // calculation total likes
  updateTotalLikes() {
    let nbLikes = 0;
    this.medias.forEach((media) => {
      nbLikes += media.likes;
    });
    const counterLikeSelector = document.querySelector(
      ".likes-and-price .counter-like span"
    );
    counterLikeSelector.innerHTML = nbLikes;
  }

  likeMedia(mediaId) {
    const media = this.medias.find((media) => media.id == mediaId);
    media.likes++;
    media.clicked = true;
    document.querySelector(`.number-heart[data-id="${media.id}"]`).innerHTML =
      media.createLikeHtml();

    this.updateTotalLikes();
  }
}
