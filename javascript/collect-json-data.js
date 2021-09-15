// Collect json data
async function fetchPhotographers() {
  try {
    const dataPhotographers = await fetch(
      "./data-photographers/photographers.json"
    );
    const data = await dataPhotographers.json();
    return data;
  } catch (exception) {
    console.log("attention une erreur a été rencontrée");
  }
}

async function data() {
  const photographerData = await fetchPhotographers();
  return photographerData;
}

async function dataPhotographers() {
  const photographerData = await data();
  const dataPhotographers = photographerData.photographers;
  return dataPhotographers;
}

async function dataMedias() {
  const photographerData = await data();
  const dataMedias = photographerData.media;
  return dataMedias;
}

async function mediasByIdPhotographer() {
  const photographerData = await data();
  const dataMedias = photographerData.media;
  // Search Id for photographer selected
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get("id");
  // Display medias for photographer
  const medias = dataMedias.filter((media) => {
    return media.photographerId == myParam;
  });
  return medias;
}

async function photographerById() {
  const photographerData = await data();
  const dataPhotographers = photographerData.photographers;
  // Search Id for photographer selected
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get("id");
  // Display identity for photographer
  const photographer = dataPhotographers.find((photograph) => {
    return photograph.id == myParam;
  });
  return photographer;
}
