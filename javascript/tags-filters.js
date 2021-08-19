import("./list-photographers.js");

// Apply filters tags
const tags = document.querySelector(".tag");

[tags].forEach((tag, index) => {
  const tagValue = tags.getAttribute("data");
  tags.addEventListener("click", () => {
    displayFilter(tagValue);
  });
});

async function displayFilter(tagValue) {
  console.log("tagValue");
  const photographers = await fetchPhotographers();
  const filteredPhotographers = Array.from(photographers).filter(
    (photographer) => {
      return photographer.tags.includes(tagValue);
    }
  );
  containerPhotographers.innerHTML = "";
  filteredPhotographers.forEach((photographer) => {
    createTemplate(photographer);
  });
}
