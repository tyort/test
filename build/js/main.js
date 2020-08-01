(function () {
  'use strict';

  const pageHeader = document.querySelector(`.page-header`);
  const pageHeaderMenuIcon = pageHeader.querySelector(`.page-header__menu-icon`);

  pageHeaderMenuIcon.addEventListener(`click`, function () {
    document.addEventListener(`keydown`, onEscKeyDown);

    if (pageHeader.querySelector(`.menu-icon__lines`).classList.contains(`lines__active`)) {
      document.removeEventListener(`keydown`, onEscKeyDown);
    }

    pageHeader.querySelector(`.mobile-main-navigation`).classList.toggle(`navigation-active`);
    pageHeader.querySelector(`.menu-icon__lines`).classList.toggle(`lines__active`);
  });

  function onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      pageHeader.querySelector(`.mobile-main-navigation`).classList.toggle(`navigation-active`, false);
      pageHeader.querySelector(`.menu-icon__lines`).classList.toggle(`lines__active`, false);
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
