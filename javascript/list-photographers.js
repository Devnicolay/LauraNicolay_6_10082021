const portrait = document.querySelector(".portrait");
const containerPhotographers = document.querySelector(".Photographers");
portrait.addEventListener("click", displayPhotographers);
async function displayPhotographers() {
  try {
    const dataPhotographers = await fetch(
      "./data-photographers/photographers.json"
    );
    const data = await dataPhotographers.json();
    containerPhotographers.innerHTML =
      "<section><article><a><img src=" +
      data.photographers[0].portrait +
      "></a><h2>" +
      data.photographers[0].name +
      "</h2><p class=city>" +
      data.photographers[0].city +
      "</p><p class=slogan>" +
      data.photographers[0].tagline +
      "</p><p class=prices>" +
      data.photographers[0].price +
      "€/jour</p><div aria-label=tag filter><ul class=tags><a href=#><li><span aria-hidden=true>#</span>" +
      data.photographers[0].tags.join(
        "</li></a><a href=#><li><span aria-hidden=true>#</span>"
      ) +
      "</li></a></ul></div></article><section>";
    return data;
  } catch (exception) {
    console.log("attention une erreur a été rencontrée");
  }
}
