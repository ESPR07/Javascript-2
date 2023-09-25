import { login } from "./components/login.mjs";
import { registerUser } from "./components/register.mjs";

const loginButton = document.querySelector(".log-in-button");
const submitRegister = document.querySelector(".submit-register");

loginButton.addEventListener("click", login);
submitRegister.addEventListener("click", registerUser);