const body = document.querySelector(`body`);
const pageDesire = document.querySelector(`.page-desire`);
const form = pageDesire === null ? null : pageDesire.querySelector(`form`);
const successPopup = document.querySelector(`.page-success-popup`);
import ClientsStorage from '../storage/storage.js';
import {hideElement, onEscKeyDown, phoneSample} from '../formulas';

const clientsStorage = new ClientsStorage();


if (form) {
  form.addEventListener(`input`, (evt) => {
    if (!phoneSample.test(evt.target.value)) {
      evt.target.setCustomValidity(`Напиши номер правильно`);

    } else {
      evt.target.setCustomValidity(``);
    }
  });

  form.addEventListener(`submit`, (evt) => {
    evt.preventDefault();

    clientsStorage.putClient({
      'Full name': Date.now().toString(),
      'Phone number': form.querySelector(`.block-phone`).value.toString(),
    });

    hideElement();
    form.reset();

    successPopup.classList.toggle(`visually-hidden`, false);
    document.addEventListener(`keydown`, onEscKeyDown);
    body.style.overflow = `hidden`;
  });
}


