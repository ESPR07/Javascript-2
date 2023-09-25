const dateSelector = document.querySelector("#date-filter");
const cardSection = document.querySelector(".posts-container");

/**
 * Function that renders the posts based on API response as well as filtering if a filter or searchword has been passed in.
 * @param {object} json The JSON Response from API Call
 */
export function postCardTemplate(json) { //se om man kan modulere koden!
  const searchValue = document.querySelector(".searchbar").value;
  const filteredArray = json.filter((json) =>
    json.created.includes(dateSelector.value)
  );
  const searchedArray = filteredArray.filter(
    (json) =>
      json.author.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      (json.body && json.body.toLowerCase().includes(searchValue.toLowerCase()))
  );

  searchedArray.forEach(({ body, created, author }) => {
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

    const postContentText = document.createElement("p");
    postContentText.classList.add("post-content-text");
    postContentText.innerText = body;
    postContent.append(postContentText);

    const postInteractions = document.createElement("div");
    postInteractions.classList.add("post-interactions");
    postInteractions.classList.add("d-flex");
    postInteractions.classList.add("justify-content-end");
    postContent.append(postInteractions);

    const postEdit = document.createElement("a");
    postEdit.href = "#";
    postEdit.innerText = "Edit";
    postInteractions.append(postEdit);

    const postDelete = document.createElement("a");
    postDelete.href = "#";
    postDelete.classList.add("ms-3");
    postDelete.innerText = "Delete";
    postInteractions.append(postDelete);
  });
}