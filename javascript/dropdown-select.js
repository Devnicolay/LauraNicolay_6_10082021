const dropdownMenu = document.querySelector("button");
const dropdownLink = document.querySelector(".dropdown");

dropdownMenu.addEventListener("click", unrollDropdown);
function unrollDropdown() {
  dropdownLink.style.display = "block";
}
