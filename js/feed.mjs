const cardSection = document.querySelector(".posts-container");

function createPostCard() {
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
    postUsername.innerText = "User Name";
    postInfo.append(postUsername);

    const postTimePosted = document.createElement("p");
    postTimePosted.classList.add("time-posted");
    postTimePosted.classList.add("mb-0");
    postTimePosted.innerText = "24. october 1996";
    postInfo.append(postTimePosted);

    const postContent = document.createElement("div");
    postContent.classList.add("post-content");
    cardContainer.append(postContent);

    const userPostImage = document.createElement("a");
    userPostImage.href = "/profile.html";
    userPostImage.classList.add("user-post-image");
    postContent.append(userPostImage);

    const postContentText = document.createElement("p");
    postContentText.classList.add("post-content-text");
    postContentText.innerText = "Hey! I saw you adding that new game to the mix! looks hype.";
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
}

createPostCard();