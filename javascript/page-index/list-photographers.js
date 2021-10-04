/**
 * DOM
 */
// Dom in home page
const containerPhotographers = document.querySelector(".Photographers");
// Dom in photographer page

/**
 * loading home page
 */
window.onload = loadIndex();
function loadIndex() {
  displayPhotographer();
}

// Display photographer on home page
async function displayPhotographer() {
  const data = await fetchPhotographers();
  const dataPhotographers = data.photographers;
  containerPhotographers.innerHTML = "";
  dataPhotographers.forEach((photographer) => {
    const photographerConstructor = new Photographer(photographer);
    containerPhotographers.innerHTML +=
      photographerConstructor.createTemplateIndex();
  });
}
