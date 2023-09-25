import { API_SOCIAL_POSTS_URL } from "./components/urls.mjs";
import { apiFetch } from "./components/apiFetch.mjs";
import { postCardTemplate } from "./components/renderHTML.mjs";
import { makePost } from "./components/makePost.mjs";
const accessToken = localStorage.getItem("userToken");
const searchButton = document.querySelector(".search-button");
const submitPostButton = document.querySelector(".submit-post-button");
const dateSelector = document.querySelector("#date-filter");

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
    `${API_SOCIAL_POSTS_URL}?limit=10&_author=true`,
    authorizationHeader,
    postCardTemplate
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
searchButton.addEventListener("click", createHTMLFiltered);
submitPostButton.addEventListener("click", makePost);
