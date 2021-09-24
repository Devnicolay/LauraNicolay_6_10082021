// Identity Photographer
const pagePhotographer = document.querySelector(".page-photographer");
class Photographer {
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
  }
  initializeMedia() {
    return this.medias.map((media) => media.createHtml()).join("");
  }
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
          return `<a href=# data="${tag}"><li><span aria-hidden=true>#${tag}</span></li></a>`;
        })
        .join("") +
      "</ul></article><aside><a href=photographes.html><img src=" +
      this.portrait +
      "></aside></section>"
    );
  }
  createTemplateLikes() {
    return (
      "<p class='counter-like' aria-label='total of like'><span></span><i class='fas fa-heart'></i></p><p>" +
      this.price +
      "€ / jour</p>"
    );
  }
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

// Display medias for photographer ID
window.onload = loadIdPhotographers();
async function loadIdPhotographers() {
  // Display medias for photographer
  let medias = await mediasByIdPhotographer();
  medias = medias.map((media) => {
    const medias = MediaFactory.createMedia(media);
    return medias;
  });
  // Display identity for photographer
  const photographer = await photographerById();
  const photographerConstructor = new Photographer(photographer, medias);
  pagePhotographer.innerHTML =
    photographerConstructor.createTemplatePhotographer();
  pagePhotographerMedia.innerHTML = photographerConstructor.initializeMedia();
  // display likes and price for photographer
  likeAndPrice();
  const likes = document.querySelectorAll(".like");
  likes.forEach((like) => {
    like.addEventListener("click", calculationLikeClicked);
  });
  // Open form modal
  const contactBtn = document.querySelector(".contact");
  contactBtn.onclick = function () {
    openModal();
  };
  // Open lightbox
  const allMedias = Array.from(document.querySelectorAll(".media-img-video"));
  allMedias.forEach((media) => {
    media.addEventListener("click", (event) => {
      const src = event.currentTarget.getAttribute("src");
      const index = medias.indexOf(src);
      console.log(index);
      openLightbox(src);
    });
  });
  // increment likes
  const like = document.querySelectorAll(".like");
  like.forEach((media) => {
    media.addEventListener("click", likeMedia);
  });
}
