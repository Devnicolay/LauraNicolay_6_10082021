import { ApiFisheye } from "../api-fisheye.js";
import { MediaFactory } from "../medias-factory.js";
import { Photographer } from "../photographers.js";
import { Form } from "./form-modal.js";
import { Lightbox } from "./lightbox.js";
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
    // // get source of media and launch lightbox
    const allMedias = Array.from(document.querySelectorAll(".media-img-video"));
    allMedias.forEach((media) => {
      media.addEventListener("click", (event) => {
        const src = event.currentTarget.getAttribute("src");
        console.log(src);
        Lightbox.openLightbox(src);
      });
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
