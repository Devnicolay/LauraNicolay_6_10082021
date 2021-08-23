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
