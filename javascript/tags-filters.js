// DOM elements
const portraitTag = document.querySelector(".portrait");
const artTag = document.querySelector(".art");
const fashionTag = document.querySelector(".fashion");
const architectureTag = document.querySelector(".architecture");
const travelTag = document.querySelector(".travel");
const sportTag = document.querySelector(".sport");
const animalsTag = document.querySelector(".animals");
const eventsTag = document.querySelector(".events");

// Import data JSON
const getPhotographers = async function () {
  const reponse = await fetch("./data-photographers/photographers.json");
  const data = await reponse.json();
};

// Apply filters tags
portraitTag.addEventListener("click", displayPortraitPhotographer);
function displayPortraitPhotographer() {
    if photographers.tags.index.of("portrait") {
        // afficher le photographe
    }
}
