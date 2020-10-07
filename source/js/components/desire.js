const body = document.querySelector(`body`);
const pageDesire = document.querySelector(`.page-desire`);
const form = pageDesire === null ? null : pageDesire.querySelector(`form`);
const successPopup = document.querySelector(`.page-success-popup`);
import ClientsStorage from '../storage/storage.js';
import {sendRequest} from '../formulas';



form.addEventListener(`submit`, (evt) => {
  evt.preventDefault();
  const requestURL = evt.target.querySelector(`#desire-phone`).value

  sendRequest('GET', requestURL)
    .then(data => console.log(data))
    .catch(err => console.log(err))
});


