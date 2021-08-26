const containerDivScroll = document.querySelector(".scroll-link");

window.addEventListener("scroll", displayDivScroll);

function displayDivScroll() {
  if (window.scrollY > 200) {
    containerDivScroll.style.display = "block";
    containerDivScroll.innerHTML = "<a href=#ancre-main>Passer au contenu</a>";
    console.log("marche");
  }
}
