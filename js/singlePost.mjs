import { API_SOCIAL_POSTS_URL } from "./components/urls.mjs";
import { apiFetch } from "./components/apiFetch.mjs";
import { singleCardTemplate } from "./components/renderHTML.mjs";
const accessToken = localStorage.getItem("userToken");
const searchButton = document.querySelector(".searchbar");
const dateSelector = document.querySelector("#date-filter");
const cardSection = document.querySelector(".posts-container");
const searchParams = new URLSearchParams(window.location.search);
const searchValue = searchParams.get("id");

/**
 * Function that calls on all functions needed for HTML render.
 */
function createHTML() {
  const authorizationHeader = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  apiFetch(
    `${API_SOCIAL_POSTS_URL}/${searchValue}?_author=true`,
    authorizationHeader,
    singleCardTemplate
  );
}

if (accessToken) {
  createHTML();
} else {
  window.location.href = "/index.html";
}

/**
 * Function that resets HTML to accomodate searching and filter options when clicked.
 * @param {*} event Avoids depricate warnings.
 */
function createHTMLFiltered(event) {
  event.preventDefault();
  cardSection.innerHTML = "";
  createHTML();
}

dateSelector.addEventListener("input", createHTMLFiltered);
searchButton.addEventListener("input", createHTMLFiltered);