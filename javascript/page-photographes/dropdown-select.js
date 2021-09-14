const dropdownMenu = document.querySelector("button");
const dropdownLink = document.querySelector(".dropdown");
const arrow = document.querySelector(".arrow");
const sortPopularity = document.querySelector(".dropdown-select-content");
const sortDate = document.querySelector(".sort-date");
const sortTitle = document.querySelector(".sort-title");
const media = dataMedias();
const btnSort = document.querySelector("button");

dropdownMenu.addEventListener("click", displayDropdown);

function displayDropdown() {
  const isExpanded = dropdownMenu.getAttribute("aria-expanded");
  if (isExpanded === "true") {
    dropdownLink.style.display = "none";
    dropdownMenu.setAttribute("aria-expanded", "false");
    arrow.innerHTML = "<i class='fas fa-chevron-down'></i>";
  } else {
    dropdownLink.style.display = "block";
    dropdownMenu.setAttribute("aria-expanded", "true");
    arrow.innerHTML = "<i class='fas fa-chevron-up'></i>";
  }
}

// Sort medias with popularity
sortPopularity.addEventListener("click", () => {
  btnSort.innerHTML = `Popularité`;
  dropdownLink.style.display = "none";

  const medias = [media];
  const sortedMedias = medias.sort((a, b) => {
    return b.this.likes - a.this.likes;
  });
  console.log(sortedMedias);
});

//Sort medias with date
sortDate.addEventListener("click", () => {
  btnSort.innerHTML = `Date`;
  dropdownLink.style.display = "none";

  const medias = [media];
  const sortedMedias = medias.sort((a, b) => {
    return a.this.date - b.this.date;
  });
  console.log(sortedMedias);
});

//Sort medias with title
sortTitle.addEventListener("click", () => {
  btnSort.innerHTML = `Titre`;
  dropdownLink.style.display = "none";

  const medias = [media];
  medias.sort(function (a, b) {
    let x = a.title.toLowerCase();
    let y = b.title.toLowerCase();
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  });
});
