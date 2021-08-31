// Display ID for all photographer
async function finderPhotographerId(photographers) {
  const IdPhotographer = photographers.id;
  console.log(IdPhotographer);
}

async function displayPhotographer() {
  const photographerData = await fetchPhotographers();
  const showAll = photographerData.photographers;
  showAll.forEach((photographer) => {
    finderPhotographerId(photographer);
  });
}

// display all media for Mimi Keel
async function finderMediasMimi(media) {
  const IdPhotographer = media.photographerId;
  const imagePhotographer = media.image;
  const videoPhotographer = media.video;
  if (IdPhotographer === 243) {
    console.log(imagePhotographer + videoPhotographer);
  }
}

async function displayMediaMimi() {
  const photographerData = await fetchPhotographers();
  const showAllMedias = photographerData.media;
  showAllMedias.forEach((medias) => {
    finderMediasMimi(medias);
  });
}

// display all media for Ellie-Rose Wilkens
async function finderMediasEllie(media) {
  const IdPhotographer = media.photographerId;
  const imagePhotographer = media.image;
  const videoPhotographer = media.video;
  if (IdPhotographer === 930) {
    console.log(imagePhotographer + videoPhotographer);
  }
}

async function displayMediaEllie() {
  const photographerData = await fetchPhotographers();
  const showAllMedias = photographerData.media;
  showAllMedias.forEach((medias) => {
    finderMediasEllie(medias);
  });
}

// display all media for Tracy Galindo
async function finderMediasTracy(media) {
  const IdPhotographer = media.photographerId;
  const imagePhotographer = media.image;
  const videoPhotographer = media.video;
  if (IdPhotographer === 82) {
    console.log(imagePhotographer + videoPhotographer);
  }
}

async function displayMediaTracy() {
  const photographerData = await fetchPhotographers();
  const showAllMedias = photographerData.media;
  showAllMedias.forEach((medias) => {
    finderMediasTracy(medias);
  });
}

// display all media for Nabeel Bradford
async function finderMediasNabeel(media) {
  const IdPhotographer = media.photographerId;
  const imagePhotographer = media.image;
  const videoPhotographer = media.video;
  if (IdPhotographer === 527) {
    console.log(imagePhotographer + videoPhotographer);
  }
}

async function displayMediaNabeel() {
  const photographerData = await fetchPhotographers();
  const showAllMedias = photographerData.media;
  showAllMedias.forEach((medias) => {
    finderMediasNabeel(medias);
  });
}

// display all media for Rhode Dubois
async function finderMediasRhode(media) {
  const IdPhotographer = media.photographerId;
  const imagePhotographer = media.image;
  const videoPhotographer = media.video;
  if (IdPhotographer === 925) {
    console.log(imagePhotographer + videoPhotographer);
  }
}

async function displayMediaRhode() {
  const photographerData = await fetchPhotographers();
  const showAllMedias = photographerData.media;
  showAllMedias.forEach((medias) => {
    finderMediasRhode(medias);
  });
}

// display all media for Marcel Nikolic
async function finderMediasMarcel(media) {
  const IdPhotographer = media.photographerId;
  const imagePhotographer = media.image;
  const videoPhotographer = media.video;
  if (IdPhotographer === 195) {
    console.log(imagePhotographer + videoPhotographer);
  }
}

async function displayMediaMarcel() {
  const photographerData = await fetchPhotographers();
  const showAllMedias = photographerData.media;
  showAllMedias.forEach((medias) => {
    finderMediasMarcel(medias);
  });
}

// display Photographer with url Id
async function displayPagePhotographer() {
  if (location.search === "?id=243") {
    displayMediaMimi();
  } else if (location.search === "?id=930") {
    displayMediaEllie();
  } else if (location.search === "?id=82") {
    displayMediaTracy();
  } else if (location.search === "?id=527") {
    displayMediaNabeel();
  } else if (location.search === "?id=925") {
    displayMediaRhode();
  } else if (location.search === "?id=195") {
    displayMediaMarcel();
  }
}
