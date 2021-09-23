const modal = document.querySelector(".form-contact");
const contactMe = document.querySelector(".header-form #titlemodal");
const closeBtn = document.querySelector(".header-form .close-form");
const sendBtn = document.querySelector("#send");
const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const email = document.getElementById("email");
const message = document.getElementById("yourmessage");
const form = document.getElementById("form");

//launch modal form
async function openModal() {
  modal.style.display = "block";
  modal.setAttribute("aria-hidden", false);
  modal.setAttribute("aria-modal", true);
  const name = await displayNamePhotographer();
  contactMe.innerHTML = "Contactez-moi " + name;
}

// close modal form with mouseclick
closeBtn.addEventListener("click", closeModal);

function closeModal() {
  modal.style.display = "none";
}

// close modal with press escape on keyboard
window.addEventListener("keydown", escapeKeyForm);
function escapeKeyForm(e) {
  if (modal.ariaModal === "true" && e.key === "Escape") {
    closeModal();
  }
}

// Display the name for Photographer next to "Contactez-moi"
async function displayNamePhotographer() {
  const namePhotographer = await photographerById();
  return namePhotographer.name;
}

// Check input validation
// Input firstname
firstName.addEventListener("blur", firstNameCheck);

function firstNameCheck() {
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
lastName.addEventListener("blur", lastNameCheck);

function lastNameCheck() {
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
email.addEventListener("blur", emailCheck);

function emailCheck() {
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
message.addEventListener("blur", messageCheck);

function messageCheck() {
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

// Send form
sendBtn.addEventListener("click", formValidation); // send form with mouseclick
// send form with press escape on keyboard
window.addEventListener("keydown", enterKeyForm);
function enterKeyForm(e) {
  if (modal.ariaModal === "true" && e.key === "Enter") {
    formValidation(event);
  }
}

function formValidation(event) {
  event.preventDefault();
  const isFirstNameValid = firstNameCheck();
  const isLastNameValid = lastNameCheck();
  const isEmailValid = emailCheck();
  const isMessageValid = messageCheck();
  if (isFirstNameValid && isLastNameValid && isEmailValid && isMessageValid) {
    displayValuesInConsoleLog();
    closeModal();
    form.reset();
  }
}

// Send form: display values for input in console.log
function displayValuesInConsoleLog() {
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
