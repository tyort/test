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

}());

//# sourceMappingURL=main.js.map
