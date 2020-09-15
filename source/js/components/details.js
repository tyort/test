const body = document.querySelector(`body`);
const pageFeedback = document.querySelector(`.page-details__feedback`);
const form = pageFeedback.querySelector(`form`);
const successPopup = document.querySelector(`.page-success-popup`);
import {hideElement, onEscKeyDown, phoneSample, nameSample} from '../formulas';

window.addEventListener(`mapWasLoaded`, () => {
  window.ymaps.ready(init);
});

form.addEventListener(`submit`, (evt) => {
  evt.preventDefault();
  hideElement();
  form.reset();

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

function init() {
  let myMap = new window.ymaps.Map(`YMapsID`, {
    center: [55.028723, 82.926924],
    zoom: 18,
  }, {
    searchControlProvider: `yandex#search`
  });

  const myPlacemark = new window.ymaps.Placemark([55.028522, 82.928281], {
    hintContent: `Адрес куратора`,
  }, {
    iconLayout: `default#image`,
    iconImageHref: `img/icon-map-marker.png`,
    iconImageSize: [18, 28],
    iconImageOffset: [-9, -28],
  });

  myMap.geoObjects
      .add(myPlacemark);
}


