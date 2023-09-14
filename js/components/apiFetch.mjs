export function apiFetch(url, userData) {
  fetch(url, userData)
  .then((response) => response.json())
  .then((json) => {return (json)})
  .catch((error) => console.log(error));
}