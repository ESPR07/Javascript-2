export function apiFetch(url, userData, successHandler, errorHandler = (error) => console.log(error)) {
  fetch(url, userData)
  .then((response) => response.json())
  .then((json) => successHandler(json))
  .catch((error) => errorHandler(error));
}