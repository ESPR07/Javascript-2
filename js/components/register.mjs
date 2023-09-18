import { API_BASE_URL } from "../index.mjs";
import { apiFetch } from "./apiFetch.mjs";
const API_SOCIAL_REGISTER_PATH = "/social/auth/register";
const API_SOCIAL_REGISTER_URL = API_BASE_URL + API_SOCIAL_REGISTER_PATH;
const registerForm = document.querySelector(".register-form");
const submitRegister = document.querySelector(".submit-register");
const registerErrorMessage = document.querySelector(".register-error-message");

const testAPI =
  "https://jsonplaceholder.typicode.com/todos/1"; /*testing purpose, delete when done*/

function registerUser() {
  event.preventDefault();
  const registerNameInput = document.querySelector(".register-name").value;
  const registerEmailInput = document.querySelector(".register-email").value;
  const emailError = document.querySelector(".email-error");
  const registerPasswordInput =
    document.querySelector(".register-password").value;
  const passwordError = document.querySelector(".password-error");
  if (emailValidation(registerEmailInput)) {
  } else {
    emailError.classList.remove("hidden");
  }

  if (lengthValidator(registerPasswordInput, 8)) {
  } else {
    passwordError.classList.remove("hidden");
  }

  if (
    emailValidation(registerEmailInput) &&
    lengthValidator(registerPasswordInput, 8)
  ) {
    const newAccountInfo = {
      method: "POST",
      body: JSON.stringify({
        name: registerNameInput,
        email: registerEmailInput,
        password: registerPasswordInput,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    apiFetch(API_SOCIAL_REGISTER_URL, newAccountInfo, displayErrorMessage)
    // fetch(API_SOCIAL_REGISTER_URL, newAccountInfo)
    //   .then((response) => response.json())
    //   .then((json) => displayErrorMessage(json))
    //   .catch((error) => console.log(error));
  }
}

/**
 * Function that validates if the mail type is noroff.no or stud.noroff.no.
 * @param {string} email The mail that will be validated.
 * @returns The result of the validation.
 * @example
 * ```js
 * // Inject a email as a string
 * const mail = "mail";
 * emailValidation(mail);
 * // Expect true or false returned
 * ```
 */
function emailValidation(email) {
  const mailRegEx = /\b[A-Za-z0-9._%+-]+@(noroff\.no|stud\.noroff\.no)\b/;
  return mailRegEx.test(email);
}

/**
 * Function validating the minimum length of a string
 * @param {string} value The value you want to validate
 * @param {number} compareValue The value indicating the minimum length of the string
 * @returns True or False
 * @example
 * ```js
 * // compare a string with length
 * const string = "hello"
 * const number = 8
 * const compare = lengthValidator(string, number)
 * // expected return false
 * ```
 */
function lengthValidator(value, compareValue) {
  return value.trim().length >= compareValue;
}

/**
 * Displays an error message if it detects an error code. (made for Noroff API)
 * @param {object} json Insert a json from a fetch 
 */
function displayErrorMessage(json) {
  if(json.statusCode = 400) {
    registerErrorMessage.classList.remove("hidden");
  } else {
    console.log("an error occured");
  }
}

submitRegister.addEventListener("click", registerUser);
