import { apiFetch } from "./apiFetch.mjs";
import { API_SOCIAL_LOGIN_URL } from "./urls.mjs";

/**
 * A function that passes in login information from the user to the API if email and password is valid.
 * @param {*} event Purely to prevent errors with the event property.
 */
export function login(event) {
  event.preventDefault();
  const loginEmail = document.querySelector(".log-in-email").value;
  const loginPassword = document.querySelector(".log-in-password").value;

  const accountInfo = {
    method: "POST",
    body: JSON.stringify({
      email: loginEmail,
      password: loginPassword,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  apiFetch(API_SOCIAL_LOGIN_URL, accountInfo, setToken);
}

/**
 * a function for storing the user information in local storage for access to the site.
 * @param {object} json The JSON that is returned in a API Fetch.
 */
function setToken(json) {
  if (json) {
    localStorage.setItem("userToken", json.accessToken);
    localStorage.setItem("email", json.email);
    localStorage.setItem("name", json.name);
  } else {
    console.log("error");
  }
}
