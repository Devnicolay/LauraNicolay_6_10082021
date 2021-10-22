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
    this.redirectFilteredPhotographers();
  }
  /**
   * @returns photographers template for home page
   */
  createTemplateIndex() {
    return (
      `<article><a href="photographes.html?id=` +
      this.IdPhotographer +
      `" aria-label="Redirige vers la page de` +
      this.name +
      `"><img src="` +
      this.portrait +
      `"aria-label="Portrait de ` +
      this.name +
      `"><h2 aria-label="Nom du photographe">` +
      this.name +
      `</h2></a><p class="city" aria-label="Ville de ` +
      this.name +
      `">` +
      this.city +
      `</p><p class="slogan" aria-label="Slogan de ` +
      this.name +
      `">` +
      this.tagline +
      `</p><p class="prices" aria-label="Prix par jour de ` +
      this.name +
      `">` +
      this.price +
      `€<span aria-hidden="true">/jour</span></p><div><ul class="tags" aria-label="Filtres des médias de ` +
      this.name +
      `">` +
      this.tags
        .map((tag) => {
          return `<a class="tag" aria-label="Filtre les photographes par ${tag}" href="#" data-filter="${tag}"><li><span aria-hidden="true">#${tag}</span></li></a>`;
        })
        .join("") +
      `</ul></div></article>`
    );
  }
  /**
   *
   * @returns photographers template in header for photographers page
   */
  createTemplatePhotographer() {
    return (
      `<div class="header-main" role="header main"><article class="header-left"><div class="name-and-contact"><h1 class="h1-page-photographer">` +
      this.name +
      `</h1><button class="contact" type="button" aria-haspopup="dialog" aria-label="Formulaire de contact du photographe">Contactez-moi</button></div><p class="city" aria-label="Ville de ` +
      this.name +
      `">` +
      this.city +
      `</p><p class="slogan" aria-label="Slogan de ` +
      this.name +
      `">` +
      this.tagline +
      `</p><ul class="tags"aria-label="Retourne à la page d'accueil en filtrant les photographes">` +
      this.tags
        .map((tag) => {
          return `<a class=tag aria-label="Filtre les photographes par ${tag}" href="#" data="${tag}"><li><span aria-hidden="true">#${tag}</span></li></a>`;
        })
        .join("") +
      `</ul></article><aside><a href="photographes.html" aria-label="Portrait de ` +
      this.name +
      `"><img alt="portrait"src="` +
      this.portrait +
      `"></aside></div>`
    );
  }

  /**
   * when click on tag, redirect on index.html with photographer filter by tag
   */
  redirectFilteredPhotographers() {
    const tags = document.querySelectorAll(".tag");
    tags.forEach((tag) => {
      const tagValue = tag.getAttribute("data");
      tag.addEventListener("click", () => {
        window.location.href = "index.html#" + tagValue;
      });
    });
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
  createTemplateCounterLikes() {
    const likesAndPrice = document.querySelector(".likes-and-price");
    likesAndPrice.innerHTML =
      `<p class="counter-like" aria-label="total of like"><span></span><i class="fas fa-heart"></i></p><p>` +
      this.price +
      `€ / jour</p>`;
    this.updateTotalLikes();
  }

  /**
   *  Calculate total likes on counter like
   */
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

  /**
   * Increment, decrement like and color or decolor heart's icon
   *
   * @param {string} mediaId Id for media
   */
  IncrementLikeMedia(mediaId) {
    const media = this.medias.find((media) => media.id == mediaId);
    if (media.clicked == false) {
      media.likes++;
      media.clicked = true;
    } else {
      media.likes--;
      media.clicked = false;
    }
    const heart = document.querySelector(
      `.number-heart[data-id="${media.id}"]`
    );
    heart.innerHTML = media.createLikeHtml();

    this.updateTotalLikes();

    const likes = heart.querySelector(".heart");
    likes.addEventListener("click", () => {
      this.IncrementLikeMedia(mediaId);
    });
  }

  /**
   * When click on heart for each media, launch "IncrementLikeMedia" function
   */
  initListenersforLikesButtons() {
    const likes = document.querySelectorAll(".heart");
    likes.forEach((like) => {
      const mediaId = like.getAttribute("data-id");
      like.addEventListener("click", () => {
        this.IncrementLikeMedia(mediaId);
      });
    });
  }
}
