const containerDivScroll = document.querySelector(".scroll-link");

window.addEventListener("scroll", diplayBackToTop);

/**
 * Display back to top photographers, on home page
 */
function diplayBackToTop() {
  if (window.scrollY > 200) {
    containerDivScroll.style.display = "block";
    containerDivScroll.innerHTML = "<a href=#ancre-main>Passer au contenu</a>";
  }
}
