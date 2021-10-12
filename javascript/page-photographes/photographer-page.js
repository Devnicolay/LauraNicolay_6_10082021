import { ApiFisheye } from "../api-fisheye.js";
import { Form } from "./form-modal.js";
import { Lightbox } from "./lightbox.js";
import { Like } from "./likes-and-price.js";
import { TagsFilter } from "../page-index/tags-filters.js";
/**
 * DOM
 */
// Dom in photographer page
const pagePhotographer = document.querySelector(".page-photographer");
const pagePhotographerMedia = document.querySelector(".medias");

// Dom for form
const closeBtn = document.querySelector(".header-form .close-form");
const sendBtn = document.querySelector("#send");
const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const email = document.getElementById("email");
const message = document.getElementById("yourmessage");

export class PagePhotographer {
  /**
   *
   * Display photographer and their medias
   */
  static async showPhotographerAndMedias() {
    const photographerId = await ApiFisheye.getPhotographerId();
    /**
     * Part photographer
     */
    // Create Html for photographer identity
    pagePhotographer.innerHTML = "";
    pagePhotographer.innerHTML = photographerId.createTemplatePhotographer();
    // Apply filters tags
    const tags = document.querySelectorAll(".tag");
    tags.forEach((tag) => {
      const tagValue = tag.getAttribute("data");
      tag.addEventListener("click", () => {
        window.location.href = "index.html#" + tagValue;
        setTimeout(TagsFilter.displayFilter(tagValue), 7000);
      });
    });
    /**
     * Form
     */
    // Launch form with button "Contactez moi"
    const contactBtn = document.querySelector(".contact");
    contactBtn.addEventListener("click", function () {
      Form.openModal();
    });
    // close form
    closeBtn.addEventListener("click", function () {
      Form.closeModal();
    });
    // close and send form with keyboard
    window.addEventListener("keydown", Form.keyboardTouchForm);
    // Send form with mouseclick
    sendBtn.addEventListener("click", Form.formValidation);
    // Check input validation
    firstName.addEventListener("blur", Form.firstNameCheck);
    lastName.addEventListener("blur", Form.lastNameCheck);
    email.addEventListener("blur", Form.emailCheck);
    message.addEventListener("blur", Form.messageCheck);
    /**
     * Part medias
     */
    // Create Html for médias by photographer
    pagePhotographerMedia.innerHTML = photographerId.initializeMedia();
    /**
     * Lightbox
     */
    const lightbox = new Lightbox(photographerId.medias);

    // get source of media and launch lightbox
    const allMedias = Array.from(document.querySelectorAll(".media-img-video"));
    allMedias.forEach((media) => {
      media.addEventListener("click", async () => {
        const source = Lightbox.sourceMedia(media); // get source of media clicked
        const mediaClicked = await Lightbox.findMediaClicked(source); // return media clicked
        lightbox.openLightbox(mediaClicked);
      });
    });
    // close, next and previous lightbox with mouse click
    const crossLightbox = document.querySelector(".lightbox-close i");
    crossLightbox.addEventListener("click", Lightbox.closeLightbox);
    const chevronRight = document.querySelector(".fa-chevron-right");
    chevronRight.addEventListener("click", Lightbox.next);
    const chevronLeft = document.querySelector(".fa-chevron-left");
    chevronLeft.addEventListener("click", Lightbox.previous);
    /**
     * Likes
     */
    // Likes : increment and display likes at the bottom of the photographer's page
    Like.likeAndPrice();
    const likes = document.querySelectorAll(".heart");
    likes.forEach((like) => {
      like.addEventListener("click", Like.likeMedia);
      like.addEventListener("click", Like.calculationLikeClicked);
      like.addEventListener("click", Like.increment);
      like.addEventListener("click", Like.colorIcon());
    });
  }
}

/**
 * loading photographer page
 */
window.onload = loadPagePhotographer();
function loadPagePhotographer() {
  PagePhotographer.showPhotographerAndMedias();
}
