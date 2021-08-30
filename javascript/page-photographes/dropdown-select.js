const dropdownMenu = document.querySelector("button");
const dropdownLink = document.querySelector(".dropdown");
const arrow = document.querySelector(".arrow");

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
