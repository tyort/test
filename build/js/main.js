(function () {
  'use strict';

  const menu = document.querySelector(`#check-menu`);
  const agreement = document.querySelector(`.field-agreement`).querySelector(`input`);
  const btn = document.querySelector(`.page-booking__form`).querySelector(`button`);
  const form = document.querySelector(`.page-booking__form`);


  form.addEventListener(`input`, (evt) => {
    const phoneSample = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
    const mailSample = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
    const nameSample = /^[a-zA-Zа-яёА-ЯЁ]+$/u;

    if (evt.target.className === `field-phone__input`) {
      if (!phoneSample.test(evt.target.value)) {
        evt.target.setCustomValidity(`Напиши номер правильно`);

      } else {
        evt.target.setCustomValidity(``);
      }

    } else if (evt.target.className === `field-email__input`) {
      if (!mailSample.test(evt.target.value)) {
        evt.target.setCustomValidity(`Напиши email правильно`);

      } else {
        evt.target.setCustomValidity(``);
      }
    } else if (evt.target.className === `field-name__input`) {
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

  menu.addEventListener(`change`, () => {
    if (menu.checked === true) {
      document.addEventListener(`keydown`, onEscKeyDown);
    }
  });

  function onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      menu.checked = false;
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  }

  window.addEventListener(`mapWasLoaded`, () => {
    window.ymaps.ready(init);
  });

  function init() {
    let myMap = new window.ymaps.Map(`YMapsID`, {
      center: [59.938635, 30.323118],
      zoom: 15,
    }, {
      searchControlProvider: `yandex#search`
    });

    const myPlacemark = new window.ymaps.Placemark([59.938635, 30.323118], {
      hintContent: `Круизы в Антарктику`,
    }, {
      iconLayout: `default#image`,
      iconImageHref: `img/map-marker.svg`,
      iconImageSize: [18, 22],
      iconImageOffset: [-9, -22],
    });

    myMap.geoObjects
        .add(myPlacemark);
  }

}());

//# sourceMappingURL=main.js.map
