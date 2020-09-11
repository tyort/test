const body = document.querySelector(`body`);
const pageHeader = document.querySelector(`.page-header`);
const popup = document.querySelector(`.page-request-popup`);
const form = popup.querySelector(`form`);
const button = popup.querySelector(`button`);

pageHeader.querySelector(`.page-header__btn`)
    .addEventListener(`click`, () => {
      popup.classList.toggle(`visually-hidden`, false);
      document.addEventListener(`keydown`, onEscKeyDown);

      if (window.innerWidth >= 768) {
        body.style.overflow = `hidden`;
      }
    });


function onEscKeyDown(evt) {
  if (evt.key === `Escape` || evt.key === `Esc`) {
    hideElement();
  }
}

function hideElement() {
  popup.classList.toggle(`visually-hidden`, true);
  document.removeEventListener(`keydown`, onEscKeyDown);
  body.style.overflow = `visible`;
  form.reset();
  button.setAttribute(`disabled`, `disabled`);
}
