import { deletePost } from "./postInteractions.mjs";
import { updatePost } from "./postInteractions.mjs";
const dateSelector = document.querySelector("#date-filter");
const cardSection = document.querySelector(".posts-container");

/**
 * Function that renders the posts based on API response as well as filtering if a filter or searchword has been passed in.
 * @param {object} json The JSON Response from API Call
 */
export function postCardTemplate(json) {
  const searchValue = document.querySelector(".searchbar").value;
  const loggedEmail = localStorage.getItem("email");
  const filteredArray = json.filter((json) =>
    json.created.includes(dateSelector.value)
  );
  const searchedArray = filteredArray.filter(
    (json) =>
      json.author.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      (json.body && json.body.toLowerCase().includes(searchValue.toLowerCase()))
  );

  searchedArray.forEach(({ body, title, created, author, id }) => {
    const date = new Date(created);
    const formatDate = (date) => {
      return date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
    };

    const cardContainer = document.createElement("div");
    cardContainer.classList.add("post");
    cardSection.append(cardContainer);

    const postInfo = document.createElement("div");
    postInfo.classList.add("post-info");
    postInfo.classList.add("d-flex");
    postInfo.classList.add("justify-content-between");
    cardContainer.append(postInfo);

    const postUsername = document.createElement("a");
    postUsername.href = "/profile.html";
    postUsername.classList.add("user-name");
    postUsername.classList.add("fs-4");
    postUsername.innerText = author.name;
    postInfo.append(postUsername);

    const postTimePosted = document.createElement("p");
    postTimePosted.classList.add("time-posted");
    postTimePosted.classList.add("mb-0");
    postTimePosted.innerText = formatDate(date);
    postInfo.append(postTimePosted);

    const postContent = document.createElement("div");
    postContent.classList.add("post-content");
    cardContainer.append(postContent);

    const userPostImage = document.createElement("a");
    userPostImage.href = "/profile.html";
    userPostImage.classList.add("user-post-image");
    postContent.append(userPostImage);

    if (author.avatar === "" || author.avatar === null) {
    } else {
      userPostImage.style.backgroundImage = `url(${author.avatar})`;
    }

    const postContentContainer = document.createElement("div");
    postContentContainer.classList.add("post-content-container");
    postContentContainer.classList.add("w-100");
    postContentContainer.classList.add("mx-3")
    postContent.append(postContentContainer);

    const postContentText = document.createElement("a");
    postContentText.classList.add("post-content-text");
    postContentText.classList.add("text-decoration-none");
    postContentText.classList.add("text-white");
    postContentText.href = `/singlePost.html?id=${id}`;
    postContentText.style.cursor = "pointer";
    if (body === "" || null || undefined) {
      postContentText.innerText = title;
    }
    postContentText.innerText = body;
    postContentContainer.append(postContentText);

    const postInteractions = document.createElement("div");
    postInteractions.classList.add("post-interactions");
    postInteractions.classList.add("d-flex");
    postInteractions.classList.add("justify-content-end");
    postContentContainer.append(postInteractions);

    if (author.email === loggedEmail) {
      const postEdit = document.createElement("a");
      postEdit.href = "#";
      postEdit.innerText = "Edit";
      postInteractions.append(postEdit);
      postEdit.addEventListener("click", () => {
        postEdit.style.display = "none";
        postDelete.style.display = "none";
        postContentText.innerText = "";

        const editInput = document.createElement("textarea");
        editInput.rows = "3";
        editInput.classList.add("post-content-text");
        editInput.classList.add("w-100");
        editInput.value = body;
        postInteractions.append(editInput);

        const editSubmit = document.createElement("a");
        editSubmit.href = "#";
        editSubmit.innerText = "Update";
        postInteractions.append(editSubmit);
        editSubmit.addEventListener("click", () => {
          updatePost(editInput.value, id);
        });
      });

      const postDelete = document.createElement("a");
      postDelete.href = "#";
      postDelete.classList.add("ms-3");
      postDelete.innerText = "Delete";
      postInteractions.append(postDelete);
      postDelete.addEventListener("click", () => {
        deletePost(id);
      });
    }
  });
}

/**
 * Renders a single post fetched by using ID
 * @param {object} json
 */
export function singleCardTemplate(json) {
  const loggedEmail = localStorage.getItem("email");
  const date = new Date(json.created);
  const formatDate = (date) => {
    return date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
  };

  const cardContainer = document.createElement("div");
  cardContainer.classList.add("post");
  cardSection.append(cardContainer);

  const postInfo = document.createElement("div");
  postInfo.classList.add("post-info");
  postInfo.classList.add("d-flex");
  postInfo.classList.add("justify-content-between");
  cardContainer.append(postInfo);

  const postUsername = document.createElement("a");
  postUsername.href = "/profile.html";
  postUsername.classList.add("user-name");
  postUsername.classList.add("fs-4");
  postUsername.innerText = json.author.name;
  postInfo.append(postUsername);

  const postTimePosted = document.createElement("p");
  postTimePosted.classList.add("time-posted");
  postTimePosted.classList.add("mb-0");
  postTimePosted.innerText = formatDate(date);
  postInfo.append(postTimePosted);

  const postContent = document.createElement("div");
  postContent.classList.add("post-content");
  cardContainer.append(postContent);

  const userPostImage = document.createElement("a");
  userPostImage.href = "/profile.html";
  userPostImage.classList.add("user-post-image");
  postContent.append(userPostImage);

  if (json.author.avatar === "" || json.author.avatar === null) {
  } else {
    userPostImage.style.backgroundImage = `url(${json.author.avatar})`;
  }

  const postContentContainer = document.createElement("div");
  postContentContainer.classList.add("post-content-container");
  postContentContainer.classList.add("w-100");
  postContent.append(postContentContainer);

  const postContentText = document.createElement("p");
  postContentText.classList.add("post-content-text");
  postContentText.classList.add("text-decoration-none");
  postContentText.classList.add("text-white");
  if (json.body === "" || null || undefined) {
    postContentText.innerText = json.title;
  }
  postContentText.innerText = json.body;
  postContentContainer.append(postContentText);

  const postInteractions = document.createElement("div");
  postInteractions.classList.add("post-interactions");
  postInteractions.classList.add("d-flex");
  postInteractions.classList.add("justify-content-end");
  postContentContainer.append(postInteractions);

  if (json.author.email === loggedEmail) {
    const postEdit = document.createElement("a");
    postEdit.href = "#";
    postEdit.innerText = "Edit";
    postInteractions.append(postEdit);
    postEdit.addEventListener("click", () => {
      postEdit.style.display = "none";
      postDelete.style.display = "none";
      postContentText.innerText = "";

      const editInput = document.createElement("textarea");
      editInput.rows = "3";
      editInput.classList.add("post-content-text");
      editInput.classList.add("w-100");
      editInput.value = json.body;
      postInteractions.append(editInput);

      const editSubmit = document.createElement("a");
      editSubmit.href = "#";
      editSubmit.innerText = "Update";
      postInteractions.append(editSubmit);
      editSubmit.addEventListener("click", () => {
        updatePost(editInput.value, id);
      });
    });

    const postDelete = document.createElement("a");
    postDelete.href = "#";
    postDelete.classList.add("ms-3");
    postDelete.innerText = "Delete";
    postInteractions.append(postDelete);
    postDelete.addEventListener("click", () => {
      deletePost(id);
    });
  }
}
