// Template photographer
const containerPhotographers = document.querySelector(".Photographers");

async function createTemplate(photographers) {
  const portraitPhotographer = photographers.portrait;
  const namePhotographer = photographers.name;
  const cityPhotographer = photographers.city;
  const taglinePhotographer = photographers.tagline;
  const pricePhotographer = photographers.price;
  const tagsPhotographer = photographers.tags;

  containerPhotographers.innerHTML +=
    "<article><a href=photographes.html><img src=" +
    portraitPhotographer +
    "><h2>" +
    namePhotographer +
    "</h2></a><p class=city>" +
    cityPhotographer +
    "</p><p class=slogan>" +
    taglinePhotographer +
    "</p><p class=prices>" +
    pricePhotographer +
    "€/jour</p><div aria-label=tag filter><ul class=tags><a href=#><li><span aria-hidden=true>#</span>" +
    tagsPhotographer.join(
      "</li></a><a href=#><li><span aria-hidden=true>#</span>"
    ) +
    "</li></a></ul></div></article>";
}

// Apply show all photographer
window.onload = displayPhotographers();
async function displayPhotographers() {
  const photographerData = await fetchPhotographers();
  const showAll = photographerData.photographers;
  containerPhotographers.innerHTML = "";
  showAll.forEach((photographer) => {
    createTemplate(photographer);
  });
}
