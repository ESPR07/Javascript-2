import { API_BASE_URL } from "../index.mjs";
const registerEmailInput = document.querySelector(".register-email");
const registerPasswordInput = document.querySelector(".register-password");

const randomAPI = "https://jsonplaceholder.typicode.com/todos/1";

function register(registerURL) {
  fetch(registerURL)
    .then((response) => response.json())
    .then((json) => console.log(json));
}

register(randomAPI);

