import { apiFetch } from "./apiFetch.mjs";
import { API_SOCIAL_LOGIN_URL } from "./urls.mjs";

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

function setToken(json) {
  localStorage.setItem("userToken", json.accessToken);
  localStorage.setItem("username", json.name)
  window.location.href = "/feed.html";
}
