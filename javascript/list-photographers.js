async function displayPhotographers(result) {
  try {
    const dataPhotographers = await fetch(
      "./data-photographers/photographers.json"
    );
    const data = await result.json();
    console.log("les photographes sont chargés");
  } catch (exception) {
    debugger;
    console.log("attention une erreur a été rencontrée");
  }
}
