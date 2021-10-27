/**
 * DOM
 */

const sendBtn = document.querySelector("#send");
const modal = document.querySelector(".form-contact");
const modalContent = document.querySelector(".modal");
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
    modalContent.setAttribute("aria-hidden", "false");
    modalContent.setAttribute("aria-modal", "true");
    closeBtn.focus();
    contactMe.innerHTML = `<p aria-label="Remplir les champs du formulaire">Contactez-moi ${this.photographer.name}<p>`;
    this.modalFocus();
  }

  /**
   * Keep the focus in the modal
   */
  modalFocus() {
    const focusableElements =
      '.header-form .close-form, #send, input , textarea, [tabindex]:not([tabindex="-1"])';
    const firstFocusableElement = modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
    const focusableContent = modal.querySelectorAll(focusableElements);
    const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal

    document.addEventListener("keydown", function (e) {
      let isTabPressed = e.key === "Tab";

      if (!isTabPressed) {
        return;
      }

      if (e.shiftKey) {
        // if shift key pressed for shift + tab combination
        if (document.activeElement === firstFocusableElement) {
          // if focused is to first focusable element, focus on the last focusable element after pressing shift + tab
          lastFocusableElement.focus(); // add focus for the last focusable element
          e.preventDefault();
        }
      } else {
        // if tab key is pressed
        if (document.activeElement === lastFocusableElement) {
          // if focused is to last focusable element, focus on the first focusable element after pressing tab
          firstFocusableElement.focus(); // add focus for the first focusable element
          e.preventDefault();
        }
      }
    });
  }

  /**
   * Close modal
   */
  closeModal() {
    modal.style.display = "none";
    modalContent.setAttribute("aria-hidden", "true");
    modalContent.setAttribute("aria-modal", "false");
  }

  /**
   *
   * Listeners
   *
   */
  initListeners() {
    /**
     * Listeners
     *
     * @param {event} e Close and send form with press escape on keyboard
     */
    // close and send form with keyboard
    window.addEventListener("keydown", (e) => {
      if (modalContent.ariaModal === "true" && e.key === "Escape") {
        this.closeModal();
      } else if (modalContent.ariaModal === "true" && e.key === "Enter") {
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
    contactBtn.addEventListener("enter", () => {
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
      firstName.setAttribute("aria-invalid", "true");
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
      lastName.setAttribute("aria-invalid", "true");
      return false;
    }
  }

  // Input email
  emailCheck() {
    const alertMsg = document.querySelector(".email .alert-msg");
    const mailFormat =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/;
    // mailFormat is the format that the mail field must have, like letters, numbers, symbols @ letters, numbers .(dot) letters, numbers
    if (email.value.match(mailFormat)) {
      alertMsg.style.display = "none";
      email.classList.remove("border-red");
      return true;
    } else {
      alertMsg.style.display = "flex";
      email.classList.add("border-red");
      email.setAttribute("aria-invalid", "true");
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
      message.setAttribute("aria-invalid", "true");
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
