const pageHeader = document.querySelector(`.page-header`);
const pageHeaderMenuIcon = pageHeader.querySelector(`.page-header__menu-icon`);
const headerLogo = pageHeader.querySelector(`.page-header__logo-image`);
const agreement = document.querySelector(`.field-agreement`).querySelector(`input`);
const btn = document.querySelector(`.page-booking__form`).querySelector(`button`);
const form = document.querySelector(`.page-booking__form`);

document.addEventListener(`DOMContentLoaded`, () => {
  pageHeader.classList.add(`page-header--js-active`);
  pageHeader.querySelector(`.page-header__menu-icon`).classList.toggle(`visually-hidden`, false);
});

pageHeaderMenuIcon.addEventListener(`click`, function () {
  document.addEventListener(`keydown`, onEscKeyDown);
  setTimeout(() => (headerLogo.style.fill = `#011C40`), 200);

  if (pageHeaderMenuIcon.querySelector(`.menu-icon-lines`).classList.contains(`lines__active`)) {
    document.removeEventListener(`keydown`, onEscKeyDown);
    setTimeout(() => (headerLogo.style.fill = `#F9FBFD`), 200);
  }

  pageHeader.querySelector(`.main-navigation`).classList.toggle(`navigation-active`);
  pageHeader.querySelector(`.menu-icon-lines`).classList.toggle(`lines__active`);
});

window.addEventListener(`resize`, () => {
  if (window.innerWidth >= 728) {
    pageHeader.querySelector(`.main-navigation`).classList.toggle(`navigation-active`, false);
    pageHeader.querySelector(`.menu-icon-lines`).classList.toggle(`lines__active`, false);
    document.removeEventListener(`keydown`, onEscKeyDown);
    setTimeout(() => (headerLogo.style.fill = `#F9FBFD`), 200);
  }
});

function onEscKeyDown(evt) {
  if (evt.key === `Escape` || evt.key === `Esc`) {
    pageHeader.querySelector(`.main-navigation`).classList.toggle(`navigation-active`, false);
    pageHeader.querySelector(`.menu-icon-lines`).classList.toggle(`lines__active`, false);
    document.removeEventListener(`keydown`, onEscKeyDown);
    setTimeout(() => (headerLogo.style.fill = `#F9FBFD`), 200);
  }
}

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


