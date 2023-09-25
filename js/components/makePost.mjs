import { API_SOCIAL_POSTS_URL } from "./urls.mjs";
import { apiFetch } from "./apiFetch.mjs";
const accessToken = localStorage.getItem("userToken");
const submitPostInput = document.querySelector(".post-text");

export function makePost(e) {
  e.preventDefault();
  const postInfo = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      title: "userPost",
      body: submitPostInput.value,
    }),
  }

  apiFetch(API_SOCIAL_POSTS_URL, postInfo, logging);
}

function logging (file) {
  console.log(file);
}