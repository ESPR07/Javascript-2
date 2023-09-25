import { API_BASE_URL } from "../index.mjs";
import { apiFetch } from "./apiFetch.mjs";
const API_SOCIAL_POST_PATH = "/social/posts";
const API_SOCIAL_POST_URL = `${API_BASE_URL}${API_SOCIAL_POST_PATH}`;
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

  console.log(postInfo);
  apiFetch(API_SOCIAL_POST_URL, postInfo, logging);
}

function logging (file) {
  console.log(file);
}