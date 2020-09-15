const body = document.querySelector(`body`);
const pageHeader = document.querySelector(`.page-header`);
const requestPopup = document.querySelector(`.page-request-popup`);
const successPopup = document.querySelector(`.page-success-popup`);
const form = requestPopup.querySelector(`form`);
const agreement = requestPopup.querySelector(`.field-agreement`);
const btn = requestPopup.querySelector(`button`);
import {hideElement, onEscKeyDown, phoneSample, nameSample} from '../formulas';

pageHeader.querySelector(`.page-header__btn`)
    .addEventListener(`click`, () => {
      requestPopup.classList.toggle(`visually-hidden`, false);
      document.addEventListener(`keydown`, onEscKeyDown);
      body.style.overflow = `hidden`;
    });

requestPopup.addEventListener(`click`, (evt) => {
  if (evt.target === requestPopup || evt.target.className === `popup__close`) {
    hideElement();
  } else if (evt.target.className === `page-request-popup__inner`) {
    evt.stopPropagation();
  }
});

form.addEventListener(`submit`, (evt) => {
  evt.preventDefault();
  hideElement();
  form.reset();

  if (!btn.hasAttribute(`disabled`)) {
    btn.setAttribute(`disabled`, `disabled`);
  }

  successPopup.classList.toggle(`visually-hidden`, false);
  document.addEventListener(`keydown`, onEscKeyDown);
  body.style.overflow = `hidden`;
});

form.addEventListener(`input`, (evt) => {
  if (evt.target.id === `block-phone`) {
    if (!phoneSample.test(evt.target.value)) {
      evt.target.setCustomValidity(`Напиши номер правильно`);

    } else {
      evt.target.setCustomValidity(``);
    }

  } else if (evt.target.id === `block-name`) {
    if (!nameSample.test(evt.target.value)) {
      evt.target.setCustomValidity(`Напиши ФИО правильно`);

    } else {
      evt.target.setCustomValidity(``);
    }
  }
});

agreement.addEventListener(`change`, (evt) => {
  if (evt.target.checked) {
    btn.removeAttribute(`disabled`);
    return;
  }
  btn.setAttribute(`disabled`, `disabled`);
});

successPopup.addEventListener(`click`, (evt) => {
  if (evt.target === successPopup || evt.target.className === `popup__close` || evt.target.tagName === `BUTTON`) {
    hideElement();

  } else if (evt.target.className === `page-success-popup__inner`) {
    evt.stopPropagation();
  }
});

