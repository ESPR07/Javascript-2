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

  apiFetch(API_SOCIAL_POSTS_URL, postInfo, postMessage);
}

export function updatePost(content, id) {
  event.preventDefault();
  const updatedPostInfo = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      body: content,
    })
  }
  apiFetch(`${API_SOCIAL_POSTS_URL}/${id}`, updatedPostInfo, updateMessage)
}

export function deletePost(id) {
  const postToDelete = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-type': 'application/json; charset=UTF-8',
    }
  }
apiFetch(`${API_SOCIAL_POSTS_URL}/${id}`, postToDelete, deleteMessage)
}

function deleteMessage() {
  alert("Post deleted successfully!")
  window.location.reload()
}

function postMessage() {
  alert("Post successfully posted!");
  window.location.reload()
}

function updateMessage() {
  alert("post successfully updated!");
  window.location.reload()
}