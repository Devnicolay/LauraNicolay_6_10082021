const portrait = document.querySelector(".portrait");
const containerPhotographers = document.querySelector(".Photographers");
portrait.addEventListener("click", displayPhotographers);
async function displayPhotographers() {
  try {
    const dataPhotographers = await fetch(
      "./data-photographers/photographers.json"
    );
    const data = await dataPhotographers.json();
    for (var i = 0; i < data.photographers.length; i++) {
      const portraitPhotographer = data.photographers[i].portrait;
      const namePhotographer = data.photographers[i].name;
      const cityPhotographer = data.photographers[i].city;
      const taglinePhotographer = data.photographers[i].tagline;
      const pricePhotographer = data.photographers[i].price;
      const tagsPhotographer = data.photographers[i].tags;

      containerPhotographers.innerHTML +=
        "<section><article><a href=#><img src=" +
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
        "</li></a></ul></div></article><section>";
    }
    return data;
  } catch (exception) {
    console.log("attention une erreur a été rencontrée");
  }
}
