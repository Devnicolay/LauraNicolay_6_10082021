export class TagsFilter {
  constructor(photographers) {
    this.photographers = photographers;
    this.initListeners();
    this.redirectTagFilterHomePage();
  }
  /**
   * Display photographers who have the tag clicked
   *
   * @param {string} tagValue name of tag
   */
  displayPhotographersFiltered(tagValue) {
    const photographers = this.photographers;
    const filteredPhotographers = photographers.filter((photographer) => {
      return photographer.tags.includes(tagValue);
    });
    const containerPhotographers = document.querySelector(".Photographers");
    containerPhotographers.innerHTML = "";
    filteredPhotographers.forEach((photographer) => {
      const photographerConstructor = photographer;
      containerPhotographers.innerHTML +=
        photographerConstructor.createTemplateIndex();
      this.initListeners();
    });
  }

  /**
   * When click tag on photographer page, redirect on home page with filtered photographers with tag clicked
   */
  redirectTagFilterHomePage() {
    const ancre = window.location.hash;
    const ancreWithoutHashtag = ancre.replace("#", "");
    if (ancre == "") {
      console.log("none");
    } else {
      this.displayPhotographersFiltered(ancreWithoutHashtag);
    }
  }

  /**
   * Listeners
   */
  initListeners() {
    const tags = document.querySelectorAll(".tag");
    tags.forEach((tag) => {
      const tagValue = tag.getAttribute("data-filter");
      tag.addEventListener("click", () => {
        this.displayPhotographersFiltered(tagValue);
      });
    });
  }
}
