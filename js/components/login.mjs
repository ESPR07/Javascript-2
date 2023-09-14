import { API_BASE_URL } from "../index.mjs";
const API_SOCIAL_LOGIN_PATH = "/social/auth/login";
const API_SOCIAL_LOGIN_URL = API_BASE_URL + API_SOCIAL_LOGIN_PATH;

const loginForm = document.querySelector(".log-in-form");
const loginButton = document.querySelector(".log-in-button");

function login() {
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

  fetch(API_SOCIAL_LOGIN_URL, accountInfo)
    .then((response) => (response.json()))
    .then((json) => setToken(json.accessToken))
    .then(() => window.location.href = "/feed.html")
    .catch((error) => console.log(error));
};

function setToken(JSON) {
  localStorage.setItem("userToken", JSON)
}

loginButton.addEventListener("click", login);
