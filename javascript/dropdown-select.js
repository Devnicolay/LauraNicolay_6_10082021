const dropdownMenu = document.querySelector("button");
const dropdownLink = document.querySelector(".dropdown");
const arrow = document.querySelector(".arrow");

dropdownMenu.addEventListener("click", unrollDropdown);
function unrollDropdown() {
  dropdownLink.style.display = "block";
  dropdownMenu.setAttribute("aria-expanded", "true");
  arrow.innerHTML = "<i onclick=rollUpDropdown class='fas fa-chevron-up'></i>";
}

function rollUpDropdown() {
  dropdownLink.style.display = "none";
}
