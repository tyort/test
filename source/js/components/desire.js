const body = document.querySelector(`body`);
const pageDesire = document.querySelector(`.page-desire`);
const form = pageDesire.querySelector(`form`);
const successPopup = document.querySelector(`.page-success-popup`);
import {hideElement, onEscKeyDown, phoneSample} from '../formulas';

form.addEventListener(`input`, (evt) => {
  if (!phoneSample.test(evt.target.value)) {
    evt.target.setCustomValidity(`Напиши номер правильно`);

  } else {
    evt.target.setCustomValidity(``);
  }
});

form.addEventListener(`submit`, (evt) => {
  evt.preventDefault();
  hideElement();
  form.reset();

  successPopup.classList.toggle(`visually-hidden`, false);
  document.addEventListener(`keydown`, onEscKeyDown);
  body.style.overflow = `hidden`;
});
