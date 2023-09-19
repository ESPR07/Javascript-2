import { API_BASE_URL } from "../index.mjs";
import { apiFetch } from "./apiFetch.mjs";
const API_SOCIAL_LOGIN_PATH = "/social/auth/login";
const API_SOCIAL_LOGIN_URL = API_BASE_URL + API_SOCIAL_LOGIN_PATH;

const loginForm = document.querySelector(".log-in-form");
const loginButton = document.querySelector(".log-in-button");

function login(event) {
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

function setToken(json) {
  localStorage.setItem("userToken", json.accessToken);
  localStorage.setItem("username", json.name)
  window.location.href = "/feed.html";
}

loginButton.addEventListener("click", login);
