const pageHeader = document.querySelector(`.page-header`);
const pageHeaderMenuIcon = pageHeader.querySelector(`.page-header__menu-icon`);
const headerLogo = document.querySelector(`.page-header__logo`).querySelector(`img`);

pageHeaderMenuIcon.addEventListener(`click`, function () {
  document.addEventListener(`keydown`, onEscKeyDown);
  setTimeout(() => (headerLogo.src = `img/header-logo-black.svg`), 200);

  if (pageHeader.querySelector(`.menu-icon__lines`).classList.contains(`lines__active`)) {
    document.removeEventListener(`keydown`, onEscKeyDown);

    setTimeout(() => (headerLogo.src = `img/logo.svg`), 200);
  }

  pageHeader.querySelector(`.main-navigation`).classList.toggle(`navigation-active`);
  pageHeader.querySelector(`.menu-icon__lines`).classList.toggle(`lines__active`);
});

function onEscKeyDown(evt) {
  if (evt.key === `Escape` || evt.key === `Esc`) {
    pageHeader.querySelector(`.main-navigation`).classList.toggle(`navigation-active`, false);
    pageHeader.querySelector(`.menu-icon__lines`).classList.toggle(`lines__active`, false);
    document.removeEventListener(`keydown`, onEscKeyDown);
    setTimeout(() => (headerLogo.src = `img/logo.svg`), 200);
  }
}

window.addEventListener(`resize`, () => {
  if (window.innerWidth >= 728) {
    pageHeader.querySelector(`.main-navigation`).classList.toggle(`navigation-active`, false);
    pageHeader.querySelector(`.menu-icon__lines`).classList.toggle(`lines__active`, false);
    document.removeEventListener(`keydown`, onEscKeyDown);
    headerLogo.src = `img/logo.svg`;
  }
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


