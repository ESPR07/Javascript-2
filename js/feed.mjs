import { API_BASE_URL } from "./index.mjs";
import { apiFetch } from "./components/apiFetch.mjs";
const API_SOCIAL_POSTS_PATH = "/social/posts";
const API_SOCIAL_POSTS_URL = `${API_BASE_URL}${API_SOCIAL_POSTS_PATH}`;
const cardSection = document.querySelector(".posts-container");
const accessToken = localStorage.getItem("userToken");

function postCardTemplate(json) {
    json.forEach(({body, created, author}) => {
        const date = new Date(created)
        const formatDate = (date) => {
            return date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
        }
        
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

        if(author.avatar === "") {
        } else {
            userPostImage.style.backgroundImage = `url(${author.avatar})`
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

function createHTML() {
    const authorizationHeader = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    }
    apiFetch(`${API_SOCIAL_POSTS_URL}?limit=10&_author=true`, authorizationHeader, postCardTemplate)
}

if(accessToken) {
    createHTML()
} else {
    window.location.href = "/index.html";
}