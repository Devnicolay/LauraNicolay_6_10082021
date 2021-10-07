import { ApiFisheye } from "../api-fisheye.js";
/**
 * DOM
 */

const modal = document.querySelector(".form-contact");
const contactMe = document.querySelector(".header-form #titlemodal");
const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const email = document.getElementById("email");
const message = document.getElementById("yourmessage");
const form = document.getElementById("form");

export class Form {
  //Open modal form
  static async openModal() {
    modal.style.display = "block";
    modal.setAttribute("aria-hidden", false);
    modal.setAttribute("aria-modal", true);
    const name = await Form.displayNamePhotographer();
    contactMe.innerHTML = "Contactez-moi " + name;
  }

  // Display the name for Photographer next to "Contactez-moi"
  static async displayNamePhotographer() {
    const namePhotographer = await ApiFisheye.getPhotographerId();
    return namePhotographer.name;
  }

  // close modal form with mouseclick
  static closeModal() {
    modal.style.display = "none";
  }

  // Close and send form with press escape on keyboard
  static keyboardTouchForm(e) {
    if (modal.ariaModal === "true" && e.key === "Escape") {
      Form.closeModal();
    }
    if (modal.ariaModal === "true" && e.key === "Enter") {
      Form.formValidation(event);
    }
  }

  /**
   * Check input validation
   */
  // Input firstname
  static firstNameCheck() {
    const alertMsg = document.querySelector(".firstname .alert-msg");
    if (firstName.value.trim().length >= 2) {
      // the value of firstName must have 2 caracters or more
      alertMsg.style.display = "none"; // alertMsg does not appear
      firstName.classList.remove("border-red"); // remove the class "border-red"
      return true;
    } else {
      alertMsg.style.display = "flex"; // alertMsg appear
      firstName.classList.add("border-red"); // add the class "border-red"
      return false;
    }
  }

  // Input lastname
  static lastNameCheck() {
    const alertMsg = document.querySelector(".lastname .alert-msg");
    if (lastName.value.trim().length >= 2) {
      // the value of lastname must have 2 caracters or more
      alertMsg.style.display = "none";
      lastName.classList.remove("border-red");
      return true;
    } else {
      alertMsg.style.display = "flex";
      lastName.classList.add("border-red");
      return false;
    }
  }

  // Input email
  static emailCheck() {
    const alertMsg = document.querySelector(".email .alert-msg");
    const mailFormat =
      /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/;
    // mailFormat is the format that the mail field must have, like letters, numbers, symbols @ letters, numbers .(dot) letters, numbers
    if (email.value.match(mailFormat)) {
      alertMsg.style.display = "none";
      email.classList.remove("border-red");
      return true;
    } else {
      alertMsg.style.display = "flex";
      email.classList.add("border-red");
      return false;
    }
  }

  // Input message
  static messageCheck() {
    const alertMsg = document.querySelector(".message .alert-msg");
    if (message.value.trim().length >= 2) {
      // the value of message must have 2 caracters or more
      alertMsg.style.display = "none";
      message.classList.remove("border-red");
      return true;
    } else {
      alertMsg.style.display = "flex";
      message.classList.add("border-red");
      return false;
    }
  }

  // Form validation
  static formValidation(event) {
    event.preventDefault();
    const isFirstNameValid = Form.firstNameCheck();
    const isLastNameValid = Form.lastNameCheck();
    const isEmailValid = Form.emailCheck();
    const isMessageValid = Form.messageCheck();
    if (isFirstNameValid && isLastNameValid && isEmailValid && isMessageValid) {
      Form.displayValuesInConsoleLog();
      Form.closeModal();
      form.reset();
    }
  }

  // Send form: display values for input in console.log
  static displayValuesInConsoleLog() {
    console.log(
      "Prénom:" +
        firstName.value +
        "\nNom:" +
        lastName.value +
        "\nEmail:" +
        email.value +
        "\nMessage:" +
        message.value
    );
  }
}
