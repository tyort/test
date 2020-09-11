const requestPopup = document.querySelector(`.page-request-popup`);
const successPopup = document.querySelector(`.page-success-popup`);
const form = requestPopup.querySelector(`form`);
const agreement = requestPopup.querySelector(`.field-agreement`);
const btn = requestPopup.querySelector(`button`);
const phoneSample = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
const nameSample = /^[a-zA-Zа-яёА-ЯЁ]+$/u;

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

  successPopup.classList.toggle(`visually-hidden`, false);
  document.addEventListener(`keydown`, onEscKeyDown);

  if (window.innerWidth >= 768) {
    document.querySelector(`body`).style.overflow = `hidden`;
  }
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

function onEscKeyDown(evt) {
  if (evt.key === `Escape` || evt.key === `Esc`) {
    hideElement();
  }
}

function hideElement() {
  successPopup.classList.toggle(`visually-hidden`, true);
  requestPopup.classList.toggle(`visually-hidden`, true);
  document.removeEventListener(`keydown`, onEscKeyDown);
  document.querySelector(`body`).style.overflow = `visible`;
  form.reset();

  if (!btn.hasAttribute(`disabled`)) {
    btn.setAttribute(`disabled`, `disabled`);
  }
}


