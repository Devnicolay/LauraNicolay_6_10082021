window.onload = loadData();
function loadData() {
  fetchPhotographers();
  filterMediasByPhotographer();
}
// Fetch data
async function fetchPhotographers() {
  try {
    const dataPath = await fetch("./data-photographers/photographers.json");
    const data = await dataPath.json();
    const dataPhotographers = data.photographers;
    const dataMedias = data.media;
    return { photographers: dataPhotographers, media: dataMedias };
  } catch (exception) {
    console.log("attention an error has been encountered");
  }
}

// Filter medias by photographer
async function filterMediasByPhotographer() {
  const data = await fetchPhotographers();
  const dataPhotographer = data.photographers;
  const dataMedias = data.media;
  const photographe = [];
  dataPhotographer.forEach((photographer) => {
    const mediasByPhotographer = [];
    dataMedias.forEach((media) => {
      if (media.photographerId == photographer.id) {
        console.log(photographer.id);
        mediasByPhotographer.push(media);
      }
    });
    photographe.push(new Photographer(photographer, mediasByPhotographer));
    console.log(photographer);
  });
  console.log(photographe[2], photographe[2].medias);
}

// Photographer variable and medias variable
async function dataPhotographers() {
  const datas = await fetchPhotographers();
  const dataPhotographers = datas.photographers;
  return dataPhotographers;
}

async function dataMedias() {
  const datas = await fetchPhotographers();
  const dataMedias = datas.media;
  return dataMedias;
}

const datas = fetchPhotographers();
const datasPhotographers = datas.photographers;
const datasMedias = datas.media;
