/**
 * DOM
 */
// Dom in photographer page
const pagePhotographer = document.querySelector(".page-photographer");
const pagePhotographerMedia = document.querySelector(".medias");

/**
 * loading photographer page
 */
window.onload = loadPagePhotographer();
function loadPagePhotographer() {
  showIdentityPhotographer();
  showMedias();
  dataById();
}

/**
 *
 * @returns photographer filtered by url id
 */
async function photographerById() {
  const photographerData = await fetchPhotographers();
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

/**
 * Display identity for photographer
 */
async function showIdentityPhotographer() {
  const photographer = await photographerById();
  const photographerConstructor = new Photographer(photographer);
  pagePhotographer.innerHTML =
    photographerConstructor.createTemplatePhotographer();
}

/**
 * @returns photographer's medias filtered by url id
 */
async function mediasByIdPhotographer() {
  const photographerData = await fetchPhotographers();
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

/**
 * Display medias for photographer
 */
async function showMedias() {
  let medias = await mediasByIdPhotographer();
  console.log(medias);
  medias = medias.map((media) => {
    const medias = MediaFactory.createMedia(media);
    return medias;
  });
}

/**
 * Display medias for photographer with data array (photographers + their medias)
 */
async function dataById() {
  const data = await filterMediasByPhotographer();
  console.log(data);
}
