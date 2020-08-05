(function () {
  'use strict';

  const menu = document.querySelector(`#check-menu`);

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
