const body = document.querySelector(`body`);
const pageHeader = document.querySelector(`.page-header`);
const requestPopup = document.querySelector(`.page-request-popup`);
const successPopup = document.querySelector(`.page-success-popup`);
const form = requestPopup === null ? null : requestPopup.querySelector(`form`);
const agreement = requestPopup === null ? null : requestPopup.querySelector(`.field-agreement`);
const btn = requestPopup === null ? null : requestPopup.querySelector(`button`);
import ClientsStorage from '../storage/storage.js';
import {hideElement, onEscKeyDown, phoneSample, nameSample} from '../formulas';

const clientsStorage = new ClientsStorage();

if (pageHeader) {
  pageHeader.querySelector(`.page-header__btn`)
      .addEventListener(`click`, () => {
        requestPopup.classList.toggle(`visually-hidden`, false);
        document.addEventListener(`keydown`, onEscKeyDown);
        body.style.overflow = `hidden`;
      });
}

if (requestPopup) {
  requestPopup.addEventListener(`click`, (evt) => {
    if (evt.target === requestPopup || evt.target.className === `popup-close`) {
      hideElement();
      form.reset();

    } else if (evt.target.className === `page-request-popup__inner`) {
      evt.stopPropagation();
    }
  });

  form.addEventListener(`submit`, (evt) => {
    evt.preventDefault();

    clientsStorage.putClient({
      'Full name': form.querySelector(`.block-name`).value,
      'Phone number': form.querySelector(`.block-phone`).value.toString(),
    });

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
    if (evt.target.className === `block-phone`) {
      if (!phoneSample.test(evt.target.value)) {
        evt.target.setCustomValidity(`Напиши номер правильно`);

      } else {
        evt.target.setCustomValidity(``);
      }

    } else if (evt.target.className === `block-name`) {
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
}

if (successPopup) {
  successPopup.addEventListener(`click`, (evt) => {
    if (evt.target === successPopup || evt.target.className === `popup-close` || evt.target.tagName === `BUTTON`) {
      hideElement();

    } else if (evt.target.className === `page-success-popup__inner`) {
      evt.stopPropagation();
    }
  });
}
