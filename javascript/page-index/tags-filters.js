// Apply filters tags
const tags = document.querySelectorAll(".tag");
tags.forEach((tag, index) => {
  const tagValue = tag.getAttribute("data");
  tag.addEventListener("click", () => {
    displayFilter(tagValue);
  });
});

async function displayFilter(tagValue) {
  const photographers = await fetchPhotographers();
  const filteredPhotographers = photographers.photographers.filter(
    (photographer) => {
      return photographer.tags.includes(tagValue);
    }
  );
  containerPhotographers.innerHTML = "";
  filteredPhotographers.forEach((photographer) => {
    const photographerConstructor = new Photographer(photographer);
    containerPhotographers.innerHTML +=
      photographerConstructor.createTemplateIndex();
  });
}
