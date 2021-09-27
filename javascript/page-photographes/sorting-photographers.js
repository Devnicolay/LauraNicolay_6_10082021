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
  // Lightbox : src for all medias
  const allMedias = Array.from(document.querySelectorAll(".media-img-video"));
  const srcMedias = allMedias.map((media) => {
    return media.getAttribute("src");
  });
  // search src for media
  allMedias.forEach((media) => {
    media.addEventListener("click", (event) => {
      const src = event.currentTarget.getAttribute("src");
      console.log(src);
      // Open lightbox
      openLightbox(src);
      // position for media in all medias
      const indexSrc = srcMedias.indexOf(src);

      // next media
      const chevronRight = document.querySelector(".fa-chevron-right");
      chevronRight.addEventListener("click", next);
      function next() {
        console.log("next");
        const resultPosition = positionNextMedia(); // media next
        resultPosition.createHtmlLightbox(resultPosition); // create Html for next media
      }
      function positionNextMedia() {
        // position next media
        const indexNextMedia = indexSrc + 1;
        console.log(indexNextMedia);
        // media next
        const nextMedia = photographerConstructor.medias[indexNextMedia];
        console.log(nextMedia);
        return nextMedia;
      }

      // previous media
      const chevronLeft = document.querySelector(".fa-chevron-left");
      chevronLeft.addEventListener("click", previous);
      function previous() {
        console.log("previous");
        const resultPosition = positionpreviousMedia(); // media previous
        resultPosition.createHtmlLightbox(resultPosition); // create Html for previous media
      }
      function positionpreviousMedia() {
        // position previous media
        const indexPreviousMedia = indexSrc - 1;
        console.log(indexPreviousMedia);
        // media previous
        const previousMedia =
          photographerConstructor.medias[indexPreviousMedia];
        console.log(previousMedia);
        return previousMedia;
      }

      // close, next and previous lightbox with press touch on keyboard
      window.addEventListener("keydown", keyboardTouch);
      function keyboardTouch(e) {
        if (lightbox.ariaModal === "true" && e.key === "Escape") {
          closeLightbox();
        } else if (lightbox.ariaModal === "true" && e.key === "ArrowRight") {
          next();
        } else if (lightbox.ariaModal === "true" && e.key === "ArrowLeft") {
          previous();
        }
      }
    });
  });
  // increment likes
  const like = document.querySelectorAll(".like");
  like.forEach((media) => {
    media.addEventListener("click", likeMedia);
  });
}
