const body = document.querySelector(`body`);
const pageFeedback = document.querySelector(`.page-details__feedback`);
const form = pageFeedback === null ? null : pageFeedback.querySelector(`form`);
const successPopup = document.querySelector(`.page-success-popup`);
import ClientsStorage from '../storage/storage.js';
import {hideElement, onEscKeyDown, phoneSample, nameSample} from '../formulas';

const clientsStorage = new ClientsStorage();

let yandexMapsScript = null;
let yaMapsShown = false;

window.$(window).scroll(function () {
  if (!yaMapsShown) {
    if (window.$(window).height() + window.$(window).scrollTop() > window.$(`#YMapsID`).offset().top) {
      yaMapsShown = true;
      showYaMaps();

      yandexMapsScript.addEventListener(`load`, function () {
        window.ymaps.ready(init);
      });
    }
  }
});

if (form) {
  form.addEventListener(`submit`, (evt) => {
    evt.preventDefault();

    clientsStorage.putClient({
      'Full name': form.querySelector(`input[name="name"]`).value,
      'Phone number': form.querySelector(`input[name="phone"]`).value.toString(),
    });

    hideElement();
    form.reset();

    successPopup.classList.toggle(`visually-hidden`, false);
    document.addEventListener(`keydown`, onEscKeyDown);
    body.style.overflow = `hidden`;
  });

  form.addEventListener(`input`, (evt) => {
    if (evt.target.name === `phone`) {
      if (!phoneSample.test(evt.target.value)) {
        evt.target.setCustomValidity(`Напиши номер правильно`);

      } else {
        evt.target.setCustomValidity(``);
      }

    } else if (evt.target.name === `name`) {
      if (!nameSample.test(evt.target.value)) {
        evt.target.setCustomValidity(`Напиши ФИО правильно`);

      } else {
        evt.target.setCustomValidity(``);
      }
    }
  });
}

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


function showYaMaps() {
  yandexMapsScript = document.createElement(`script`);
  const key = `6b492866-f739-4d69-9dbc-9ff50d70ea08`;
  yandexMapsScript.type = `text/javascript`;
  yandexMapsScript.src = `https://api-maps.yandex.ru/2.1/?apikey=${key}&lang=ru_RU`;
  document.body.appendChild(yandexMapsScript);
}

