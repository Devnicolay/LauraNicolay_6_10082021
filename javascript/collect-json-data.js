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
  const photographerData = await fetchPhotographers();
  const dataPhotographers = photographerData.photographers;
  return dataPhotographers;
}

async function dataMedias() {
  const photographerData = await fetchPhotographers();
  const dataMedias = photographerData.media;
  return dataMedias;
}
