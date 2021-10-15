/**
 * DOM
 */

const sendBtn = document.querySelector("#send");
const modal = document.querySelector(".form-contact");
const contactMe = document.querySelector(".header-form #titlemodal");
const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const email = document.getElementById("email");
const message = document.getElementById("yourmessage");
const closeBtn = document.querySelector(".header-form .close-form");
const form = document.querySelector("form");

export class Form {
  constructor(photographer) {
    this.photographer = photographer;
    this.initListeners();
  }

  /**
   * Open modal form
   */
  openModal() {
    modal.style.display = "block";
    modal.setAttribute("aria-hidden", false);
    modal.setAttribute("aria-modal", true);
    contactMe.innerHTML = "Contactez-moi " + this.photographer.name;
  }

  /**
   * Close modal
   */
  closeModal() {
    modal.style.display = "none";
  }

  /**
   *
   * Listeners
   *
   */
  initListeners() {
    /**
     *
     * @param {event} e Close and send form with press escape on keyboard
     */
    // close and send form with keyboard
    window.addEventListener("keydown", (e) => {
      if (modal.ariaModal === "true" && e.key === "Escape") {
        this.closeModal();
      } else if (modal.ariaModal === "true" && e.key === "Enter") {
        this.formValidation();
      }
    });
    // close form
    closeBtn.addEventListener("click", () => {
      this.closeModal();
    });
    // Send form with mouseclick
    sendBtn.addEventListener("click", () => {
      this.formValidation();
    });
    // Check input validation
    firstName.addEventListener("blur", () => {
      this.firstNameCheck();
    });
    lastName.addEventListener("blur", () => {
      this.lastNameCheck();
    });
    email.addEventListener("blur", () => {
      this.emailCheck();
    });
    message.addEventListener("blur", () => {
      this.messageCheck();
    });
    const contactBtn = document.querySelector(".contact");
    contactBtn.addEventListener("click", () => {
      this.openModal();
    });
  }

  /**
   * Check input validation
   */
  // Input firstname
  firstNameCheck() {
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
  lastNameCheck() {
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
  emailCheck() {
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
  messageCheck() {
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

  /**
   *
   * Form validation
   */
  formValidation() {
    event.preventDefault();
    const isFirstNameValid = this.firstNameCheck();
    const isLastNameValid = this.lastNameCheck();
    const isEmailValid = this.emailCheck();
    const isMessageValid = this.messageCheck();
    if (isFirstNameValid && isLastNameValid && isEmailValid && isMessageValid) {
      this.displayValuesInConsoleLog();
      this.closeModal();
      form.reset();
    }
  }

  /**
   * Send form: display values for input in console.log
   */
  displayValuesInConsoleLog() {
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
