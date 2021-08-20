const lastScrollPosition = 0;
var ticking = false;
const containerDivScroll = document.querySelector(".scroll-link");

function displayDiv(position_scroll) {
  // faire quelque chose avec la position du scroll
  containerDivScroll.innerHTML = "<a href=#ancre-main>Passer au contenu</a>";
}

window.addEventListener("scroll", function (e) {
  lastScrollPosition = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(function () {
      displayDiv(lastScrollPosition);
      ticking = false;
    });
  }

  ticking = true;
});
