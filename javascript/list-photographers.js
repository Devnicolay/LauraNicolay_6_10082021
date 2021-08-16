async function displayPhotographers() {
  try {
    const dataPhotographers = await fetch(
      "./data-photographers/photographers.json"
    );
    const data = await dataPhotographers.json();
    console.log("les photographes sont chargés");
    return data;
  } catch (exception) {
    debugger;
    console.log("attention une erreur a été rencontrée");
  }
}
