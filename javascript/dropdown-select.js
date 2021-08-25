const dropdownMenu = document.querySelector("button");
const dropdownLink = document.querySelector(".dropdown");
const arrow = document.querySelector(".arrow");

dropdownMenu.addEventListener("click", unrollDropdown);
function unrollDropdown() {
  dropdownLink.style.display = "block";
  dropdownMenu.setAttribute("aria-expanded", "true");
  arrow.innerHTML =
    "<img onclick=rollUpDropdown class=chevron-up src=./images/rollup.svg alt=fermeture-liste-déroulante>";
}

function rollUpDropdown() {
  dropdownLink.style.display = "none";
}
