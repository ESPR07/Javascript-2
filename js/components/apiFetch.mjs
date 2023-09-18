/**
 * 
 * @param {string} url The API URL
 * @param {object} userData Any data that wants to be passed into the fetch. 
 * @param {function} successHandler A function you want to use the response in.
 * @param {function} errorHandler How you want to deal with a error of the fetch. It console logs error by default.
 */
export function apiFetch(url, userData, successHandler, errorHandler = (error) => console.log(error)) {
  fetch(url, userData)
  .then((response) => response.json())
  .then((json) => successHandler(json))
  .catch((error) => errorHandler(error));
}